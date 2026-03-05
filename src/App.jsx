import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import VCTForm from './pages/VCTForm';
import History from './pages/History';

function App() {
  const user = localStorage.getItem('vct_user');

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/new-vct"
            element={user ? <VCTForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
