import React from 'react';
import { useEffect } from 'react';
import { API_ENDPOINTS } from '../../API/Constanst';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const callAPIProjects = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // return trang home
      navigate('/');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(API_ENDPOINTS.PROJECTS, { headers });
      if (!response.ok) {
        alert('False Call API');
      } else {
        // data => error => navigate("/login")
      }
      const data = await response.json();
      setProjects(data);
    }
  };
  useEffect(() => {
    callAPIProjects();
  }, []);
  return <div>Create Table</div>;
};

export default Projects;
