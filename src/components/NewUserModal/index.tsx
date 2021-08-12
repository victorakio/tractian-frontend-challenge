import { Modal, Form, Input, Button, Select } from "antd";
import { useComapnies } from "../../hooks/useCompanies";
import { useUnits } from "../../hooks/useUnits";

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
  onFinishFailFunction: (errorInfo: any) => void;
  form: any;
}

function NewUserModal({
  isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: NewUserModalProps) {
  const { companies } = useComapnies();
  const { units } = useUnits();
  const { Option } = Select;

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
          <Select showSearch placeholder="Unidade">
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
