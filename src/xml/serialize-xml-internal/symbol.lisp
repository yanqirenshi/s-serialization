(in-package :s-serialization)

(defmethod serialize-xml-internal ((object symbol) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<SYMBOL>" stream)
  (print-symbol-xml object stream)
  (write-string "</SYMBOL>" stream))
