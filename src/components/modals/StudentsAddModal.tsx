
  import React, { useState } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Modal,
  } from "flowbite-react";
  import {
    HiPlus,
  } from "react-icons/hi";
  import StudentsForm from '../forms/StudentsForm';
  
  export const StudentsAddModal: React.FC = function () {
    const [isOpen, setOpen] = useState(false);
  
    const handleAdd = async (data) => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
  
        const response = await fetch(`${BASE_URL}/coaching-sessions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error('Failed to add Students');
        }
  
        setOpen(false);
        // Optionally, refresh the list or show a success message
      } catch (error) {
        console.error('Error adding Students:', error);
        // Handle error (e.g., show error message to user)
      }
    };
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <HiPlus className="mr-2 text-xl" />
          Add Students
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add Students</strong>
          </Modal.Header>
          <Modal.Body>
            <StudentsForm onSubmit={handleAdd} />
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
  export default StudentsAddModal;
      