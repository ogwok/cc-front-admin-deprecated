
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
    Spinner,
  } from "flowbite-react";
  
  const CoursesForm = ({ onSubmit, initialData = {}, isEdit = false, isLoading = false  }) => {
    
  

      

  
    
  
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
            <Label htmlFor="description">description</Label>
            <TextInput id="description" name="description" type="text" defaultValue={initialData.description} required />
          </div>
        
          <div>
            <Label htmlFor="organizationId">organizationId</Label>
            <TextInput id="organizationId" name="organizationId" type="text" defaultValue={initialData.organizationId} required />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" light={true} />
              <span className="ml-2">
                {isEdit ? 'Saving...' : 'Adding...'}
              </span>
            </>
          ) : (
            isEdit ? 'Save Changes' : 'Add  Courses'
          )}
        </Button>
        </div>
      </form>
    );
  };
  
  export default CoursesForm;
      