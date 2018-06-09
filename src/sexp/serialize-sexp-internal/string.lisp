(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object string) stream serialization-state)
  (declare (ignore serialization-state))
  (prin1 object stream))
