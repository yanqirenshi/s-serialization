#|
This file is a part of s-serialization project.
Copyright (c) 2016 satoshi iwasaki (yanqirenshi@gmail.com)
|#

#|
Author: satoshi iwasaki (yanqirenshi@gmail.com)
|#

(in-package :cl-user)
(defpackage s-serialization-asd
  (:use :cl :asdf))
(in-package :s-serialization-asd)

(defsystem s-serialization
  :version "0.1"
  :author "satoshi iwasaki"
  :license "LLGPL"
  :depends-on (:s-xml)
  :components ((:module "src"
                :components
                ((:file "package")
                 (:file "serialization" :depends-on ("package"))

                 (:file "xml"           :depends-on ("serialization"))
                 (:file "sexp"          :depends-on ("serialization")))))
  :description ""
  :long-description
  #.(with-open-file (stream (merge-pathnames
                             #p"README.markdown"
                             (or *load-pathname* *compile-file-pathname*))
                            :if-does-not-exist nil
                            :direction :input)
      (when stream
        (let ((seq (make-array (file-length stream)
                               :element-type 'character
                               :fill-pointer t)))
          (setf (fill-pointer seq) (read-sequence seq stream))
          seq)))
  :in-order-to ((test-op (test-op s-serialization-test))))
