import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "./../assets/icons/lock.svg";
import eyeClosed from "./../assets/icons/eye_closed.svg";
import eyeOpened from "./../assets/icons/eye_opened.svg";
import { FormType } from "./FormType";
import { AppDispatch, RootState } from "../state/store";
import { SignupUser } from "../state/reducers/auth.reducer";
import { FormInput } from "./FormInput";
import { checkEmail, checkPassword, checkPasswordSync } from "../utils/isValid";
import { IPasswordConstraints } from "../interfaces/utils.interface";
import { emailRegEx } from "../consts/regexs";
import {
  Form,
  FormText,
  FormTitle,
  FormTypeIcon,
  PasswordContainer,
} from "../elements/FormUI";
import { Input } from "../elements/Inputs";
import {
  BaseButton,
  RedirectButton,
  ShowPasswordButton,
} from "../elements/Buttons";
import { router } from "next/client";
import { useRouter } from "next/navigation";

interface IProps extends React.PropsWithChildren {
  setForm: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}

export const Registration: React.FC<IProps> = ({ setForm }) => {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Array<1 | 0>>([1, 1, 1]);
  const FormRef = React.useRef<HTMLFormElement | null>(null);
  const user = useSelector((store: RootState) => store.authReducer.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const createProfile = () => {
    if (FormRef.current) {
      const MIN_PASSWORD_LENGTH = 6;
      const validation: Array<1 | 0> = [1, 1, 1];
      let haveZero = false;
      const elements = FormRef.current;
      const full_name: HTMLInputElement = elements["full_name"];
      const email: HTMLInputElement = elements["email"];
      const password: HTMLInputElement = elements["password"];
      const confirm_password: HTMLInputElement = elements["confirm_password"];
      const PASSWORD_CONSTRAINTS: IPasswordConstraints = {
        atLeastOneUpperCaseLetter: false,
        atLeastOneDigit: false,
        atLeastOneSymbol: false,
      };
      if (
        !checkPasswordSync(password.value, confirm_password.value) ||
        !checkPassword(
          password.value,
          MIN_PASSWORD_LENGTH,
          PASSWORD_CONSTRAINTS
        ) ||
        !checkPassword(
          confirm_password.value,
          MIN_PASSWORD_LENGTH,
          PASSWORD_CONSTRAINTS
        )
      ) {
        validation[2] = 0;
        haveZero = true;
      }
      if (full_name.value.trim().length === 0) {
        validation[0] = 0;
        haveZero = true;
      }
      if (!checkEmail(email.value.trim(), emailRegEx)) {
        validation[1] = 0;
        haveZero = true;
      }
      setErrors(() => validation);
      if (!haveZero) {
        dispatch(
          SignupUser({
            email: email.value,
            fullname: full_name.value,
            password: password.value,
          })
        );
      }
    }
  };

  React.useEffect(() => {
    if (user !== null) {
      router.replace("/p/profile");
    }
  }, [user]);

  return (
    <Form
      ref={FormRef}
      initial={{
        x: 300,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -200,
        opacity: 1,
      }}
    >
      <FormType>
        <FormTypeIcon src={LockIcon.src} />
      </FormType>
      <FormTitle>Create an account</FormTitle>

      <FormInput isValid={errors[0]} message={"Please, enter your fullname!"}>
        <Input type="text" placeholder="Full name" name="full_name" />
      </FormInput>
      <FormInput isValid={errors[1]} message={"This email is invalid!"}>
        <Input type="email" placeholder="Email" name="email" />
      </FormInput>
      <FormInput
        isValid={errors[2]}
        message={`Different passwords, length or short password!`}
      >
        <PasswordContainer>
          <Input
            type={isOpened ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <ShowPasswordButton
            type="button"
            onClick={() => setIsOpened((prev) => !prev)}
          >
            {isOpened ? (
              <img src={eyeOpened.src} alt="Opened eye" />
            ) : (
              <img src={eyeClosed.src} alt="Closed eye" />
            )}
          </ShowPasswordButton>
        </PasswordContainer>
        <PasswordContainer>
          <Input
            type={isOpened ? "text" : "password"}
            placeholder="Confirm pasword"
            name="confirm_password"
          />
          <ShowPasswordButton
            type="button"
            onClick={() => setIsOpened((prev) => !prev)}
          >
            {isOpened ? (
              <img src={eyeOpened.src} alt="Opened eye" />
            ) : (
              <img src={eyeClosed.src} alt="Closed eye" />
            )}
          </ShowPasswordButton>
        </PasswordContainer>
      </FormInput>

      <BaseButton
        onClick={(e) => {
          e.preventDefault();
          createProfile();
        }}
      >
        Let&apos;s go!
      </BaseButton>
      <FormText>
        Already have an account?{" "}
        <RedirectButton onClick={() => setForm(() => "signin")} type="button">
          Log in
        </RedirectButton>
      </FormText>
    </Form>
  );
};
