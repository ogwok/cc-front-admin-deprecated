
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
  } from "flowbite-react";
  
  const OrganizationsForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    
  
    useEffect(() => {
      
    }, []);
  
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          <div>
            <Label htmlFor="name">name</Label>
            <TextInput id="name" name="name" type="text" defaultValue={initialData.name} required />
          </div>
        
          <div>
            <Label htmlFor="website">website</Label>
            <TextInput id="website" name="website" type="text" defaultValue={initialData.website} required />
          </div>
        
          <div>
            <Label htmlFor="email">email</Label>
            <TextInput id="email" name="email" type="text" defaultValue={initialData.email} required />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">{isEdit ? 'Save Changes' : 'Add Organizations'}</Button>
        </div>
      </form>
    );
  };
  
  export default OrganizationsForm;
      