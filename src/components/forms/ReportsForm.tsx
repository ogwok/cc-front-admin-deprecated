
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
    Spinner,
  } from "flowbite-react";
  
  const ReportsForm = ({ onSubmit, initialData = {}, isEdit = false, isLoading = false  }) => {
    
    const [sessionIdOptions, setSessionIdOptions] = useState([]);
  

      
    useEffect(() => {
      fetchSessionIdOptions();
    }, []);
      

  
    
    const fetchSessionIdOptions = async () => {
      try {
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
  
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
  
        const data = await response.json();
        setSessionIdOptions(data.data);
      } catch (error) {
        console.error('Error fetching sessionId options:', error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* <div>
            <Label htmlFor="facilitatorId">facilitatorId</Label>
            <TextInput id="facilitatorId" name="facilitatorId" type="text" defaultValue={initialData.facilitatorId} required />
          </div> */}
        
          {/* <div>
            <Label htmlFor="organizationId">organizationId</Label>
            <TextInput id="organizationId" name="organizationId" type="text" defaultValue={initialData.organizationId} required />
          </div> */}
        
          <div>
            <Label htmlFor="sessionId">session</Label>
            <Select id="sessionId" name="sessionId" defaultValue={initialData.sessionId} required>
                      <option value="">Select session</option>
                      {sessionIdOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.sessionDate}
                        </option>
                      ))}
                    </Select>
          </div>
        
          <div>
            <Label htmlFor="highlights">highlights</Label>
            <TextInput id="highlights" name="highlights" type="text" defaultValue={initialData.highlights} required />
          </div>
        
          <div>
            <Label htmlFor="challenges">challenges</Label>
            <TextInput id="challenges" name="challenges" type="text" defaultValue={initialData.challenges} required />
          </div>
        
          <div>
            <Label htmlFor="solutions">solutions</Label>
            <TextInput id="solutions" name="solutions" type="text" defaultValue={initialData.solutions} required />
          </div>
        
          <div>
            <Label htmlFor="planForNextWeek">planForNextWeek</Label>
            <TextInput id="planForNextWeek" name="planForNextWeek" type="text" defaultValue={initialData.planForNextWeek} required />
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
            isEdit ? 'Save Changes' : 'Add  Reports'
          )}
        </Button>
        </div>
      </form>
    );
  };
  
  export default ReportsForm;
      