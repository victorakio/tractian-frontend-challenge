import { Modal, Form, Input, Button, Select } from "antd";
import { useComapnies } from "../../hooks/useCompanies";
import { useUnits } from "../../hooks/useUnits";

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

interface NewAssetModalProps {
  isVisible: boolean;
  onOkFunction: () => void;
  onCancelFunction: () => void;
  onFinishFunction: (values: AssetProps) => void;
  onFinishFailFunction: (errorInfo: any) => void;
  form: any;
}

function NewAssetModal({
  isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: NewAssetModalProps) {
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
        <h2>Adicionar ativo</h2>

        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Insira um nome." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sensores"
          name="sensors"
          rules={[{ required: true, message: "Insira pelo menos um sensor." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Modelo"
          name="model"
          rules={[{ required: true, message: "Insira o modelo." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Potência"
          name="power"
          rules={[{ required: true, message: "Insira a potência." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Temperatura máxima"
          name="maxTemp"
          rules={[{ required: true, message: "Insira a temepratura máxima." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="RPM"
          name="rpm"
          rules={[{ required: true, message: "Insira RPM." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Empresa"
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

        <Form.Item
          label="Unidade"
          name="unitId"
          rules={[{ required: true, message: "Selecione uma unidade." }]}
        >
          <Select showSearch placeholder="Company">
            {units.map((unit) => (
              <Option key={unit.id} value={unit.id}>
                {unit.name}
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

export default NewAssetModal;
