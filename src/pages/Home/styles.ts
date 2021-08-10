import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  background-image: linear-gradient(to left, var(--blue-50), var(--blue-500));
  align-items: center;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  margin: 0 auto;
`;

export const Logo = styled.img`
  display: flex;
  margin: 0 auto;
`;

export const CompanySelector = styled.div`
  background-color: var(--gray-50);
  border: 0.4rem solid var(--gray-200);
  border-radius: 1rem;
  height: 40rem;
  padding: 4rem;
  width: 90rem;
  box-shadow: 14px 9px 23px 0px rgba(50, 50, 50, 0.34);
`;

export const CompaniesHeader = styled.header`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: unset;
    color: var(--blue-500);
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;

    transition: filter 0.2s;

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      filter: brightness(0.5);
    }
  }
`;

export const CompaniesList = styled.ul`
  display: flex;
  list-style: none;
  height: calc(100% - 4rem);
  align-items: center;
  justify-content: center;

  li {
    a {
      display: flex;
      border: 0.5rem solid var(--blue-500);
      padding: 4rem;
      border-radius: 1rem;
      height: 10rem;
      width: 25rem;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: var(--blue-500);

      transition: all 0.2s;

      &:hover {
        color: var(--gray-50);
        background-color: var(--blue-50);
        border-color: var(--blue-50);
      }
    }
  }
`;
