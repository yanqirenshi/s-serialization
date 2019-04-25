(in-package :s-serialization)

(defclass serialization-state ()
  ((xml-parser-state :initform nil)
   (counter :accessor get-counter :initform 0)
   (hashtable :reader get-hashtable :initform (make-hash-table :test 'eq :size 1024 :rehash-size 2.0))
   (known-slots :initform (make-hash-table))))

(defgeneric reset (serialization-state)
  (:documentation "")
  (:method ((serialization-state serialization-state))
    (with-slots (hashtable counter) serialization-state
      (clrhash hashtable)
      (setf counter 0))))

(defgeneric reset-known-slots (serialization-state &optional class)
  (:documentation "Clear the caching of known slots for class, or for all classes if class is nil")
  (:method ((serialization-state serialization-state) &optional class)
    (with-slots (known-slots) serialization-state
      (if class
          (remhash (if (symbolp class) class (class-name class)) known-slots)
          (clrhash known-slots)))))

(defgeneric known-object-id (serialization-state object)
  (:documentation "")
  (:method ((serialization-state serialization-state) object)
    (gethash object (get-hashtable serialization-state))))

(defgeneric set-known-object (serialization-state object)
  (:documentation "")
  (:method ((serialization-state serialization-state) object)
    (setf (gethash object (get-hashtable serialization-state))
          (incf (get-counter serialization-state)))))

(defun make-serialization-state ()
  "Create a reusable serialization state to pass as optional argument to [de]serialize-xml"
  (make-instance 'serialization-state))

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
