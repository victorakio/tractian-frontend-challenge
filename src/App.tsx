import { BrowserRouter, Route } from "react-router-dom";

import { GlobalStyle } from "./styles/global";

import Company from "./pages/Company/index";
import Home from "./pages/Home/index";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/company/:companyId" component={Company} />

      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
