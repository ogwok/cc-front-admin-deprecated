
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
    Spinner,
  } from "flowbite-react";
  
  const FacilitatorsForm = ({ onSubmit, initialData = {}, isEdit = false, isLoading = false  }) => {
    
  

      

  
    
  
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
            <Label htmlFor="firstName">firstName</Label>
            <TextInput id="firstName" name="firstName" type="text" defaultValue={initialData.firstName} required />
          </div>
        
          <div>
            <Label htmlFor="lastName">lastName</Label>
            <TextInput id="lastName" name="lastName" type="text" defaultValue={initialData.lastName} required />
          </div>
        
          <div>
            <Label htmlFor="phone">phone</Label>
            <TextInput id="phone" name="phone" type="text" defaultValue={initialData.phone} required />
          </div>
        
          <div>
            <Label htmlFor="email">email</Label>
            <TextInput id="email" name="email" type="text" defaultValue={initialData.email} required />
          </div>
        
          <div>
            <Label htmlFor="password">password</Label>
            <TextInput id="password" name="password" type="text" defaultValue={initialData.password} required />
          </div>
        
          <div>
            <Label htmlFor="role">role</Label>
            <TextInput id="role" name="role" type="text" defaultValue={initialData.role} required />
          </div>
        
          {/* <div>
            <Label htmlFor="organizationId">organizationId</Label>
            <TextInput id="organizationId" name="organizationId" type="text" defaultValue={initialData.organizationId} required />
          </div> */}
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
            isEdit ? 'Save Changes' : 'Add  Facilitators'
          )}
        </Button>
        </div>
      </form>
    );
  };
  
  export default FacilitatorsForm;
      