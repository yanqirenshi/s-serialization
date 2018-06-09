(in-package :s-serialization)

(defmethod serialize-xml-internal ((object string) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<STRING>" stream)
  (s-xml:print-string-xml object stream)
  (write-string "</STRING>" stream))
