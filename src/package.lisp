(in-package :cl-user)
(defpackage :s-serialization
  (:use :cl)
  (:export #:serializable-slots
           #:serialize-xml
           #:serialize-sexp
           #:deserialize-xml
           #:deserialize-sexp
           #:make-serialization-state
           #:reset-known-slots)
  (:documentation "XML and s-expression based serialization for Common Lisp and CLOS"))
(in-package :s-serialization)
