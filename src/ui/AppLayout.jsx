import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
const SyteldApplayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const AppLayout = () => {
  return (
    <SyteldApplayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </SyteldApplayout>
  );
};

export default AppLayout;
