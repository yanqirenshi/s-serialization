(in-package :s-serialization)

(defmethod serialize-xml-internal ((object integer) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<INT>" stream)
  (prin1 object stream)
  (write-string "</INT>" stream))
