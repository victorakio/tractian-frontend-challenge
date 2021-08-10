import { Table, Space, message, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewUserModal from "../../components/NewUserModal";
import PageHeader from "../../components/PageHeader";
import { api } from "../../services/api";

interface userProps {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

function Users() {
  const [users, setUsers] = useState<userProps[]>([]);
  const [isCreateUserModalVisible, setIsCreateUserModalVisible] =
    useState(false);

  const { Column } = Table;

  const [form] = Form.useForm();

  const showModal = () => {
    setIsCreateUserModalVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsCreateUserModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsCreateUserModalVisible(false);
    form.resetFields();
  };

  const handleFinishCreateUserModal = (values: userProps) => {
    const newUser = {
      name: values.name,
      email: values.email,
      unitId: values.unitId,
      companyId: values.companyId,
    };
    api.post("users", newUser).then((response) => {
      console.log(response.data);
      message.success(`Usuário ${response.data.name} adicionado com sucesso!`);
      setIsCreateUserModalVisible(false);
      form.resetFields();
    });
  };

  const handleFinishFailCreateUserModal = () => {
    message.error("Operação falhou.");
  };

  const handleDeleteUser = (id: number) => {
    api
      .delete(`users/${id}`)
      .then(message.success(`Usuário de id: ${id} excluído com sucesso!`));
  };

  useEffect(() => {
    api.get("users").then((response) => setUsers(response.data));
  }, []);

  return (
    <>
      <PageHeader
        headerTitle="Usuários"
        modalButtonText="Adicionar usuário"
        openModalFunction={showModal}
      />
      <NewUserModal
        isVisible={isCreateUserModalVisible}
        onOkFunction={handleOk}
        onCancelFunction={handleCancel}
        onFinishFunction={handleFinishCreateUserModal}
        onFinishFailFunction={handleFinishFailCreateUserModal}
        form={form}
      />
      <Table dataSource={users}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Nome do Usuário" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Unidade" dataIndex="unitId" key="unitId" />
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
              <Button type="link" onClick={() => handleDeleteUser(record.id)}>
                Excluir
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default Users;
