(in-package :s-serialization)

(defun serialize-sexp (object stream &optional (serialization-state (make-serialization-state)))
  "Write a serialized version of object to stream using s-expressions, optionally reusing a serialization-state"
  (reset serialization-state)
  (serialize-sexp-internal object stream serialization-state))

(defun deserialize-sexp (stream &optional (serialization-state (make-serialization-state)))
  "Read and return an s-expression serialized version of a lisp object from stream, optionally reusing a serialization state"
  (reset serialization-state)
  (let ((sexp (read stream nil :eof)))
    (if (eq sexp :eof)
        nil
        (deserialize-sexp-internal sexp (get-hashtable serialization-state)))))

(defun print-symbol (symbol stream)
  (let ((package (symbol-package symbol))
        (name (prin1-to-string symbol)))
    (cond ((eq package +cl-package+) (write-string "CL:" stream))
          ((eq package +keyword-package+) (write-char #\: stream))
          (package (s-xml:print-string-xml (package-name package) stream)
                   (write-string "::" stream))
          (t (write-string "#:" stream)))
    (if (char= (char name (1- (length name))) #\|)
        (write-string name stream :start (position #\| name))
        (write-string name stream :start (1+ (or (position #\: name :from-end t) -1))))))
