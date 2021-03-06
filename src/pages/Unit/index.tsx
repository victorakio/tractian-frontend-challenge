import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, message, Table, Space, Button, Collapse } from "antd";
import { api } from "../../services/api";

import PageHeader from "../../components/PageHeader";
import AssetList from "../../components/AssetsList";
import EditUnitModal from "../../components/EditUnitModal";

interface unitParams {
  unitId: string;
}

interface unitProps {
  id: number;
  name: string;
  companyId: number;
}

interface assetProps {
  id: number;
  name: string;
  status: string;
  image: string;
  companyId: number;
  unitId: number;
}

interface userProps {
  id: number;
  name: string;
  email: string;
  companyId: number;
  unitId: number;
}

function Unit() {
  const [unit, setUnit] = useState<unitProps>();
  const [assets, setAssets] = useState<assetProps[]>([]);
  const [users, setUsers] = useState<userProps[]>([]);
  const { unitId } = useParams<unitParams>();
  const [isEditUnitModalVisible, setIsEditUnitModalVisible] = useState(false);

  const [form] = Form.useForm();
  const { Column } = Table;
  const { Panel } = Collapse;

  useEffect(() => {
    api.get(`units/${unitId}`).then((response) => setUnit(response.data));
    api.get("assets").then((response) => setAssets(response.data));
    api.get("users").then((response) => setUsers(response.data));
  }, [unitId]);

  const usersFromCompany = users.filter(
    (user) => user.companyId === unit?.companyId
  );

  const usersFromUnit = usersFromCompany.filter(
    (user) => user.unitId === unit?.id
  );

  const assetsFromCompany = assets.filter(
    (asset) => asset.companyId === unit?.companyId
  );

  const assetsFromUnit = assetsFromCompany.filter(
    (asset) => asset.unitId === unit?.id
  );

  const showModal = () => {
    setIsEditUnitModalVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsEditUnitModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsEditUnitModalVisible(false);
    form.resetFields();
  };

  const handleFinishCreateUserModal = (values: unitProps) => {
    const newUnit = {
      name: values.name,
      companyId: values.companyId,
    };
    api.post("units", newUnit).then((response) => {
      console.log(response.data);
      message.success(`Unidade ${response.data.name} adicionada com sucesso!`);
      setIsEditUnitModalVisible(false);
      form.resetFields();
    });
  };

  const handleFinishFailCreateUserModal = (errorInfo: any) => {
    message.error("Erro:", errorInfo);
  };

  const handleDeleteUser = (id: number) => {
    api
      .delete(`users/${id}`)
      .then(message.success(`Usu??rio de id: ${id} exclu??do com sucesso!`));
  };

  return (
    <>
      {unit && (
        <>
          <PageHeader
            headerTitle={unit.name}
            modalButtonText="Editar unidade"
            openModalFunction={showModal}
          />

          <EditUnitModal
            unitId={unitId}
            isVisible={isEditUnitModalVisible}
            onOkFunction={handleOk}
            onCancelFunction={handleCancel}
            onFinishFunction={handleFinishCreateUserModal}
            onFinishFailFunction={handleFinishFailCreateUserModal}
            form={form}
          />

          <Collapse>
            <Panel header="Ativos" key="assets">
              <AssetList assets={assetsFromUnit} />
            </Panel>
            <Panel header="Usu??rios" key="users">
              <Table dataSource={usersFromUnit}>
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Nome do Usu??rio" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Empresa" dataIndex="companyId" key="companyId" />
                <Column
                  title="Editar"
                  key="edit"
                  render={(record) => (
                    <Space size="middle">
                      <Link to={`/users/${record.id}/edit`}>Editar</Link>
                    </Space>
                  )}
                />
                <Column
                  title="Excluir"
                  key="delete"
                  render={(record) => (
                    <Space size="middle">
                      <Button
                        type="link"
                        onClick={() => handleDeleteUser(record.id)}
                      >
                        Excluir
                      </Button>
                    </Space>
                  )}
                />
              </Table>
            </Panel>
          </Collapse>
        </>
      )}
    </>
  );
}

export default Unit;
