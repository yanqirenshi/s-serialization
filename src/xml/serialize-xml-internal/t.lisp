(in-package :s-serialization)

(defmethod serialize-xml-internal ((object (eql 't)) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<TRUE/>" stream))
