
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
    Spinner,
  } from "flowbite-react";
  
  const ParticipantsForm = ({ onSubmit, initialData = {}, isEdit = false, isLoading = false  }) => {
    
  

      

  
    
  
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
            <Label htmlFor="dateOfBirth">dateOfBirth</Label>
            <TextInput 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      type="date" 
                      defaultValue={initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().slice(0, 10) : ''} 
                      required 
                    />
          </div>
        
          <div>
            <Label htmlFor="profileImageSrc">profileImageSrc</Label>
            <TextInput id="profileImageSrc" name="profileImageSrc" type="text" defaultValue={initialData.profileImageSrc} required />
          </div>
        
          <div>
            <Label htmlFor="gender">gender</Label>
            <Select id="gender" name="gender" defaultValue={initialData.gender} required>
                      <option value="">Select gender</option>
                      
                    </Select>
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
            <Label htmlFor="nationality">nationality</Label>
            <TextInput id="nationality" name="nationality" type="text" defaultValue={initialData.nationality} required />
          </div>
        
          <div>
            <Label htmlFor="address">address</Label>
            <TextInput id="address" name="address" type="text" defaultValue={initialData.address} required />
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
            isEdit ? 'Save Changes' : 'Add  Participants'
          )}
        </Button>
        </div>
      </form>
    );
  };
  
  export default ParticipantsForm;
      