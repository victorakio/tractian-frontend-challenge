import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { api } from "../services/api";

interface User {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

interface UsersProviderProps {
  children: ReactNode;
}

interface UsersContextData {
  users: User[];
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("users").then((response) => setUsers(response.data));
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);

  return context;
}
