import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { api } from "../services/api";

interface Company {
  id: number;
  name: string;
}

interface CompaniesProviderProps {
  children: ReactNode;
}

interface CompaniesContextData {
  companies: Company[];
}

const CompaniesContext = createContext<CompaniesContextData>(
  {} as CompaniesContextData
);

export function CompaniesProvider({ children }: CompaniesProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    api.get("companies").then((response) => setCompanies(response.data));
  }, []);
  console.log(companies);
  return (
    <CompaniesContext.Provider value={{ companies }}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useComapnies() {
  const context = useContext(CompaniesContext);

  return context;
}
