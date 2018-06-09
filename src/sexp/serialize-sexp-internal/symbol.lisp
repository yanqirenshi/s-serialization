(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object symbol) stream serialization-state)
  (declare (ignore serialization-state))
  (print-symbol object stream))
