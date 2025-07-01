
import React from 'react';

const NotFound = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page not found</p>
      <a href="/" style={{ 
        color: '#007bff', 
        textDecoration: 'none',
        fontSize: '1.1rem'
      }}>
        Go back to home
      </a>
    </div>
  );
};

export default NotFound;
