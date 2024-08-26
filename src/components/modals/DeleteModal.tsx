
  import React, { useState } from 'react';
  
  import {
    Button,
    Modal,
  } from "flowbite-react";
  import {
    HiOutlineExclamationCircle,
    HiTrash,
  } from "react-icons/hi";
  
  const DeleteModal: React.FC = function ({ itemId, onDelete }) {
    const [isOpen, setOpen] = useState(false);
  
    return (
      <>
        <Button color="failure" onClick={() => setOpen(!isOpen)}>
          <HiTrash className="mr-2 text-lg" />
          Delete
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Body className="px-6 pb-6 pt-0">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-600" />
              <p className="text-lg text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this facilitators?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={() => {
                  onDelete(itemId);
                  setOpen(false);
                }}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
  export default DeleteModal;
  
      