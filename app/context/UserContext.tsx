import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  avatar_url: string | null;
  created_at: string | null;
  email: string | null;
  first_name: string | null;
  id: string;
  isCompleted: boolean;
  last_name: string | null;
  phone: string | null;
  role: string | null;
  updated_at: string | null;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
