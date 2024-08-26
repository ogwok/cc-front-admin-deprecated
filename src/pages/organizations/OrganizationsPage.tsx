
  import React, { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import OrganizationsPageHeader from '../../components/headers/OrganizationsPageHeader';
  import OrganizationsEditModal from '../../components/modals/OrganizationsEditModal';
  import DeleteModal from '../../components/modals/DeleteModal';
  import SharedTable from '../../components/commons/SharedTable';
  
  const OrganizationsPage: React.FC = function () {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
  
        const response = await fetch(`${BASE_URL}/organizations`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    const handleEdit = async (id, data) => {
      try {
        const response = await fetch(`/api/organizations/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update item');
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`/api/organizations/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete item');
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };
  
    const columns = [
    { key: 'name', header: 'name' },
        { key: 'website', header: 'organization' },
        { key: 'email', header: 'student_review' },
    ];
  
    return (
        <NavbarSidebarLayout isFooter={false}>
          <OrganizationsPageHeader />
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                  <SharedTable 
                    items={items} 
                    columns={columns} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    EditModal={OrganizationsEditModal}
                    DeleteModal={DeleteModal}
                />
                </div>
              </div>
            </div>
          </div>
        </NavbarSidebarLayout>
    );
  };
  
  export default OrganizationsPage;
      