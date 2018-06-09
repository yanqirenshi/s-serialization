(in-package :s-serialization)

(defun serialize-xml (object stream &optional (serialization-state (make-serialization-state)))
  "Write a serialized version of object to stream using XML, optionally reusing a serialization-state"
  (reset serialization-state)
  (serialize-xml-internal object stream serialization-state))

(defun deserialize-xml (stream &optional (serialization-state (make-serialization-state)))
  "Read and return an XML serialized version of a lisp object from stream, optionally reusing a serialization state"
  (reset serialization-state)
  (let ((*deserialized-objects* (get-hashtable serialization-state)))
    (declare (special *deserialized-objects*))
    (car (s-xml:start-parse-xml stream (get-xml-parser-state serialization-state)))))

(defgeneric serialize-xml-internal (object stream serialization-state)
  (:documentation "Write a serialized version of object to stream using XML"))

(defun print-symbol-xml (symbol stream)
  (let ((package (symbol-package symbol))
        (name (prin1-to-string symbol)))
    (cond ((eq package +cl-package+) (write-string "CL:" stream))
          ((eq package +keyword-package+) (write-char #\: stream))
          (package (s-xml:print-string-xml (package-name package) stream)
                   (write-string "::" stream))
          (t (write-string "#:" stream)))
    (if (char= (char name (1- (length name))) #\|)
        (s-xml:print-string-xml name stream :start (position #\| name))
        (s-xml:print-string-xml name stream :start (1+ (or (position #\: name :from-end t) -1))))))
