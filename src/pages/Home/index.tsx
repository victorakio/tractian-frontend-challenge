import { Link } from "react-router-dom";

import logo from "../../assets/logo-tractian.svg";

import "./styles.scss";

function Home() {
  return (
    <main className="login">
      <img src={logo} alt="Tractian Logo" />

      <Link to="company/1">Entrar</Link>
    </main>
  );
}

export default Home;
