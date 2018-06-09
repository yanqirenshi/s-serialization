(in-package :s-serialization)

(defmethod serialize-xml-internal ((object structure-object) stream serialization-state)
  (let ((id (known-object-id serialization-state object)))
    (if id
        (progn
          (write-string "<REF ID=\"" stream)
          (prin1 id stream)
          (write-string "\"/>" stream))
        (progn
          (setf id (set-known-object serialization-state object))
          (write-string "<STRUCT ID=\"" stream)
          (prin1 id stream)
          (write-string "\" CLASS=\"" stream)
          (print-symbol-xml (class-name (class-of object)) stream)
          (write-string "\">" stream)
          (mapc #'(lambda (slot)
                    (write-string "<SLOT NAME=\"" stream)
                    (print-symbol-xml slot stream)
                    (write-string "\">" stream)
                    (serialize-xml-internal (slot-value object slot) stream serialization-state)
                    (write-string "</SLOT>" stream))
                (get-serializable-slots serialization-state object))
          (write-string "</STRUCT>" stream)))))
