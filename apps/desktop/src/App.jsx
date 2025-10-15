import React from 'react';
import LoginScreen from './features/auth/LoginScreen';
import HomeScreen from './features/home/HomeScreen';

function App() {
  const [user, setUser] = React.useState(null);

  console.log('App component rendered. User:', user);

  const handleLoginSuccess = (userData) => {
    console.log('handleLoginSuccess called with:', userData);
    setUser(userData);
    console.log('setUser has been called.');
  };

  const handleLogout = () => {
    setUser(null);
    // Here you might also want to call the backend logout endpoint
  };

  return (
    <div className="App">
      {user ? (
        <HomeScreen user={user} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;