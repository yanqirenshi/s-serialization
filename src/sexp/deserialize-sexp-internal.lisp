(in-package :s-serialization)

(defun deserialize-sexp-internal (sexp deserialized-objects)
  (if (atom sexp)
      sexp
      (ecase (first sexp)
        (:sequence (destructuring-bind (id &key class size elements) (rest sexp)
                     (let ((sequence (make-sequence class size)))
                       (setf (gethash id deserialized-objects) sequence)
                       (map-into sequence
                                 #'(lambda (x) (deserialize-sexp-internal x deserialized-objects))
                                 elements))))
        (:hash-table (destructuring-bind (id &key test size rehash-size rehash-threshold entries) (rest sexp)
                       (let ((hash-table (make-hash-table :size size
                                                          :test test
                                                          :rehash-size rehash-size
                                                          :rehash-threshold rehash-threshold)))
                         (setf (gethash id deserialized-objects) hash-table)
                         (dolist (entry entries)
                           (setf (gethash (deserialize-sexp-internal (first entry) deserialized-objects) hash-table)
                                 (deserialize-sexp-internal (rest entry) deserialized-objects)))
                         hash-table)))
        (:object (destructuring-bind (id &key class slots) (rest sexp)
                   (let ((object (make-instance class)))
                     (setf (gethash id deserialized-objects) object)
                     (dolist (slot slots)
                       (when (slot-exists-p object (first slot))
                         (setf (slot-value object (first slot))
                               (deserialize-sexp-internal (rest slot) deserialized-objects))))
                     object)))
        (:struct (destructuring-bind (id &key class slots) (rest sexp)
                   (let ((object (funcall (intern (concatenate 'string "MAKE-" (symbol-name class))
                                                  (symbol-package class)))))
                     (setf (gethash id deserialized-objects) object)
                     (dolist (slot slots)
                       (when (slot-exists-p object (first slot))
                         (setf (slot-value object (first slot))
                               (deserialize-sexp-internal (rest slot) deserialized-objects))))
                     object)))
        (:cons (destructuring-bind (id cons-car cons-cdr) (rest sexp)
                 (let ((conspair (cons nil nil)))
                   (setf (gethash id deserialized-objects)
                         conspair)
                   (rplaca conspair (deserialize-sexp-internal cons-car deserialized-objects))
                   (rplacd conspair (deserialize-sexp-internal cons-cdr deserialized-objects)))))
        (:ref (gethash (rest sexp) deserialized-objects)))))
