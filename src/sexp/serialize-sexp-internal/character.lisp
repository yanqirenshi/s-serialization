(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object character) stream serialization-state)
  (declare (ignore serialization-state))
  (prin1 object stream))
