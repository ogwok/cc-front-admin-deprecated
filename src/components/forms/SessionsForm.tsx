
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
    Spinner,
  } from "flowbite-react";
  
  const SessionsForm = ({ onSubmit, initialData = {}, isEdit = false, isLoading = false  }) => {
    
    const [participantIdOptions, setParticipantIdOptions] = useState([]);
  
    const [courseIdOptions, setCourseIdOptions] = useState([]);
  

      
    useEffect(() => {
      fetchParticipantIdOptions();
    }, []);
      
    
    useEffect(() => {
      fetchCourseIdOptions();
    }, []);
      

  
    
    const fetchParticipantIdOptions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
        const response = await fetch(`${BASE_URL}/participants`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
  
        const data = await response.json();
        setParticipantIdOptions(data.data);
      } catch (error) {
        console.error('Error fetching participantId options:', error);
      }
    };

  
    const fetchCourseIdOptions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
        const response = await fetch(`${BASE_URL}/courses`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
  
        const data = await response.json();
        setCourseIdOptions(data.data);
      } catch (error) {
        console.error('Error fetching courseId options:', error);
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
          
          <div>
            <Label htmlFor="participantId">participant</Label>
            <Select id="participantId" name="participantId" defaultValue={initialData.participantId} required>
                      <option value="">Select participant</option>
                      {participantIdOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.firstName } {option.lastName }
                        </option>
                      ))}
                    </Select>
          </div>
        
          <div>
            <Label htmlFor="courseId">course</Label>
            <Select id="courseId" name="courseId" defaultValue={initialData.courseId} required>
                      <option value="">Select course</option>
                      {courseIdOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Select>
          </div>
        
          <div>
            <Label htmlFor="sessionNumber">sessionNumber</Label>
            <TextInput id="sessionNumber" name="sessionNumber" type="number" defaultValue={initialData.sessionNumber} required />
          </div>
        
          <div>
            <Label htmlFor="week">week</Label>
            <TextInput id="week" name="week" type="number" defaultValue={initialData.week} required />
          </div>
        
          <div>
            <Label htmlFor="sessionDate">sessionDate</Label>
            <TextInput 
                      id="sessionDate" 
                      name="sessionDate" 
                      type="date" 
                      defaultValue={initialData.sessionDate ? new Date(initialData.sessionDate).toISOString().slice(0, 10) : ''} 
                      required 
                    />
          </div>
        
          <div>
            <Label htmlFor="sessionTime">sessionTime</Label>
            <TextInput 
                      id="sessionTime" 
                      name="sessionTime" 
                      type="time" 
                      defaultValue={initialData.sessionTime ? new Date(initialData.sessionTime).toISOString().slice(0, 5) : ''} 
                      required 
                    />
          </div>
        
          {/* <div>
            <Label htmlFor="facilitatorId">facilitatorId</Label>
            <TextInput id="facilitatorId" name="facilitatorId" type="text" defaultValue={initialData.facilitatorId} required />
          </div>
        
          <div>
            <Label htmlFor="organizationId">organizationId</Label>
            <TextInput id="organizationId" name="organizationId" type="text" defaultValue={initialData.organizationId} required />
          </div> */}
{/*         
          <div>
            <Label htmlFor="sessionStudentReview">sessionStudentReview</Label>
            <TextInput id="sessionStudentReview" name="sessionStudentReview" type="text" defaultValue={initialData.sessionStudentReview}  />
          </div>
        
          <div>
            <Label htmlFor="sessionFacilitatorReview">sessionFacilitatorReview</Label>
            <TextInput id="sessionFacilitatorReview" name="sessionFacilitatorReview" type="text" defaultValue={initialData.sessionFacilitatorReview}  />
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
            isEdit ? 'Save Changes' : 'Add  Sessions'
          )}
        </Button>
        </div>
      </form>
    );
  };
  
  export default SessionsForm;
      