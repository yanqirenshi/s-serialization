(in-package :cl-user)
(defpackage :s-serialization
  (:nicknames :hole)
  (:use :cl :hole.utility)
  (:export #:make-serialization-state
           #:reset-known-slots)
  (:export #:serialize-xml
           #:serialize-xml-internal
           #:serializable-slots
           #:deserialize-xml
           #:deserialize-xml-new-element-aux
           #:deserialize-xml-finish-element-aux)
  (:export #:serialize-sexp
           #:serialize-sexp-internal
           #:deserialize-sexp
           #:deserialize-sexp-internal)
  (:export #:black
           #:white)
  (:documentation "XML and s-expression based serialization for Common Lisp and CLOS"))
(in-package :s-serialization)
