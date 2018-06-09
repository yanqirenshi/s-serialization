(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object null) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "NIL" stream))

(defmethod serialize-sexp-internal ((object (eql 't)) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "T" stream))

(defmethod serialize-sexp-internal ((object string) stream serialization-state)
  (declare (ignore serialization-state))
  (prin1 object stream))

(defmethod serialize-sexp-internal ((object character) stream serialization-state)
  (declare (ignore serialization-state))
  (prin1 object stream))

(defmethod serialize-sexp-internal ((object symbol) stream serialization-state)
  (declare (ignore serialization-state))
  (print-symbol object stream))

(defmethod serialize-sexp-internal ((object number) stream serialize-sexp-internal)
  (declare (ignore serialize-sexp-internal))
  (prin1 object stream))

;;; generic sequences
(defmethod serialize-sexp-internal ((object sequence) stream serialization-state)
  (flet ((proper-sequence (length)
           (let ((id (set-known-object serialization-state object)))
             (write-string "(:SEQUENCE " stream)
             (prin1 id stream)
             (write-string " :CLASS " stream)
             (print-symbol (etypecase object (list 'list) (vector 'vector)) stream)
             (write-string " :SIZE " stream)
             (prin1 length stream)
             (unless (zerop length)
               (write-string " :ELEMENTS (" stream)
               (map nil
                    #'(lambda (element)
                        (write-string " " stream)
                        (serialize-sexp-internal element stream serialization-state))
                    object))
             (write-string " ) )" stream)))
         (improper-list ()
           (let ((id (set-known-object serialization-state object)))
             (write-string "(:CONS " stream)
             (prin1 id stream)
             (write-char #\Space stream)
             (serialize-sexp-internal (car object) stream serialization-state)
             (write-char #\Space stream)
             (serialize-sexp-internal (cdr object) stream serialization-state)
             (write-string " ) " stream))))
    (let ((id (known-object-id serialization-state object)))
      (if id
          (progn
            (write-string "(:REF . " stream)
            (prin1 id stream)
            (write-string ")" stream))
          (multiple-value-bind (seq-type length) (sequence-type-and-length object)
            (ecase seq-type
              ((:proper-sequence :proper-list) (proper-sequence length))
              ((:dotted-list :circular-list) (improper-list))))))))

;;; hash tables
(defmethod serialize-sexp-internal ((object hash-table) stream serialization-state)
  (let ((id (known-object-id serialization-state object)))
    (if id
        (progn
          (write-string "(:REF . " stream)
          (prin1 id stream)
          (write-string ")" stream))
        (let ((count (hash-table-count object)))
          (setf id (set-known-object serialization-state object))
          (write-string "(:HASH-TABLE " stream)
          (prin1 id stream)
          (write-string " :TEST " stream)
          (print-symbol (hash-table-test object) stream)
          (write-string " :SIZE " stream)
          (prin1 (hash-table-size object) stream)
          (write-string " :REHASH-SIZE " stream)
          (prin1 (hash-table-rehash-size object) stream)
          (write-string " :REHASH-THRESHOLD " stream)
          (prin1 (hash-table-rehash-threshold object) stream)
          (unless (zerop count)
            (write-string " :ENTRIES (" stream)
            (maphash #'(lambda (key value)
                         (write-string " (" stream)
                         (serialize-sexp-internal key stream serialization-state)
                         (write-string " . " stream)
                         (serialize-sexp-internal value stream serialization-state)
                         (princ ")" stream))
                     object)
            (write-string " )" stream))
          (write-string " )" stream)))))

;;; structures
(defmethod serialize-sexp-internal ((object structure-object) stream serialization-state)
  (let ((id (known-object-id serialization-state object)))
    (if id
        (progn
          (write-string "(:REF . " stream)
          (prin1 id stream)
          (write-string ")" stream))
        (let ((serializable-slots (get-serializable-slots serialization-state object)))
          (setf id (set-known-object serialization-state object))
          (write-string "(:STRUCT " stream)
          (prin1 id stream)
          (write-string " :CLASS " stream)
          (print-symbol (class-name (class-of object)) stream)
          (when serializable-slots
            (write-string " :SLOTS (" stream)
            (mapc #'(lambda (slot)
                      (write-string " (" stream)
                      (print-symbol slot stream)
                      (write-string " . " stream)
                      (serialize-sexp-internal (slot-value object slot) stream serialization-state)
                      (write-string ")" stream))
                  serializable-slots))
          (write-string " ) )" stream)))))

;;; objects
(defmethod serialize-sexp-internal ((object standard-object) stream serialization-state)
  (let ((id (known-object-id serialization-state object)))
    (if id
        (progn
          (write-string "(:REF . " stream)
          (prin1 id stream)
          (write-string ")" stream))
        (let ((serializable-slots (get-serializable-slots serialization-state object)))
          (setf id (set-known-object serialization-state object))
          (write-string "(:OBJECT " stream)
          (prin1 id stream)
          (write-string " :CLASS " stream)
          (print-symbol (class-name (class-of object)) stream)
          (when serializable-slots
            (princ " :SLOTS (" stream)
            (loop :for slot :in serializable-slots
                  :do (when (slot-boundp object slot)
                        (write-string " (" stream)
                        (print-symbol slot stream)
                        (write-string " . " stream)
                        (serialize-sexp-internal (slot-value object slot) stream serialization-state)
                        (write-string ")" stream))))
          (write-string " ) )" stream)))))