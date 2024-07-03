import React, { createContext, useContext, useState } from 'react';

// Definição das interfaces necessárias
const UserContext = createContext({
    user: null,
    setUser: () => {},
});

// Provedor do contexto de usuário
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar o contexto de usuário
export const useUserContext = () => useContext(UserContext);
