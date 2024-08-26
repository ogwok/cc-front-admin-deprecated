
  import React, { useState, useEffect } from 'react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import SessionsPageHeader from '../../components/headers/SessionsPageHeader';
  import SessionsEditModal from '../../components/modals/SessionsEditModal';
  import DeleteModal from '../../components/modals/DeleteModal';
  import SharedTable from '../../components/commons/SharedTable';

  const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
  );

  const fetchSessions = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  };
  
  const SessionsPage: React.FC = function () {
    const queryClient = useQueryClient();

    const { data: items, isLoading, error } = useQuery({
      queryKey: ['sessions'],
      queryFn: fetchSessions,
      select: (data) => data.data,
    });

      const editMutation = useMutation({
        mutationFn: ({ id, data }) => 
          fetch(`${BASE_URL}/sessions/${id}`, {
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
          fetch(`${BASE_URL}/sessions/${id}`, {
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
        { key: 'participant.firstName', header: 'participant' },
            { key: 'course.name', header: 'course' },
            { key: 'sessionNumber', header: 'session_number' },
            { key: 'week', header: 'week' },
            { key: 'sessionDate', header: 'Session Date' },
            { key: 'sessionTime', header: 'Session Time' },
            { key: 'facilitator.firstName', header: 'facilitator' },
            // { key: 'organizationId', header: 'organization' },
            // { key: 'sessionStudentReview', header: 'student_review' },
            // { key: 'sessionFacilitatorReview', header: 'session_review' },
        ];
  
    return (
        <NavbarSidebarLayout isFooter={false}>
          <SessionsPageHeader />
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
                      EditModal={SessionsEditModal}
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
  
  export default SessionsPage;
      