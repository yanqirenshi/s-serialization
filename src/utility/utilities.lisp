(in-package :hole.utility)

(defconstant +cl-package+ (find-package :cl))

(defconstant +keyword-package+ (find-package :keyword))

(defun sequence-type-and-length (sequence)
  (if (listp sequence)
      (handler-case
          (let ((length (list-length sequence)))
            (if length
                (values :proper-list length)
                (values :circular-list nil)))
        (type-error ()
          (values :dotted-list nil)))
      (values :proper-sequence (length sequence))))

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

(defun get-attribute-value (name attributes)
  (cdr (assoc name attributes :test #'eq)))
