(in-package :s-serialization)

(defmethod serialize-sexp-internal ((object (eql 't)) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "T" stream))
