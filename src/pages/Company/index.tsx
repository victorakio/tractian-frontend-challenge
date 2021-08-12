import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Form, message, Row } from "antd";

import { api } from "../../services/api";

import PageHeader from "../../components/PageHeader";
import AssetsChart from "../../components/AssetsChart";
import EditCompanyModal from "../../components/EditCompanyModal";
import { useAssets } from "../../hooks/useAssets";

import "./styles.scss";

interface CompanyParams {
  companyId: string;
}

interface CompanyProps {
  id: number;
  name: string;
}
function Company() {
  const [company, setCompany] = useState<CompanyProps>();
  const { assets } = useAssets();
  const [isEditUnitModalVisible, setIsEditUnitModalVisible] = useState(false);
  const { companyId } = useParams<CompanyParams>();

  const [form] = Form.useForm();

  const activeAssets = assets.filter((asset) => asset.status === "inOperation");
  const inAlertAssets = assets.filter((asset) => asset.status === "inAlert");
  const inDowntimeAssets = assets.filter(
    (asset) => asset.status === "inDowntime"
  );

  useEffect(() => {
    api
      .get(`companies/${companyId}`)
      .then((response) => setCompany(response.data));
  }, [companyId]);

  const handleFinishEditCompany = (values: CompanyProps) => {
    const editedCompany = {
      name: values.name,
    };

    api.put(`companies/${companyId}`, editedCompany).then(() => {
      message.success(`Empresa ${company?.name} editada com sucesso!`);
    });
  };

  const handleFinishFailEditCompany = (errorInfo: any) => {
    message.error(`Erro: ${errorInfo}`);
  };

  return (
    <>
      {company && (
        <PageHeader
          headerTitle={company.name}
          modalButtonText="Editar empresa"
          openModalFunction={() => setIsEditUnitModalVisible(true)}
        />
      )}

      <EditCompanyModal
        isVisible={isEditUnitModalVisible}
        onCancelFunction={() => setIsEditUnitModalVisible(false)}
        onOkFunction={() => setIsEditUnitModalVisible(false)}
        onFinishFailFunction={handleFinishFailEditCompany}
        onFinishFunction={handleFinishEditCompany}
        form={form}
      />
      <Row className="companyGeneralInfo">
        <Col>
          <AssetsChart
            status={["Ativo", "Em parada", "Em alerta"]}
            quantities={[
              activeAssets.length,
              inDowntimeAssets.length,
              inAlertAssets.length,
            ]}
          />
        </Col>
        <Col>
          <div className="alertAssetsContainer">
            <h2>Ativos que necessitam da sua atenção</h2>

            <div className="alertAssets">
              <div className="inAlert">
                <strong>Em alerta</strong>
                <ul>
                  {inAlertAssets.map((asset) => (
                    <Link to={`assets/${asset.id}`}>
                      <li>{asset.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>

              <div className="inDowntime">
                <strong>Em parada</strong>

                <ul>
                  {inDowntimeAssets.map((asset) => (
                    <Link to={`assets/${asset.id}`}>
                      <li>{asset.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Company;
