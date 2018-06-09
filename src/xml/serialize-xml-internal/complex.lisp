(in-package :s-serialization)

(defmethod serialize-xml-internal ((object complex) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<COMPLEX>" stream)
  (prin1 object stream)
  (write-string "</COMPLEX>" stream))
