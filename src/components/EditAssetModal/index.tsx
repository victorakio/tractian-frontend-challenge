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

interface AssetEditProps {
  name: string;
  model: string;
  sensors: string[];
  status: string;
  unitId: number;
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number;
  };
  companyId: number;
}

interface EditssetModalProps {
  asset: AssetEditProps;
  isVisible: boolean;
  onOkFunction: () => void;
  onCancelFunction: () => void;
  onFinishFunction: (values: AssetProps) => void;
  onFinishFailFunction: (errorInfo: any) => void;
  form: any;
}

function EditAssetModal({
  asset,
  isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: EditssetModalProps) {
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
        <Form.Item label="Nome" name="name" initialValue={asset.name}>
          <Input value={asset.name} />
        </Form.Item>

        <Form.Item label="Modelo" name="model" initialValue={asset.model}>
          <Input value={asset.model} />
        </Form.Item>

        <Form.Item
          label="Empresa"
          name="companyId"
          initialValue={asset.companyId}
        >
          <Select showSearch placeholder="Selecione uma empresa">
            {companies.map((company) => (
              <Option key={company.id} value={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Unidade" name="unitId" initialValue={asset.unitId}>
          <Select showSearch placeholder="Selecione uma unidade">
            {units.map((unit) => (
              <Option key={unit.id} value={unit.id}>
                {unit.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Sensores" name="sensors" initialValue={asset.sensors}>
          <Input value={asset.sensors} />
        </Form.Item>

        <Form.Item
          label="Potência"
          name="power"
          initialValue={asset.specifications.power}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Temperatura Máxima"
          name="maxTemp"
          initialValue={asset.specifications.maxTemp}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="RPM"
          name="rpm"
          initialValue={asset.specifications.rpm}
        >
          <Input value={asset?.specifications.rpm} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditAssetModal;
