import {
  AlertOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

export function formatStatus(status: string) {
  let statusIcon;
  let formatedStatus;

  switch (status) {
    case "inAlert":
      statusIcon = <AlertOutlined />;
      formatedStatus = "Em Alerta";
      break;
    case "inDowntime":
      statusIcon = <StopOutlined />;
      formatedStatus = "Em Parada";
      break;
    case "inOperation":
      statusIcon = <CheckCircleOutlined />;
      formatedStatus = "Ativo";
      break;
    case "default":
      break;
  }

  return { statusIcon, formatedStatus }
}