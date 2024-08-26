
  import React, { useState, useEffect } from 'react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import FacilitatorsPageHeader from '../../components/headers/FacilitatorsPageHeader';
  import FacilitatorsEditModal from '../../components/modals/FacilitatorsEditModal';
  import DeleteModal from '../../components/modals/DeleteModal';
  import SharedTable from '../../components/commons/SharedTable';

  const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
  );

  const fetchFacilitators = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/facilitators`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  };
  
  const FacilitatorsPage: React.FC = function () {
    const queryClient = useQueryClient();

    const { data: items, isLoading, error } = useQuery({
      queryKey: ['facilitators'],
      queryFn: fetchFacilitators,
      select: (data) => data.data,
    });

      const editMutation = useMutation({
        mutationFn: ({ id, data }) => 
          fetch(`${BASE_URL}/facilitators/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['participants'] });
        },
      });

      const deleteMutation = useMutation({
        mutationFn: (id) => 
          fetch(`${BASE_URL}/facilitators/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['participants'] });
        },
      });
      
      const handleEdit = async (id, data) => {
        try {
          await editMutation.mutateAsync({ id, data });
        } catch (error) {
          console.error('Error updating item:', error);
        }
      };

      const handleDelete = async (id) => {
        try {
          await deleteMutation.mutateAsync(id);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };

    const columns = [
    { key: 'firstName', header: 'First Name' },
        { key: 'lastName', header: 'Last Name' },
        { key: 'phone', header: 'Phone' },
        { key: 'email', header: 'Email' },
        { key: 'password', header: 'Password' },
        { key: 'role', header: 'Role' },
        { key: 'organizationId', header: 'organization' },
    ];
  
    return (
        <NavbarSidebarLayout isFooter={false}>
          <FacilitatorsPageHeader />
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <SharedTable 
                      items={items} 
                      columns={columns} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete}
                      EditModal={FacilitatorsEditModal}
                      DeleteModal={DeleteModal}
                  />
                  )}
                </div>
              </div>
            </div>
          </div>
        </NavbarSidebarLayout>
    );
  };
  
  export default FacilitatorsPage;
      