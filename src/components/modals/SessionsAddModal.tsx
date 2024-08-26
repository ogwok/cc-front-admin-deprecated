
  import React, { useState } from 'react';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Modal,
    Toast,
  } from "flowbite-react";
  import {
    HiPlus,
    HiCheck,
  } from "react-icons/hi";
  import SessionsForm from '../forms/SessionsForm';

  const addSession = async (data) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to add Sessions');
    }

    return response.json();
  };
  
  export const SessionsAddModal: React.FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
  
      const queryClient = useQueryClient();

      const addMutation = useMutation({
        mutationFn: addSession,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['sessions'] });
          setOpen(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (error) => {
          console.error('Error adding Sessions:', error);
        }
      });

      const handleAdd = (data) => {
        addMutation.mutate(data);
      };
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <HiPlus className="mr-2 text-xl" />
          Add Sessions
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add Sessions</strong>
          </Modal.Header>
          <Modal.Body>
            <SessionsForm 
              onSubmit={handleAdd} 
              isLoading={addMutation.isPending}
            />
          </Modal.Body>
        </Modal>
        {showSuccess && (
        <Toast className="fixed bottom-5 right-5">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Participant added successfully.
          </div>
          <Toast.Toggle onDismiss={() => setShowSuccess(false)} />
        </Toast>
      )}
      </>
    );
  };
  
  export default SessionsAddModal;
      