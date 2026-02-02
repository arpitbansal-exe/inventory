import React from 'react';
import { useLocation } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import ListPage from './pages/ListPage';

function App() {
  const location = useLocation();
  
  // Route based on pathname
  if (location.pathname === '/list') {
    return <ListPage />;
  }
  
  return <BoardPage />;
}

export default App;
