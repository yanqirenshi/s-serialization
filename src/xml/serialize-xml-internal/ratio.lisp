(in-package :s-serialization)

(defmethod serialize-xml-internal ((object ratio) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<RATIO>" stream)
  (prin1 object stream)
  (write-string "</RATIO>" stream))
