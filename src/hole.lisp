(in-package :s-serialization)

(defun black (format stream objects &key state)
  (cond ((eq :xml format)
         (serialize-xml objects stream state))
        (t (error "Not Supported yet. format=~S" format))))

(defun white (format stream obj &key state)
  (cond ((eq :xml format)
         (deserialize-xml stream state))
        (t (error "Not Supported yet. format=~S" format))))
