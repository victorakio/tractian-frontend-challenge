import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import logo from "../../assets/logo-tractian.svg";

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
    <h2>Home</h2>
  );
}

export default Home;
