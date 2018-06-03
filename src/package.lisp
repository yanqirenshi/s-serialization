(in-package :cl-user)
(defpackage :s-serialization
  (:use :cl)
  (:export #:make-serialization-state
           #:reset-known-slots)
  (:export #:serialize-xml
           #:serialize-xml-internal
           #:serializable-slots
           #:deserialize-xml)
  (:export #:serialize-sexp
           #:serialize-sexp-internal
           #:deserialize-sexp
           #:deserialize-sexp-internal)
  (:documentation "XML and s-expression based serialization for Common Lisp and CLOS"))
(in-package :s-serialization)
