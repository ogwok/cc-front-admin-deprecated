
  import React, { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Modal,
  } from "flowbite-react";
  import {
    HiPencilAlt,
  } from "react-icons/hi";
  import FacilitatorsForm from '../forms/FacilitatorsForm';
  
  const FacilitatorsEditModal: React.FC = function ({ item, onEdit }) {
    const [isOpen, setOpen] = useState(false);
  
    const handleEdit = async (data) => {
      try {
        await onEdit(item.id, data);
        setOpen(false);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <HiPencilAlt className="mr-2 text-lg" />
          Edit
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit Facilitators</strong>
          </Modal.Header>
          <Modal.Body>
            <FacilitatorsForm onSubmit={handleEdit} initialData={item} isEdit={true} />
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
  export default FacilitatorsEditModal;
      