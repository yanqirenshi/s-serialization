(in-package :s-serialization)

(defun serialize-xml (object stream &optional (serialization-state (make-serialization-state)))
  "Write a serialized version of object to stream using XML, optionally reusing a serialization-state"
  (reset serialization-state)
  (serialize-xml-internal object stream serialization-state))

(defgeneric serialize-xml-internal (object stream serialization-state)
  (:documentation "Write a serialized version of object to stream using XML"))
