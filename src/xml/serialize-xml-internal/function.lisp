(in-package :s-serialization)

(defmethod serialize-xml-internal ((object function) stream serialization-state)
  (multiple-value-bind (lambda-expression closure-p name)
      (function-lambda-expression  object)
    (serialize-xml-internal (if closure-p
                                lambda-expression ;; TODO: 環境はわたせないけど、、、、
                                name)
                            stream
                            serialization-state)))
