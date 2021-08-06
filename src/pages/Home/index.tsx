import { useState, useEffect } from "react";
import { FaIndustry } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import logo from "../../assets/logo-tractian.svg";
import {
  CompaniesHeader,
  CompaniesList,
  CompanySelector,
  HomeContainer,
  Logo,
} from "./styles";

interface Company {
  id: number;
  name: string;
}

function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    api.get("companies").then((response) => setCompanies(response.data));
  }, []);

  const handleCreateCompany = async () => {
    await api
      .post("companies", {
        company: {
          name: "Awesome Entry",
        },
      })
      .then((response) => console.log(response.data));
  };

  return (
    <HomeContainer>
      <Logo src={logo} alt="logo" width="250" />
      <CompanySelector>
        <CompaniesHeader>
          <h1>
            <FaIndustry />
            Companies
          </h1>
          <button onClick={handleCreateCompany}>Create Company</button>
        </CompaniesHeader>

        <CompaniesList>
          {companies.map((company) => (
            <li key={company.id}>
              <Link to={`/company/${company.id}`}>
                <strong>{company.name}</strong>
              </Link>
            </li>
          ))}
        </CompaniesList>
      </CompanySelector>
    </HomeContainer>
  );
}

export default Home;
