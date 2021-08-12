import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { api } from "../services/api";

interface Asset {
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  specifications: {
    power: number;
    maxTemp: number;
    rpm: number;
  };
  unitId: number;
  companyId: number;
}

interface AssetsProviderProps {
  children: ReactNode;
}

interface AssetsContextData {
  assets: Asset[];
}

const AssetsContext = createContext<AssetsContextData>({} as AssetsContextData);

export function AssetsProvider({ children }: AssetsProviderProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    api.get("assets").then((response) => setAssets(response.data));
  }, []);

  return (
    <AssetsContext.Provider value={{ assets }}>
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetsContext);

  return context;
}
