import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../services/api";

interface userProps {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

interface NewUserModalProps {
  isVisible: boolean;
  onOkFunction: () => void;
  onCancelFunction: () => void;
  onFinishFunction: (values: userProps) => void;
  onFinishFailFunction: () => void;
  form: any;
}

interface UnitProps {
  id: number;
  name: string;
}

interface CompanyProps {
  id: number;
  name: string;
}

function NewUserModal({
  isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: NewUserModalProps) {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [units, setUnits] = useState<UnitProps[]>([]);

  const { Option } = Select;

  useEffect(() => {
    api.get("companies").then((response) => setCompanies(response.data));

    api.get("units").then((response) => setUnits(response.data));
  }, []);

  return (
    <Modal visible={isVisible} onOk={onOkFunction} onCancel={onCancelFunction}>
      <Form
        onFinish={onFinishFunction}
        onFinishFailed={onFinishFailFunction}
        form={form}
      >
        <h2>Adicionar usuário</h2>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Insira um Nome." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Insira um email válido.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Unidade"
          name="unitId"
          rules={[{ required: true, message: "Selecione uma unidade." }]}
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
          rules={[{ required: true, message: "Selecione uma empresa." }]}
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
      </Form>
    </Modal>
  );
}

export default NewUserModal;
