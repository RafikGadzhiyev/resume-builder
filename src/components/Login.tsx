import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import KeyIcon from './../assets/icons/key_icon.svg'
import eyeClosed from './../assets/icons/eye_closed.svg';
import eyeOpened from './../assets/icons/eye_opened.svg';
import { FormType } from './FormType';
import {
    Form,
    FormTitle,
    Input,
    PasswordContainer,
    ShowPaswordButton,
    FormText,
    RedirectButton,
    FormTypeIcon,
    BaseButton
} from '../elements/styledElements';
import { AuthUser } from '../state/slices/auth.slice';
import { AppDispatch, RootState } from '../state/store';
import { IPasswordConstraints } from '../interfaces/utils.interface';
import { checkEmail, checkPassword } from '../utils/isValid';
import { FormInput } from './FormInput';
import { ErrorSnackBar } from './SnackBars';

interface IProps extends React.PropsWithChildren {
    setForm: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>
}

export const LoginForm: React.FC<IProps> = ({ setForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((store: RootState) => store.authReducer);
    const FormRef = React.useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = React.useState<Array<1 | 0>>([1, 1]);
    const [isOpened, setIsOpened] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const loginHandler = React.useCallback(() => {
        if (FormRef.current) {
            const MIN_PASSWORD_LENGTH = 6;
            const validation: Array<1 | 0> = [1, 1];
            let haveZero = false;
            const elements = FormRef.current;
            const email: HTMLInputElement = elements['email'];
            const password: HTMLInputElement = elements['password'];
            const PASSWORD_CONSTRAINTS: IPasswordConstraints = {
                atLeastOneUpperCaseLetter: false,
                atLeastOneDigit: false,
                atLeastOneSymbol: false
            }
            if (checkEmail(email.value.trim(), /^[^\s@]+@[^\s@]+\.[^\s@]+$/) === false) {
                validation[0] = 0;
                haveZero = true;
            }
            if (checkPassword(password.value, MIN_PASSWORD_LENGTH, PASSWORD_CONSTRAINTS) === false) {
                validation[1] = 0;
                haveZero = true;
            }
            setErrors(() => validation);
            if (haveZero === false) {
                dispatch(AuthUser({
                    email: email.value,
                    password: password.value
                }))
                    .then(response => {
                        if (response.meta.requestStatus === 'fulfilled') {
                            navigate('/verification/' + response.payload.id)
                        }
                        else if (response.meta.requestStatus === 'rejected') {

                        }
                    })
            }
        }
    }, [])

    return <Form
        ref={FormRef}
        initial={{
            x: -200,
            opacity: 0
        }}
        animate={{
            x: 0,
            opacity: 1
        }}
        exit={{
            x: -200,
            opacity: 0
        }}
    >
        {/* {
            auth.error && */}
        <ErrorSnackBar
            message={auth.error || ''}
        />
        {/* } */}
        <FormType>
            <FormTypeIcon
                src={KeyIcon}
            />
        </FormType>
        <FormTitle>Log in</FormTitle>
        <FormInput
            isValid={errors[0]}
            message={'This email is invalid!'}
        >
            <Input
                type='email'
                placeholder='Email'
                name='email'
            />
        </FormInput>
        <FormInput
            isValid={errors[1]}
            message={`Incorrect or invalid password!`}
        >

            <PasswordContainer>
                <Input
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
                            <img
                                src={eyeOpened}
                                alt="Opened eye"
                            /> :
                            <img
                                src={eyeClosed}
                                alt="Closed eye"
                            />
                    }
                </ShowPaswordButton>
            </PasswordContainer>
        </FormInput>
        <BaseButton
            onClick={(e) => {
                e.preventDefault();
                loginHandler();
            }}
        >Sign in</BaseButton>
        <FormText>
            Don't have a account? <RedirectButton
                onClick={() => setForm(() => 'signup')}
            >Create an account</RedirectButton></FormText>
    </Form>
}