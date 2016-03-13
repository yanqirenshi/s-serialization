#|
This file is a part of s-serialization project.
Copyright (c) 2016 satoshi iwasaki (yanqirenshi@gmail.com)
|#

(in-package :cl-user)
(defpackage s-serialization-test-asd
  (:use :cl :asdf))
(in-package :s-serialization-test-asd)

(defsystem s-serialization-test
  :author "satoshi iwasaki"
  :license "LLGPL"
  :depends-on (:s-serialization
               :prove)
  :components ((:module "t"
                :components
                ((:test-file "package")
                 (:test-file "from-prevalence" :depends-on ("package"))
                 (:test-file "serialization"   :depends-on ("package"))
                 (:test-file "sexp"            :depends-on ("package"))
                 (:test-file "xml"             :depends-on ("package")))))
  :description "Test system for s-serialization"

  :defsystem-depends-on (:prove-asdf)
  :perform (test-op :after (op c)
                    (funcall (intern #.(string :run-test-system) :prove-asdf) c)
                    (asdf:clear-system c)))
