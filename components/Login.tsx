import {Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import KeyIcon from "./../assets/icons/key_icon.svg";
import eyeClosed from "./../assets/icons/eye_closed.svg";
import eyeOpened from "./../assets/icons/eye_opened.svg";
import {FormType} from "./FormType";
import {AuthUser} from "../state/reducers/auth.reducer";
import {AppDispatch, RootState} from "../state/store";
import {IPasswordConstraints} from "../interfaces/utils.interface";
import {checkEmail, checkPassword} from "../utils/isValid";
import {FormInput} from "./FormInput";
import {ErrorSnackBar} from "./SnackBars";
import {emailRegEx} from "../consts/regexs";
import {Form, FormText, FormTitle, FormTypeIcon, PasswordContainer,} from "../elements/FormUI";
import {Input} from "../elements/Inputs";
import {BaseButton, RedirectButton, ShowPasswordButton,} from "../elements/Buttons";
import {FadeInOut} from "../variants/animation.variants";

interface IProps extends PropsWithChildren {
	setForm: Dispatch<SetStateAction<"signin" | "signup">>;
}

export const LoginForm: FC<IProps> = ({setForm}) => {
	const dispatch = useDispatch<AppDispatch>();
	const auth = useSelector((store: RootState) => store.authReducer);
	const FormRef = useRef<HTMLFormElement | null>(null);
	const [errors, setErrors] = useState<Array<1 | 0>>([1, 1]);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	const loginHandler = useCallback(() => {
		if (FormRef.current) {
			const MIN_PASSWORD_LENGTH = 6;
			const validation: Array<1 | 0> = [1, 1];
			let haveZero = false;
			const elements = FormRef.current;
			const email: HTMLInputElement = elements["email"];
			const password: HTMLInputElement = elements["password"];
			const PASSWORD_CONSTRAINTS: IPasswordConstraints = {
				atLeastOneUpperCaseLetter: false,
				atLeastOneDigit: false,
				atLeastOneSymbol: false,
			};
			if (!checkEmail(email.value.trim(), emailRegEx)) {
				validation[0] = 0;
				haveZero = true;
			}
			if (
				!checkPassword(
					password.value,
					MIN_PASSWORD_LENGTH,
					PASSWORD_CONSTRAINTS
				)
			) {
				validation[1] = 0;
				haveZero = true;
			}
			setErrors(() => validation);
			if (!haveZero) {
				dispatch(
					AuthUser({
						email: email.value,
						password: password.value,
					})
				).then((response) => {
					if (response.meta.requestStatus === "fulfilled") {
						router.push("/p/verification?user_id=" + response.payload.id);
					} else if (response.meta.requestStatus === "rejected") {
					}
				});
			}
		}
	}, [dispatch, router]);

	return (
		<Form
			ref={FormRef}
			variants={FadeInOut}
			initial='initial'
			animate='active'
			exit='exit'
		>
			<ErrorSnackBar error={auth.error}/>
			<FormType>
				<FormTypeIcon src={KeyIcon.src}/>
			</FormType>
			<FormTitle>Log in</FormTitle>
			<FormInput isValid={errors[0]} message={"This email is invalid!"}>
				<Input type="email" placeholder="Email" name="email"/>
			</FormInput>
			<FormInput isValid={errors[1]} message={`Incorrect or invalid password!`}>
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
							<img src={eyeOpened.src} alt="Opened eye"/>
						) : (
							<img src={eyeClosed.src} alt="Closed eye"/>
						)}
					</ShowPasswordButton>
				</PasswordContainer>
			</FormInput>
			<BaseButton
				onClick={(e) => {
					e.preventDefault();
					loginHandler();
				}}
			>
				Sign in
			</BaseButton>
			<FormText>
				Don&apos;t have a account?{" "}
				<RedirectButton onClick={() => setForm(() => "signup")} type="button">
					Create an account
				</RedirectButton>
			</FormText>
		</Form>
	);
};
