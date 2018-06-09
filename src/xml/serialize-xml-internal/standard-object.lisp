(in-package :s-serialization)

(defmethod serialize-xml-internal ((object standard-object) stream serialization-state)
  (let ((id (known-object-id serialization-state object)))
    (if id
        (progn
          (write-string "<REF ID=\"" stream)
          (prin1 id stream)
          (write-string "\"/>" stream))
        (progn
          (setf id (set-known-object serialization-state object))
          (write-string "<OBJECT ID=\"" stream)
          (prin1 id stream)
          (write-string "\" CLASS=\"" stream)
          (print-symbol-xml (class-name (class-of object)) stream)
          (princ "\">" stream)
          (loop :for slot :in (get-serializable-slots serialization-state object)
                :do (when (slot-boundp object slot)
                      (write-string "<SLOT NAME=\"" stream)
                      (print-symbol-xml slot stream)
                      (write-string "\">" stream)
                      (serialize-xml-internal (slot-value object slot) stream serialization-state)
                      (write-string "</SLOT>" stream)))
          (write-string "</OBJECT>" stream)))))
