import React from 'react';

const HomeScreen = ({ user, onLogout }) => {
  return (
    <div>
      <h1 data-cy="welcome-message">Welcome, {user.email}</h1>
      <button id="logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomeScreen;