(in-package :s-serialization)

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
