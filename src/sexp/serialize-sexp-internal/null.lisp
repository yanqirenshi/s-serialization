(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object null) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "NIL" stream))
