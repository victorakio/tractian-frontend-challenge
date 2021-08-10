import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface UnitProps {
  id: number;
  name: string;
  companyId: number;
}

interface CompanyProps {
  id: number;
  name: string;
}

interface EditCompanyModalProps {
  isVisible: boolean;
  onOkFunction: () => void;
  onCancelFunction: () => void;
  onFinishFunction: (values: UnitProps) => void;
  onFinishFailFunction: () => void;
  form: any;
}

function EditCompanyModal({ isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: EditCompanyModalProps) {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);

  useEffect(() => {
    api.get("companies").then((response) => setCompanies(response.data));
  }, []);
  return (
    <Modal visible={isVisible} onOk={onOkFunction} onCancel={onCancelFunction}>
      <Form
        onFinish={onFinishFunction}
        onFinishFailed={onFinishFailFunction}
        form={form}
      >
        <h2>Editar empresa</h2>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Insira um Nome." }]}
        >
          <Input />
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

export default EditCompanyModal;