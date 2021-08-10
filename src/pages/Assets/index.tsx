import { useState, useEffect } from "react";
import { Form } from "antd";

import { api } from "../../services/api";

import PageHeader from "../../components/PageHeader";
import AssetList from '../../components/AssetsList';

import "./styles.scss";

interface AssetProp {
  id: number;
  name: string;
  image: string;
  status: string;
}

function Assets() {
  const [assets, setAssets] = useState<AssetProp[]>([]);
  const [isEditUnitModalVisible, setIsEditUnitModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    api.get("assets").then((response) => setAssets(response.data));
  }, []);

  const showModal = () => {
    setIsEditUnitModalVisible(true);
    form.resetFields();
  };

  return (
    <div className="assetsContainer">
      <PageHeader headerTitle="Todos os Ativos" modalButtonText="Adicionar ativo" openModalFunction={showModal} />

      <AssetList assets={assets} />
    </div>
  );
}

export default Assets;
