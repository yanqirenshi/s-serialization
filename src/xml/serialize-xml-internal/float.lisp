(in-package :s-serialization)

(defmethod serialize-xml-internal ((object float) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<FLOAT>" stream)
  (prin1 object stream)
  (write-string "</FLOAT>" stream))
