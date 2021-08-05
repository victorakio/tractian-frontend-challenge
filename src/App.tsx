import { useEffect } from "react";
import { api } from "./services/api";
import { GlobalStyle } from "./styles/global";

function App() {
  useEffect(() => {
    api.get("db").then((data) => console.log(data.data.companies));
  }, []);

  const handleCreateCompany = async () => {
    await api
      .put("companies/1", {
        company: {
          name: "Awesome Entry",
        },
      })
      .then((response) => console.log(response.data));
  };

  return (
    <>
      <h1>Hello Tractian</h1>
      <button onClick={handleCreateCompany}>Create Company</button>
      <GlobalStyle />
    </>
  );
}

export default App;
