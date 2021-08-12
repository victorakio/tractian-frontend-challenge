import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { api } from "../services/api";

interface Unit {
  id: number;
  name: string;
  companyId: number;
}

interface UnitsProviderProps {
  children: ReactNode;
}

interface UnitsContextData {
  units: Unit[];
  unit?: Unit;
}

const UnitsContext = createContext<UnitsContextData>({} as UnitsContextData);

export function UnitsProvider({ children }: UnitsProviderProps) {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    api.get("units").then((response) => setUnits(response.data));
  }, []);

  return (
    <UnitsContext.Provider value={{ units }}>{children}</UnitsContext.Provider>
  );
}

export function useUnits() {
  const context = useContext(UnitsContext);

  return context;
}
