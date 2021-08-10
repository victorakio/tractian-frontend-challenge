import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";

import {
  Row,
  Col,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import {
  SettingOutlined,
  TagOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  FireOutlined,
  ReloadOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { api } from "../../services/api";

import { formatStatus } from '../../utils/formatStatus';

import "./styles.scss";
highchartsMore(Highcharts);
solidGauge(Highcharts);

interface AssetParams {
  assetId: string;
}

interface AssetProps {
  name: string;
  image: string;
  model: string;
  sensors: string[];
  status: string;
  unit: number;
  healthscore: number;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number;
  };
}

interface UnitProps {
  id: number;
  name: string;
}

function Asset() {
  const [asset, setAsset] = useState<AssetProps>();
  const [units, setUnits] = useState<UnitProps[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const editedAsset = {
      sensors: [values.sensors],
      status: values.status,
      model: values.model,
      name: values.name,
      specifications: {
        power: values.power,
        maxTemp: values.maxTemp,
        rpm: values.rpm,
      },
      unitId: values.unitId,
    };

    await api.put(`assets`, editedAsset).then((response) => {
      console.log(response);
      message.success(`Ativo ${asset?.name} editado com sucesso!`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { assetId } = useParams<AssetParams>();

  useEffect(() => {
    api.get(`assets/${assetId}`).then((response) => setAsset(response.data));

    api.get("units").then((response) => setUnits(response.data));
  }, [assetId]);

  const { Option } = Select;

  function onChange(value: number) {
    console.log(`selected ${value}`);
  }

  // let statusIcon;
  // let formatedStatus;

  // switch (asset?.status) {
  //   case "inAlert":
  //     statusIcon = <AlertOutlined />;
  //     formatedStatus = "Em Alerta";
  //     break;
  //   case "inDowntime":
  //     statusIcon = <StopOutlined />;
  //     formatedStatus = "Em Parada";
  //     break;
  //   case "inOperation":
  //     statusIcon = <CheckCircleOutlined />;
  //     formatedStatus = "Ativo";
  //     break;
  //   case "default":
  //     break;
  // }

  const formatedStatus = asset && formatStatus(asset.status);


  console.log(asset);
  const options = {
    chart: {
      type: "solidgauge",
      backgroundColor: null,
      tooltip: {
        enabled: false,
      },
      width: 350,
      spacing: [0, 0, 0, 0],
      className: "solidgaugeContainer",
    },
    title: {
      text: "Saúde do Ativo",
      align: "center",
      style: {
        fontWeight: 400,
      },
    },
    pane: {
      center: ["60%", "50%"],
      size: "100%",
      startAngle: -90,
      endAngle: 90,
      background: {
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    yAxis: {
      stops: [
        [0.1, "#DF5353"], // green
        [0.5, "#DDDF0D"], // yellow
        [0.9, "#55BF3B"], // red
      ],
      min: 0,
      max: 100,
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },
    series: [
      {
        data: [asset?.healthscore],
        dataLabels: {
          format:
            '<span style="font-size: 40px; display: block; text-align: center; line-height: 34px;">{y}</span><br/>' +
            "<div style='font-size: 20px; text-align: center; line-height: 0px;'>Health Score</div>",
        },
        useHTML: true,
      },
    ],
  };

  return (
    <>
      <Row className="assetContainer">
        <Col className="generalInfoContainer">
          <header>
            <h1>{asset?.name}</h1>
            <Button type="link" onClick={showModal}>
              <EditOutlined /> Editar Ativo
            </Button>

            <Modal
              title={`Editar Ativo ${asset?.name}`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item label="Nome" name="name">
                  <Input value={asset?.name} />
                </Form.Item>

                <Form.Item label="Modelo" name="model">
                  <Input value={asset?.model} />
                </Form.Item>

                <Form.Item label="Unidade" name="unitId">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Selecione uma unidade"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {units.map((unit) => (
                      <Option key={unit.id} value={unit.id}>
                        {unit.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Sensores" name="sensors">
                  <Input value={asset?.sensors} />
                </Form.Item>

                <Form.Item label="Potência" name="power">
                  <Input value={asset?.specifications.power} />
                </Form.Item>

                <Form.Item label="Temperatura Máxima" name="maxTemp,">
                  <Input value={asset?.specifications.maxTemp} />
                </Form.Item>

                <Form.Item label="RPM" name="rpm">
                  <Input value={asset?.specifications.rpm} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </header>

          <div>
            <img src={asset?.image} alt={asset?.name} />

            <div>
              <p>
                <strong>
                  <SettingOutlined /> Modelo:
                </strong>
                {asset?.model}
              </p>
              <p className={`asset${asset?.status}`}>
                <strong>{formatedStatus?.statusIcon} Status: </strong> {formatedStatus?.formatedStatus}
              </p>
              <p>
                <strong>
                  <HomeOutlined /> Unidade:
                </strong>
                {asset?.unit}
              </p>
              <p>
                <strong>
                  <TagOutlined /> Sensores:
                </strong>
                {asset?.sensors}
              </p>

              <Divider orientation="left">Especificações</Divider>

              <p>
                <strong>
                  <ThunderboltOutlined /> Potência:
                </strong>
                {asset?.specifications.power || "N/A"}
              </p>
              <p>
                <strong>
                  <FireOutlined /> Temperatura Máxima:
                </strong>
                {asset?.specifications.maxTemp || "N/A"}
              </p>
              <p>
                <strong>
                  <ReloadOutlined /> RPM:
                </strong>
                {asset?.specifications.rpm || "N/A"}
              </p>
            </div>
          </div>
        </Col>
        <Col className="solidgaugeContainer">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>

        <Col span={12} />
      </Row>
    </>
  );
}

export default Asset;
