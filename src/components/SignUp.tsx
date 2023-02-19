import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import LockIcon from './../assets/icons/lock.svg'
import eyeClosed from './../assets/icons/eye_closed.svg';
import eyeOpened from './../assets/icons/eye_opened.svg';
import { FormType } from './FormType'
import {
    AuthForm,
    FormTitle,
    AuthInput,
    FormText,
    RedirectButton,
    PasswordContainer,
    ShowPaswordButton,
    FormButton
} from '../elements/styledElements'
import { AppDispatch, RootState } from '../state/store';
import { SignupUser } from '../state/slices/auth.slice';
import { FormInput } from './FormInput';
import { checkEmail, checkPassword, checkPasswordSync } from '../utils/isValid';
import { IPasswordConstraints } from '../interfaces/utils.interface';

interface IProps extends React.PropsWithChildren {
    setForm: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>
}

export const Registration: React.FC<IProps> = ({ setForm }) => {
    const [isOpened, setIsOpened] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<Array<1 | 0>>([1, 1, 1]);
    const FormRef = React.useRef<HTMLFormElement | null>(null);
    const userData = useSelector((store: RootState) => store.authReducer.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const createProfile = () => {
        if (FormRef.current) {
            const MIN_PASSWORD_LENGTH = 6;
            const validation: Array<1 | 0> = [1, 1, 1];
            let haveZero = false;
            const elements = FormRef.current;
            const full_name: HTMLInputElement = elements['full_name'];
            const email: HTMLInputElement = elements['email'];
            const password: HTMLInputElement = elements['password'];
            const confirm_password: HTMLInputElement = elements['confirm_password'];
            const PASSWORD_CONSTRAINTS: IPasswordConstraints = {
                atLeastOneUpperCaseLetter: false,
                atLeastOneDigit: false,
                atLeastOneSymbol: false
            }
            if (
                checkPasswordSync(password.value, confirm_password.value) === false ||
                checkPassword(password.value, MIN_PASSWORD_LENGTH, PASSWORD_CONSTRAINTS) === false ||
                checkPassword(confirm_password.value, MIN_PASSWORD_LENGTH, PASSWORD_CONSTRAINTS) === false
            ) {
                validation[2] = 0;
                haveZero = true;
            }
            if (full_name.value.trim().length === 0) {
                validation[0] = 0;
                haveZero = true;
            }
            if (checkEmail(email.value.trim(), /^[^\s@]+@[^\s@]+\.[^\s@]+$/) === false) {
                validation[1] = 0;
                haveZero = true;
            }
            setErrors(() => validation);
            if (haveZero === false) {
                dispatch(SignupUser({
                    email: email.value,
                    fullname: full_name.value,
                    password: password.value
                }))
            }
        }
    }

    // React.useEffect(() => {
    //     if (userData) {
    //         navigate('/verification/' + userData.id);
    //     }
    // }, [userData])

    return <AuthForm
        ref={FormRef}
        initial={{
            x: 300,
            opacity: 0
        }}
        animate={{
            x: 0,
            opacity: 1
        }}
        exit={{
            x: -200,
            opacity: 1
        }}
    >
        <FormType
            keyIcon={LockIcon}
        />
        <FormTitle>
            Create an account
        </FormTitle>

        <FormInput
            isValid={errors[0]}
            message={'Please, enter your fullname!'}
        >
            <AuthInput
                type='text'
                placeholder='Full name'
                name='full_name'
            />
        </FormInput>
        <FormInput
            isValid={errors[1]}
            message={'This email is invalid!'}
        >
            <AuthInput
                type='email'
                placeholder='Email'
                name='email'
            />
        </FormInput>
        <FormInput
            isValid={errors[2]}
            message={`Different passwords, length or short password!`}
        >

            <PasswordContainer>
                <AuthInput
                    type={isOpened ? 'text' : 'password'}
                    placeholder='Password'
                    name='password'
                />
                <ShowPaswordButton
                    type='button'
                    onClick={() => setIsOpened(prev => !prev)}
                >
                    {
                        isOpened ?
                            <img src={eyeOpened} alt="Opened eye" /> :
                            <img src={eyeClosed} alt="Closed eye" />
                    }
                </ShowPaswordButton>
            </PasswordContainer>
            <PasswordContainer>
                <AuthInput
                    type={isOpened ? 'text' : 'password'}
                    placeholder='Confirm pasword'
                    name='confirm_password'
                />
                <ShowPaswordButton
                    type='button'
                    onClick={() => setIsOpened(prev => !prev)}
                >
                    {
                        isOpened ?
                            <img src={eyeOpened} alt="Opened eye" /> :
                            <img src={eyeClosed} alt="Closed eye" />
                    }
                </ShowPaswordButton>
            </PasswordContainer>
        </FormInput>


        <FormButton
            onClick={(e) => {
                e.preventDefault();
                createProfile()
            }}
        >
            Let's go!
        </FormButton>
        <FormText>
            Already have an account? <RedirectButton
                onClick={() => setForm(() => 'signin')}
            >Log in</RedirectButton>
        </FormText>
    </AuthForm>
}