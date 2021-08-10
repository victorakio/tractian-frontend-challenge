import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { api } from "../../services/api";

import "./styles.scss";

interface AssetProp {
  id: number;
  name: string;
  image: string;
  status: string;
}

function Assets() {
  const [assets, setAssets] = useState<AssetProp[]>([]);

  useEffect(() => {
    api.get("assets").then((response) => setAssets(response.data));
  }, []);

  return (
    <main className="assetsContainer">
      <header>
        <h2>Todos os Ativos</h2>
        <Button type="link">
          <EditOutlined /> Adicionar Ativo
        </Button>
      </header>

      <Row className="assetList">
        {assets.map((asset) => (
          <Link to={`/assets/${asset.id}`} key={asset.id}>
            <Col className="assetCard">
              <img src={asset.image} alt={asset.name} />
              <div>
                <h3>{asset.name}</h3>
                <p>{asset.status}</p>
              </div>
            </Col>
          </Link>
        ))}
      </Row>
    </main>
  );
}

export default Assets;
