import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1 .Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  //2 if theren i no authenticated user , redirect to the /login

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  // 3. While loading, show spinner

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user , render the App
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
