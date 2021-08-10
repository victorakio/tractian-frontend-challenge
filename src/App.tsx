import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  ClusterOutlined,
  ApartmentOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import "./styles/reset.scss";
import "antd/dist/antd.css";
import "./styles/styles.scss";

import Company from "./pages/Company/index";
import Home from "./pages/Home/index";
import NotFound from "./pages/NotFound";
import Assets from "./pages/Assets";
import Asset from "./pages/Asset";
import Unit from "./pages/Unit";
import Users from "./pages/Users";

import logoTractian from "./assets/logo-tractian.svg";
import { useEffect } from "react";
import { api } from "./services/api";
import EditUser from "./pages/EditUser";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

interface CompanyProps {
  id: number;
  name: string;
}

interface UnitProps {
  id: number;
  name: string;
  companyId: number;
}

function App() {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [units, setUnits] = useState<UnitProps[]>([]);

  useEffect(() => {
    api.get("companies").then((response) => setCompanies(response.data));

    api.get("units").then((response) => setUnits(response.data));
  }, []);
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <img src={logoTractian} alt="Logo Tractian" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="sub1" icon={<ShopOutlined />} title="Empresas">
              {companies.map((company) => (
                <Menu.Item key={company.id}>
                  <Link to={`/company/${company.id}`}>{company.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
            <Menu.Item key="2" icon={<ClusterOutlined />}>
              <Link to="/assets">Ativos</Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<ApartmentOutlined />} title="Unidades">
              {units.map((unit) => (
                <Menu.Item key={unit.id}>
                  <Link to={`/unit/${unit.id}`}>{unit.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/users">Usuários</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/company/:companyId" component={Company} />

                <Route path="/assets" exact component={Assets} />
                <Route path="/assets/:assetId" component={Asset} />

                <Route path="/unit/:unitId" exact component={Unit} />

                <Route path="/users" exact component={Users} />
                <Route path="/users/:userId/edit" component={EditUser} />
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
