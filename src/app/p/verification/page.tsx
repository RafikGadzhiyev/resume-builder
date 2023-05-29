"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import { FormTypeIconContainer } from "../../../../elements/FormUI";
import { useTimer } from "../../../../hooks/useTimer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { SERVER_BASE_URL } from "../../../../consts/request_data";
import { ErrorSnackBar } from "../../../../components/SnackBars";
import EnvelopIcon from "../../../../assets/icons/envelop.svg";
import { VerificationCodeBlock } from "../../../../components/VerificationCodeBlock";
import { Timer } from "../../../../components/Timer";
import RepeatIcon from "../../../../assets/icons/repeat.svg";
import { BaseButton } from "../../../../elements/Buttons";
import { CheckVerificationCode } from "../../../../state/reducers/auth.reducer";
import { ResetUser } from "../../../../state/slices/auth.slice";
import Link from "next/link";

const EmailText = styled.span`
  color: #0aff14;
`;

const EmailIcon = styled.img`
  width: 2rem;
  aspect-ratio: 1/1;
`;

const VerificationContainer = styled.div`
  padding-top: 4rem;
`;

const VerificationNotification = styled(FormTypeIconContainer)`
  transform: rotate(-3.61deg);
`;

const VerificationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 5rem;
`;

const ResendContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ResendButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #0aff14;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: 300ms ease;
  gap: 0.25rem;

  &:not(:disabled):hover {
    // box-shadow: 0 0 10px #0FFF13;
    filter: drop-shadow(0 0 4px #0fff13);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const BackToLogin = styled(Link)`
  all: unset;
  cursor: pointer;
  color: #0bda13;
  font-size: 1rem;
  position: relative;
  transition: 300ms ease;

  &::before {
    content: "";
    position: absolute;
    bottom: -0.25rem;
    left: 50%;
    transform: translate(-50%);
    width: 70%;
    height: 2px;
    background-color: #0bda13;
    transition: 300ms ease;
  }

  &:hover {
    text-shadow: 0 0 10px #0fff13;
    &::before {
      width: 100%;
      box-shadow: 0 0 10px #0fff13;
    }
  }
`;

export default function VerificationCode() {
  const { time, isWorking, resetTimer } = useTimer(60 * 1000, 1000);
  const [isFull, setIsFull] = React.useState<boolean>(false);
  const queries = useSearchParams();
  const router = useRouter();
  const userData = useSelector((store: RootState) => store.authReducer.user);
  const error = useSelector((store: RootState) => store.authReducer.error);
  const oneTime = React.useRef(1);
  const cellsForm = React.useRef<HTMLFormElement>(null);
  const totalInputs = React.useRef<number>(-1);
  const code = React.useRef<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    code.current = "";
    let element = e.target as HTMLInputElement;
    let cellIndex = 1;
    if (element.value.length > 0) {
      if (cellsForm.current) {
        while (cellIndex <= totalInputs.current) {
          if (cellsForm.current[`cell-${cellIndex}`].value) {
            code.current += cellsForm.current[`cell-${cellIndex}`].value;
            cellIndex++;
          } else break;
        }
        if (cellIndex > totalInputs.current) {
          setIsFull(() => true);
          return;
        }

        cellsForm.current[`cell-${cellIndex}`].focus();
      }
    }
    if (isFull) {
      setIsFull(() => false);
    }
  };

  const resendCode = () => {
    resetTimer();
    // TODO: snackbar
    fetch(
      `${SERVER_BASE_URL}/verification/send_code?user_id=${queries.get(
        "user_id"
      )}`
    );
    if (cellsForm.current) {
      for (let i = 1; i <= totalInputs.current; ++i) {
        cellsForm.current[`cell-${i}`].value = "";
      }
    }
  };

  React.useEffect(() => {
    if (cellsForm.current && totalInputs.current === -1) {
      totalInputs.current = 0;
      for (let element of cellsForm.current.elements as any) {
        if (element.tagName === "INPUT") totalInputs.current++;
      }
    }
    if (queries.get("user_id") && oneTime.current) {
      fetch(
        `${SERVER_BASE_URL}/verification/send_code?user_id=${queries.get(
          "user_id"
        )}`
      );
      oneTime.current--;
    }
  }, [queries.get("user_id")]);

  return (
    <VerificationContainer>
      <ErrorSnackBar error={error} />
      <VerificationNotification>
        <EmailIcon src={EnvelopIcon.src} alt="Envelop icon" />
        <span>
          We have sent to your email <EmailText>{userData?.email}</EmailText> a
          verification code
        </span>
      </VerificationNotification>
      <VerificationForm ref={cellsForm}>
        <VerificationCodeBlock changeHandler={changeHandler} />
        <ResendContainer>
          <Timer time={time} />
          <ResendButton
            disabled={isWorking}
            type="button"
            onClick={() => resendCode()}
          >
            Resend code <img src={RepeatIcon.src} alt="Repeat icon" />
          </ResendButton>
        </ResendContainer>
        <BaseButton
          type="button"
          disabled={!isFull}
          onClick={() => {
            dispatch(
              CheckVerificationCode({
                user_id: userData?.id || "",
                code: code.current,
              })
            ).then(
              (response) =>
                response.meta.requestStatus === "fulfilled" &&
                router.push("/p/profile")
            );
          }}
        >
          Check code
        </BaseButton>
        <BackToLogin href="/auth" onClick={() => dispatch(ResetUser())}>
          Login via another email
        </BackToLogin>
      </VerificationForm>
    </VerificationContainer>
  );
}
