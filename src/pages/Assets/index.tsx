import { useState } from "react";
import { Form, message } from "antd";

import PageHeader from "../../components/PageHeader";
import AssetList from "../../components/AssetsList";

import "./styles.scss";
import { useAssets } from "../../hooks/useAssets";
import NewAssetModal from "../../components/NewAssetModal";
import { api } from "../../services/api";

interface AssetProps {
  sensors: string[];
  model: string;
  name: string;
  power?: number;
  maxTemp: number;
  rpm?: number;
  unitId: number;
  companyId: number;
}

function Assets() {
  const { assets } = useAssets();

  const [isCreateUnitModalVisible, setIsCreateUnitModalVisible] =
    useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsCreateUnitModalVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsCreateUnitModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsCreateUnitModalVisible(false);
    form.resetFields();
  };

  const handleFinishCreateAssetModal = (values: AssetProps) => {
    const newAsset = {
      sensors: values.sensors,
      model: values.model,
      name: values.name,
      specifications: {
        power: values.power,
        maxTemp: values.maxTemp,
        rpm: values.rpm,
      },
      unitId: values.unitId,
      companyId: values.companyId,
    };
    api.post("assets", newAsset).then((response) => {
      console.log(response.data);
      message.success(`Ativo ${response.data.name} adicionado com sucesso!`);
      setIsCreateUnitModalVisible(false);
      form.resetFields();
    });
  };

  const handleFinishFailCreateUserModal = (errorInfo: any) => {
    message.error(`Erro: ${errorInfo}`);
  };

  return (
    <div className="assetsContainer">
      <PageHeader
        headerTitle="Todos os Ativos"
        modalButtonText="Adicionar ativo"
        openModalFunction={showModal}
      />
      <NewAssetModal
        isVisible={isCreateUnitModalVisible}
        onOkFunction={handleOk}
        onCancelFunction={handleCancel}
        onFinishFunction={handleFinishCreateAssetModal}
        onFinishFailFunction={handleFinishFailCreateUserModal}
        form={form}
      />

      <AssetList assets={assets} />
    </div>
  );
}

export default Assets;
