import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Select, message } from 'antd';

import { api } from '../../services/api';

interface companyProps {
  id: number;
  name: string;
}

interface unitProps {
  id: number;
  name: string;
}

interface userProps {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

interface AssetParams {
  userId: string;
}

function EditUser() {
  const [companies, setCompanies] = useState<companyProps[]>([]);
  const [units, setUnits] = useState<unitProps[]>([]);
  const [user, setUser] = useState<userProps>();

  const { userId } = useParams<AssetParams>();

  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    api.get('companies').then((response) => setCompanies(response.data));
    api.get('units').then((response) => setUnits(response.data));

    api.get(`users/${userId}`).then((response) => setUser(response.data));
  }, [userId]);

  const handleOnFinish = (values: userProps) => {
    const editedUser = {
      name: values.name,
      email: values.email,
      unitId: values.unitId,
      companyId: values.companyId,
    };
    api.put(`users/${userId}`, editedUser).then((response) => {
      console.log(response.data);
      message.success(`Usuário ${response.data.name} alterado com sucesso!`);
    });
  }

  const handleOnFinishFail = (errorInfo: any) => {
    message.error(`Erro: ${errorInfo}`);
  }

  return (
    <>
      {user && <Form
        onFinish={handleOnFinish}
        onFinishFailed={handleOnFinishFail}
        form={form}
      >
        <h2>Editar usuário</h2>

        <Form.Item
          label="Name"
          name="name"
          initialValue={user.name}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
            },
          ]}
          initialValue={user.email}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Unidade"
          name="unitId"
          initialValue={user.unitId}
        >
          <Select showSearch style={{ width: 200 }} placeholder="Unidade">
            {units.map((unit) => (
              <Option key={unit.id} value={unit.id}>
                {unit.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Company"
          name="companyId"
          initialValue={user.companyId}
        >
          <Select showSearch style={{ width: 200 }} placeholder="Company">
            {companies.map((company) => (
              <Option key={company.id} value={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>}
    </>
  );
}

export default EditUser;
