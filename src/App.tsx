import { useState, useEffect } from "react";
import { FaIndustry } from "react-icons/fa";

import { api } from "./services/api";

import { GlobalStyle } from "./styles/global";

interface Company {
  id: number;
  name: string;
}

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    api.get("companies").then((response) => setCompanies(response.data));
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
      <FaIndustry />
      <h1>Companies</h1>
      <button onClick={handleCreateCompany}>Create Company</button>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>

      <GlobalStyle />
    </>
  );
}

export default App;
