import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 90rem;
  height: 100vh;
  justify-content: space-evenly;
  margin: 0 auto;
`;

export const Logo = styled.img`
  display: flex;
  margin: 0 auto;
`;

export const CompanySelector = styled.div`
  background-color: #f5f5f5;
  border: 0.2rem solid #c4c4c4;
  border-radius: 1rem;
  height: 40rem;
  padding: 4rem;
`;

export const CompaniesHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const CompaniesList = styled.ul`
  display: flex;
  list-style: none;
  height: calc(100% - 4rem);
  align-items: center;
  justify-content: center;

  li {
    display: flex;
    flex-direction: column;
    border: 0.5rem solid #245fe1;
    padding: 4rem;
    border-radius: 1rem;
    height: 10rem;
    width: 25rem;
    justify-content: center;
    align-items: center;

    &:hover {
      filter: brightness(0.5);
    }

    a {
      text-decoration: none;
      color: #222;
    }
  }
`;
