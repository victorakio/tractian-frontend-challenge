import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { CompanyWrapper } from "./styles";

interface CompanyParams {
  companyId: string;
}

function Company() {
  const { companyId } = useParams<CompanyParams>();

  useEffect(() => {
    api
      .get(`companies/${companyId}`)
      .then((response) => console.log(response.data));
  }, [companyId]);

  return (
    <CompanyWrapper>
      <h1>Company</h1>
    </CompanyWrapper>
  );
}

export default Company;
