import { Modal, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

interface CompanyProps {
  id: number;
  name: string;
}

interface CompanyParams {
  companyId: string;
}

interface CompanyProps {
  id: number;
  name: string;
}

interface EditCompanyModalProps {
  isVisible: boolean;
  onOkFunction: () => void;
  onCancelFunction: () => void;
  onFinishFunction: (values: CompanyProps) => void;
  onFinishFailFunction: (errorInfo: any) => void;
  form: any;
}

function EditCompanyModal({
  isVisible,
  onOkFunction,
  onCancelFunction,
  onFinishFunction,
  onFinishFailFunction,
  form,
}: EditCompanyModalProps) {
  const [company, setCompany] = useState<CompanyProps>();

  const { companyId } = useParams<CompanyParams>();

  useEffect(() => {
    api
      .get(`companies/${companyId}`)
      .then((response) => setCompany(response.data));
  }, [companyId]);
  return (
    <Modal visible={isVisible} onOk={onOkFunction} onCancel={onCancelFunction}>
      <h2>Editar empresa</h2>
      {company && (
        <Form
          onFinish={onFinishFunction}
          onFinishFailed={onFinishFailFunction}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Insira um Nome." }]}
            initialValue={company.name}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default EditCompanyModal;
