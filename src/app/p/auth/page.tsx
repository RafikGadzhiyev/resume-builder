"use client";
import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { LoginForm } from "../../../../components/Login";
import { Registration } from "../../../../components/SignUp";
import type { RootState } from "../../../../state/store";
import { Loading } from "../../../../components/Loading";
import { Forms } from "../../../../types";

const AuthContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthWrapper = styled.div`
  width: 575px;
  height: 750px;
  border-radius: 2rem;
  background-color: ${(styles: any) => styles.theme.secondaryColor};
  overflow: hidden;
  position: relative;
`;

const FormsContainer = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  transition: 300ms ease;
  padding-bottom: 3.5rem;
`;

const ExternalAuthsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
  position: relative;
`;

export default function Auth() {
  const [currentForm, setCurrentForm] = React.useState<Forms>("signin");
  const loadingState = useSelector(
    (store: RootState) => store.authReducer.isLoading
  );

  return (
    <AuthContainer>
      <AuthWrapper>
        {loadingState && (
          <Loading>
            {currentForm === "signin" ? "Signing in" : "Signing up"}
          </Loading>
        )}
        <FormsContainer
          style={{
            marginLeft: currentForm === "signin" ? "0" : "-100%",
          }}
        >
          <LoginForm setForm={setCurrentForm} />
          <Registration setForm={setCurrentForm} />
        </FormsContainer>
      </AuthWrapper>
    </AuthContainer>
  );
}
