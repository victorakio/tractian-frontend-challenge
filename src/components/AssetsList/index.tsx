import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import './styles.scss';

interface AssetProps {
  id: number;
  image: string;
  name: string;
  status: string;
}

interface AssetListProps {
  assets: AssetProps[];
}

function AssetList({ assets }: AssetListProps) {
  return (
    <>
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
    </>
  );
}

export default AssetList;