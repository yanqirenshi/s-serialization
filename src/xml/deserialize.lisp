(in-package :s-serialization)

(defun deserialize-xml-new-element (name attributes seed)
  (declare (ignore seed) (special *deserialized-objects*))
  (case name
    (:sequence (let ((id (parse-integer (get-attribute-value :id attributes)))
                     (class (read-from-string (get-attribute-value :class attributes)))
                     (size (parse-integer (get-attribute-value :size attributes))))
                 (setf (gethash id *deserialized-objects*)
                       (make-sequence class size))))
    (:object (let ((id (parse-integer (get-attribute-value :id attributes)))
                   (class (read-from-string (get-attribute-value :class attributes))))
               (setf (gethash id *deserialized-objects*)
                     (make-instance class))))
    (:cons (setf (gethash (parse-integer (get-attribute-value :id attributes))
                          *deserialized-objects*)
                 (cons nil nil)))
    (:struct (let ((id (parse-integer (get-attribute-value :id attributes)))
                   (class (read-from-string (get-attribute-value :class attributes))))
               (setf (gethash id *deserialized-objects*)
                     (funcall (intern (concatenate 'string "MAKE-" (symbol-name class)) (symbol-package class))))))
    (:hash-table (let ((id (parse-integer (get-attribute-value :id attributes)))
                       (test (read-from-string (get-attribute-value :test attributes)))
                       (size (parse-integer (get-attribute-value :size attributes))))
                   (setf (gethash id *deserialized-objects*)
                         (make-hash-table :test test :size size))))
    (t (deserialize-xml-new-element-aux name attributes)))
  '())

(defgeneric deserialize-xml-new-element-aux (name attributes)
  (:documentation "Extend with your own types by overloading serialize-xml-internal
                   and implementing deserialize aux functions")
  (:method (name attributes)
    (declare (ignore name attributes))
    nil))

(defun deserialize-xml-finish-element (name attributes parent-seed seed)
  (declare (special *deserialized-objects*))
  (cons (case name
          (:int (parse-integer seed))
          ((:float :ratio :complex :symbol) (read-from-string seed))
          (:null nil)
          (:true t)
          (:string (or seed ""))
          (:character (char seed 0))
          (:key (car seed))
          (:value (car seed))
          (:entry (nreverse seed))
          (:slot (let ((name (read-from-string (get-attribute-value :name attributes))))
                   (cons name (car seed))))
          (:sequence (let* ((id (parse-integer (get-attribute-value :id attributes)))
                            (sequence (gethash id *deserialized-objects*)))
                       (map-into sequence #'identity (nreverse seed))))
          (:cons (let* ((id (parse-integer (get-attribute-value :id attributes)))
                        (cons-pair (gethash id *deserialized-objects*)))
                   (rplaca cons-pair (second seed))
                   (rplacd cons-pair (first seed))))
          (:object (let* ((id (parse-integer (get-attribute-value :id attributes)))
                          (object (gethash id *deserialized-objects*)))
                     (dolist (pair seed object)
                       (when (slot-exists-p object (car pair))
                         (setf (slot-value object (car pair)) (cdr pair))))))
          (:struct (let* ((id (parse-integer (get-attribute-value :id attributes)))
                          (object (gethash id *deserialized-objects*)))
                     (dolist (pair seed object)
                       (when (slot-exists-p object (car pair))
                         (setf (slot-value object (car pair)) (cdr pair))))))
          (:hash-table (let* ((id (parse-integer (get-attribute-value :id attributes)))
                              (hash-table (gethash id *deserialized-objects*)))
                         (dolist (pair seed hash-table)
                           (setf (gethash (car pair) hash-table) (cadr pair)))))
          (:ref (let ((id (parse-integer (get-attribute-value :id attributes))))
                  (gethash id *deserialized-objects*)))
          (t (deserialize-xml-finish-element-aux name attributes parent-seed seed)))
        parent-seed))

(defgeneric deserialize-xml-finish-element-aux (name attributes parent-seed seed)
  (:documentation "Extend with your own types by overloading serialize-xml-internal
                   and implementing deserialize aux functions")
  (:method (name attributes parent-seed seed)
    (declare (ignore name attributes parent-seed seed))
    nil))

(defun deserialize-xml-text (string seed)
  (declare (ignore seed))
  string)

(defgeneric get-xml-parser-state (serialization-state)
  (:method ((serialization-state serialization-state))
    (with-slots (xml-parser-state) serialization-state
      (or xml-parser-state
          (setf xml-parser-state (make-instance 's-xml:xml-parser-state
                                                :new-element-hook #'deserialize-xml-new-element
                                                :finish-element-hook #'deserialize-xml-finish-element
                                                :text-hook #'deserialize-xml-text))))))

(defun deserialize-xml (stream &optional (serialization-state (make-serialization-state)))
  "Read and return an XML serialized version of a lisp object from stream, optionally reusing a serialization state"
  (reset serialization-state)
  (let ((*deserialized-objects* (get-hashtable serialization-state)))
    (declare (special *deserialized-objects*))
    (car (s-xml:start-parse-xml stream (get-xml-parser-state serialization-state)))))
