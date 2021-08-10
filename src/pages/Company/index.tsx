import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../services/api";

import AssetsChart from "../../components/AssetsChart";

interface CompanyParams {
  companyId: string;
}

interface CompanyProps {
  name: string;
}

interface AssetProps {
  id: number;
  status: string;
}

function Company() {
  const [company, setCompany] = useState<CompanyProps>();
  const [assets, setAssets] = useState<AssetProps[]>([]);

  const { companyId } = useParams<CompanyParams>();

  useEffect(() => {
    api
      .get(`companies/${companyId}`)
      .then((response) => setCompany(response.data));

    api.get("assets").then((response) => setAssets(response.data));
  }, [companyId]);

  return (
    <>
      <AssetsChart
        status={["Ativo", "Em parada", "Em alerta"]}
        quantities={[3, 2, 1]}
      />
    </>
  );
}

export default Company;
