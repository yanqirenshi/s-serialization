(in-package :s-serialization)

(defmethod serialize-xml-internal ((object character) stream serialization-state)
  (declare (ignore serialization-state))
  (write-string "<CHARACTER>" stream)
  (s-xml:print-string-xml (princ-to-string object) stream)
  (write-string "</CHARACTER>" stream))
