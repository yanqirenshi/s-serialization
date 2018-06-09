(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object number) stream serialize-sexp-internal)
  (declare (ignore serialize-sexp-internal))
  (prin1 object stream))
