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
                 (:file "serialization")
                 (:file "xml")
                 (:module "sexp"
                  :components ((:file "sexp")
                               (:file "serialize-sexp-internal.lisp")
                               (:module "serialize-xml-internal"
                                        :components ((:file "integer")
                                                     (:file "ratio")
                                                     (:file "float")
                                                     (:file "complex")
                                                     (:file "null")
                                                     (:file "t")
                                                     (:file "string")
                                                     (:file "character")
                                                     (:file "symbol")
                                                     (:file "sequence")
                                                     (:file "hash-table")
                                                     (:file "structure-object")
                                                     (:file "standard-object"))
                               (:file "deserialize-sexp-internal.lisp"))))))
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
