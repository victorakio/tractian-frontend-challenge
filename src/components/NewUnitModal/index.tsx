import { Modal, Form, Input, Button, Select } from "antd";
import { useComapnies } from "../../hooks/useCompanies";

interface UnitProps {
  id: number;
  name: string;
  companyId: number;
}

interface NewUnitModalProps {
  isVisible: boolean;
  onOkFunction: () => void;
  onCancelFunction: () => void;
  onFinishFunction: (values: UnitProps) => void;
  onFinishFailFunction: (errorInfo: any) => void;
  form: any;
}

function NewUnitModal({
  isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: NewUnitModalProps) {
  const { companies } = useComapnies();

  const { Option } = Select;
  return (
    <Modal visible={isVisible} onOk={onOkFunction} onCancel={onCancelFunction}>
      <Form
        onFinish={onFinishFunction}
        onFinishFailed={onFinishFailFunction}
        form={form}
      >
        <h2>Adicionar unidade</h2>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Insira um Nome." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company"
          name="companyId"
          rules={[{ required: true, message: "Selecione uma empresa." }]}
        >
          <Select showSearch placeholder="Company">
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

export default NewUnitModal;
