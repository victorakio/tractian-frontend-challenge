import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

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
import EditUser from "./pages/EditUser";
import { UnitsProvider } from "./hooks/useUnits";
import Sidebar from "./components/Sidebar";
import { CompaniesProvider } from "./hooks/useCompanies";
import { UsersProvider } from "./hooks/useUsers";
import { AssetsProvider } from "./hooks/useAssets";

const { Content } = Layout;
function App() {
  return (
    <CompaniesProvider>
      <UnitsProvider>
        <UsersProvider>
          <AssetsProvider>
            <BrowserRouter>
              <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
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
                        <Route
                          path="/users/:userId/edit"
                          component={EditUser}
                        />
                        <Route component={NotFound}></Route>
                      </Switch>
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </BrowserRouter>
          </AssetsProvider>
        </UsersProvider>
      </UnitsProvider>
    </CompaniesProvider>
  );
}

export default App;
