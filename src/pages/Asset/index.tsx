import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Row, Col, Divider, Button, message, Form, Select } from "antd";
import {
  SettingOutlined,
  TagOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  FireOutlined,
  ReloadOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { api } from "../../services/api";

import { formatStatus } from "../../utils/formatStatus";

import "./styles.scss";
import EditAssetModal from "../../components/EditAssetModal";
import { useUnits } from "../../hooks/useUnits";
import AssetHealthScore from "../../components/AssetHealthScore";
import Modal from "antd/lib/modal/Modal";
import { useUsers } from "../../hooks/useUsers";

interface AssetParams {
  assetId: string;
}

interface AssetProps {
  name: string;
  image: string;
  model: string;
  sensors: string[];
  status: string;
  unitId: number;
  companyId: number;
  healthscore: number;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number;
  };
}
function Asset() {
  const [asset, setAsset] = useState<AssetProps>();

  const { units } = useUnits();

  const { users } = useUsers();

  const [isEditAssetModalVisible, setIsEditAssetModalVisible] = useState(false);

  const [isAddResponsibleVisible, setIsAddResponsibleVisible] = useState(false);

  const { assetId } = useParams<AssetParams>();

  const status = asset && formatStatus(asset.status);

  const unitName = units.filter((unit) => unit.id === asset?.unitId);

  const formatedUptime = asset && Math.floor(asset.metrics.totalUptime / 3.6);

  const formatedLastUptime =
    asset && new Date(asset.metrics.lastUptimeAt).toLocaleString();

  const [form] = Form.useForm();

  const { Option } = Select;

  useEffect(() => {
    api.get(`assets/${assetId}`).then((response) => setAsset(response.data));
  }, [assetId]);

  const showModal = () => {
    setIsEditAssetModalVisible(true);
  };

  const handleOk = () => {
    setIsEditAssetModalVisible(false);
  };

  const handleCancel = () => {
    setIsEditAssetModalVisible(false);
  };

  const handleFinishEditAssetModal = async (values: any) => {
    const editedAsset = {
      sensors: [values.sensors],
      status: values.status,
      model: values.model,
      name: values.name,
      specifications: {
        power: values.power,
        maxTemp: values.maxTemp,
        rpm: values.rpm,
      },
      unitId: values.unitId,
    };

    await api.put(`assets/${assetId}`, editedAsset).then(() => {
      message.success(`Ativo ${asset?.name} editado com sucesso!`);
    });
  };

  const handleFinishFailEditAssetModal = (errorInfo: any) => {
    message.error("Erro:", errorInfo);
  };

  const showAddResponsibleModal = () => {
    setIsAddResponsibleVisible(true);
  };

  const handleOkResponsibleModal = () => {
    setIsAddResponsibleVisible(false);
  };

  const handleCancelResponsibleModal = () => {
    setIsAddResponsibleVisible(false);
  };

  const onFinishAddResponsibleFunction = () => {
    message.success("Responsável adicionado");
  };

  const handleDeleteAsset = () => {
    api.delete(`assets/${assetId}`).then(() => {
      message.success(`Ativo ${asset?.name} excluído com sucesso!`);
    });
  };

  return (
    <>
      <Row className="assetContainer">
        <Col className="generalInfoContainer">
          <header>
            <h1>{asset?.name}</h1>
            <Button type="link" onClick={showModal}>
              <EditOutlined /> Editar Ativo
            </Button>
            {asset && (
              <EditAssetModal
                asset={asset}
                isVisible={isEditAssetModalVisible}
                onOkFunction={handleOk}
                onCancelFunction={handleCancel}
                onFinishFunction={handleFinishEditAssetModal}
                onFinishFailFunction={handleFinishFailEditAssetModal}
                form={form}
              />
            )}
          </header>

          <div>
            <img src={asset?.image} alt={asset?.name} />

            <div>
              <p>
                <strong>
                  <SettingOutlined /> Modelo:
                </strong>
                {asset?.model}
              </p>
              <p className={`asset${asset?.status}`}>
                <strong>{status?.statusIcon} Status:</strong>
                {status?.formatedStatus}
              </p>
              <p>
                <strong>
                  <HomeOutlined /> Unidade:
                </strong>
                {unitName[0]?.name}
              </p>
              <p>
                <strong>
                  <TagOutlined /> Sensores:
                </strong>
                {asset?.sensors}
              </p>

              <Divider orientation="left">Especificações</Divider>

              <p>
                <strong>
                  <ThunderboltOutlined /> Potência:
                </strong>
                {asset?.specifications.power || "N/A"}
              </p>
              <p>
                <strong>
                  <FireOutlined /> Temperatura Máxima:
                </strong>
                {asset?.specifications.maxTemp || "N/A"}
              </p>
              <p>
                <strong>
                  <ReloadOutlined /> RPM:
                </strong>
                {asset?.specifications.rpm || "N/A"}
              </p>
            </div>
          </div>
          <Button
            className="btnAddResponsible"
            type="primary"
            onClick={showAddResponsibleModal}
          >
            Responsável
          </Button>
          <Button danger onClick={handleDeleteAsset}>
            Excluir ativo
          </Button>
        </Col>
        <Col className="metricsContainer">
          <div className="uptimeContainer">
            <div className="uptime">
              <strong>Tempo em funcionamento</strong>
              <strong>{`${formatedUptime} Horas`}</strong>
            </div>

            <div className="lastUptimeCheck">
              <strong>Última verificação de funcionamento</strong>
              <strong>{formatedLastUptime}</strong>
            </div>
          </div>

          <hr />

          {asset?.healthscore && (
            <AssetHealthScore assetScore={asset.healthscore} />
          )}
        </Col>
      </Row>

      <Modal
        visible={isAddResponsibleVisible}
        onOk={handleOkResponsibleModal}
        onCancel={handleCancelResponsibleModal}
      >
        <Form onFinish={onFinishAddResponsibleFunction} form={form}>
          <h2>Adicionar responsável</h2>

          <Form.Item label="Responsável" name="responsavel">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Selecione um responsável"
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Asset;
