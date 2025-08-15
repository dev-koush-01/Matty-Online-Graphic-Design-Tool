import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Canvas() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to editor page when this component mounts
    navigate('/editor');
  }, [navigate]);

  return null; // Optional: you can return a loading spinner if you want
}

export default Canvas;
