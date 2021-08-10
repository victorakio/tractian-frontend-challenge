import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import "./styles.scss";

interface PageHeaderProps {
  headerTitle: string;
  modalButtonText: string;
  openModalFunction: () => void;
}

function PageHeader({
  headerTitle,
  modalButtonText,
  openModalFunction,
}: PageHeaderProps) {
  return (
    <header>
      <h2>{headerTitle}</h2>

      <Button type="link" onClick={openModalFunction}>
        <EditOutlined /> {modalButtonText}
      </Button>
    </header>
  );
}

export default PageHeader;
