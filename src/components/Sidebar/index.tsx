import { Link } from "react-router-dom";

import { Layout, Menu } from "antd";
import {
  ClusterOutlined,
  ApartmentOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import logoTractian from "../../assets/logo-tractian.svg";
import { useUnits } from "../../hooks/useUnits";
import { useComapnies } from "../../hooks/useCompanies";

function Sidebar() {
  const { companies } = useComapnies();
  const { units } = useUnits();
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Sider>
      <img src={logoTractian} alt="Logo Tractian" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu key="sub1" icon={<ShopOutlined />} title="Empresas">
          {companies.map((company) => (
            <Menu.Item key={`company${company.id}`}>
              <Link to={`/company/${company.id}`}>{company.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item key="2" icon={<ClusterOutlined />}>
          <Link to="/assets">Ativos</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<ApartmentOutlined />} title="Unidades">
          {units.map((unit) => (
            <Menu.Item key={`unit${unit.id}`}>
              <Link to={`/unit/${unit.id}`}>{unit.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to="/users">Usuários</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
