(in-package :s-serialization)

(defgeneric serialize-sexp-internal (object stream serialization-state)
  (:documentation "Write a serialized version of object to stream using s-expressions"))

(defun serialize-sexp (object stream &optional (serialization-state (make-serialization-state)))
  "Write a serialized version of object to stream using s-expressions, optionally reusing a serialization-state"
  (reset serialization-state)
  (serialize-sexp-internal object stream serialization-state))
