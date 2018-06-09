(in-package :s-serialization)

(defmethod serialize-xml-internal ((object null) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<NULL/>" stream))
