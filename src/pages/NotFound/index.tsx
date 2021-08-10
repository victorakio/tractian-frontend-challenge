import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>Page not found!</h1>
      <Link to="/">Voltar para a Home</Link>
    </>
  );
}

export default NotFound;
