import { Link } from "react-router-dom";

import './styles.scss';

function NotFound() {
  return (
    <main className="notFoundContainer">
      <h1>Página não encontrada</h1>

      <p>Verifique se o endereço da página está correto e tente novamente.</p>
      <Link to="/">Voltar para a Home</Link>
    </main>
  );
}

export default NotFound;
