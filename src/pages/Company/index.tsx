import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from 'antd';

import { api } from "../../services/api";

import PageHeader from "../../components/PageHeader";
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
  const [isEditUnitModalVisible, setIsEditUnitModalVisible] = useState(false);
  const { companyId } = useParams<CompanyParams>();

  const [form] = Form.useForm();

  useEffect(() => {
    api
      .get(`companies/${companyId}`)
      .then((response) => setCompany(response.data));

    api.get("assets").then((response) => setAssets(response.data));
  }, [companyId]);

  const showModal = () => {
    setIsEditUnitModalVisible(true);
    form.resetFields();
  };

  return (
    <>
      {company &&
        <PageHeader headerTitle={company.name} modalButtonText="Editar empresa" openModalFunction={showModal} />
      }
      <AssetsChart
        status={["Ativo", "Em parada", "Em alerta"]}
        quantities={[3, 2, 1]}
      />
    </>
  );
}

export default Company;
