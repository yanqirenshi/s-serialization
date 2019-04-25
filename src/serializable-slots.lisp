(in-package :s-serialization)

(defgeneric serializable-slots (object)
  (:documentation "Return a list of slot names that need serialization"))

(defmethod serializable-slots ((object structure-object))
  #+openmcl
  (let* ((sd (gethash (class-name (class-of object)) ccl::%defstructs%))
         (slots (if sd (ccl::sd-slots sd))))
    (mapcar #'car (if (symbolp (caar slots)) slots (cdr slots))))
  #+cmu
  (mapcar #'pcl:slot-definition-name (pcl:class-slots (class-of object)))
  #+sbcl
  (mapcar #'sb-pcl:slot-definition-name (sb-pcl:class-slots (class-of object)))
  #+lispworks
  (structure:structure-class-slot-names (class-of object))
  #+allegro
  (mapcar #'mop:slot-definition-name (mop:class-slots (class-of object)))
  #+sbcl
  (mapcar #'sb-mop:slot-definition-name (sb-mop:class-slots (class-of object)))
  #+clisp
  (mapcar #'clos:slot-definition-name (ext:structure-slots (type-of object)))
  #-(or openmcl cmu lispworks allegro sbcl clisp)
  (error "not yet implemented"))

(defmethod serializable-slots ((object standard-object))
  #+openmcl
  (mapcar #'ccl:slot-definition-name
          (#-openmcl-native-threads ccl:class-instance-slots
           #+openmcl-native-threads ccl:class-slots
           (class-of object)))
  #+cmu
  (mapcar #'pcl:slot-definition-name (pcl:class-slots (class-of object)))
  #+sbcl
  (mapcar #'sb-pcl:slot-definition-name (sb-pcl:class-slots (class-of object)))
  #+lispworks
  (mapcar #'hcl:slot-definition-name (hcl:class-slots (class-of object)))
  #+allegro
  (mapcar #'mop:slot-definition-name (mop:class-slots (class-of object)))
  #+sbcl
  (mapcar #'sb-mop:slot-definition-name (sb-mop:class-slots (class-of object)))
  #+clisp
  (mapcar #'clos:slot-definition-name (clos:class-slots (class-of object)))
  #-(or openmcl cmu lispworks allegro sbcl clisp)
  (error "not yet implemented"))


(defgeneric get-serializable-slots (serialization-state object)
  (:documentation "")
  (:method ((serialization-state serialization-state) object)
    (with-slots (known-slots) serialization-state
      (let* ((class (class-name (class-of object)))
             (slots (gethash class known-slots)))
        (when (not slots)
          (setf slots (serializable-slots object))
          (setf (gethash class known-slots) slots))
        slots))))
