
  import { useState, useEffect } from 'react';
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  import {
    Button,
    Label,
    TextInput,
    Select,
  } from "flowbite-react";
  
  const StudentsForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    
    const [studentIdOptions, setStudentIdOptions] = useState([]);
  
    const [courseIdOptions, setCourseIdOptions] = useState([]);
  
    useEffect(() => {
      
      fetchStudentIdOptions();
    
      fetchCourseIdOptions();
    }, []);
  
    
    const fetchStudentIdOptions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }
        const response = await fetch(`${BASE_URL}/organization-agents`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch options');
        }
  
        const data = await response.json();
        setStudentIdOptions(data.data);
      } catch (error) {
        console.error('Error fetching studentId options:', error);
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
            <Label htmlFor="studentId">studentId</Label>
            <Select id="studentId" name="studentId" defaultValue={initialData.studentId} required>
                    <option value="">Select studentId</option>
                    {studentIdOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
          </div>
        
          <div>
            <Label htmlFor="courseId">courseId</Label>
            <Select id="courseId" name="courseId" defaultValue={initialData.courseId} required>
                    <option value="">Select courseId</option>
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
            <Label htmlFor="name">name</Label>
            <TextInput id="name" name="name" type="text" defaultValue={initialData.name} required />
          </div>
        
          <div>
            <Label htmlFor="organizationId">organizationId</Label>
            <TextInput id="organizationId" name="organizationId" type="text" defaultValue={initialData.organizationId} required />
          </div>
        
          <div>
            <Label htmlFor="sessionStudentReview">sessionStudentReview</Label>
            <TextInput id="sessionStudentReview" name="sessionStudentReview" type="text" defaultValue={initialData.sessionStudentReview} required />
          </div>
        
          <div>
            <Label htmlFor="sessionFacilitatorReview">sessionFacilitatorReview</Label>
            <TextInput id="sessionFacilitatorReview" name="sessionFacilitatorReview" type="text" defaultValue={initialData.sessionFacilitatorReview} required />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit">{isEdit ? 'Save Changes' : 'Add Students'}</Button>
        </div>
      </form>
    );
  };
  
  export default StudentsForm;
      