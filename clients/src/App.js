import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./views/app/auth/login";
import Barra from './views/app/components/Barra';
import Perfil from './views/app/components/Perfil';
import Feed from './views/app/components/Feed';

// Componente para rotas protegidas
function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('accessToken') !== null; // Verifique se o usuário está autenticado
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

// Componente de layout protegido que inclui a barra de navegação
function ProtectedLayout() {
  return (
    <>
      <Barra />
      <Outlet /> {/* Renderiza o conteúdo da rota protegida */}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element= {<Feed/>} />
        <Route path="/profile" element={<PrivateRoute element={Perfil} />} />
      </Route>

      {/* Redireciona para /login se a rota não for encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
