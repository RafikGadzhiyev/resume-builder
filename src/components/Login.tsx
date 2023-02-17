import React from 'react';
import { useDispatch } from 'react-redux';
import KeyIcon from './../assets/icons/key_icon.svg'
import eyeClosed from './../assets/icons/eye_closed.svg';
import eyeOpened from './../assets/icons/eye_opened.svg';
import { FormType } from './FormType';
import {
    AuthForm,
    FormTitle,
    AuthInput,
    PasswordContainer,
    ShowPaswordButton,
    FormButton,
    FormText,
    RedirectButton
} from '../elements/styledElements';
import { AuthUser } from '../state/slices/auth.slice';
import { AppDispatch } from '../state/store';

interface IProps extends React.PropsWithChildren {
    setForm: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>
}

export const LoginForm: React.FC<IProps> = ({ setForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const FormRef = React.useRef<HTMLFormElement | null>(null);
    const [isOpened, setIsOpened] = React.useState<boolean>(false);

    return <AuthForm
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
        <FormType
            keyIcon={KeyIcon}
        />
        <FormTitle>Log in</FormTitle>
        <AuthInput
            type='email'
            placeholder='Email'
        />
        <PasswordContainer>
            <AuthInput
                type={isOpened ? 'text' : 'password'}
                placeholder='Password'
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
        <FormButton
            onClick={(e) => {
                e.preventDefault();
                dispatch(AuthUser({
                    email: '',
                    password: ''
                }))
            }}
        >Sign in</FormButton>
        <FormText>
            Don't have a account? <RedirectButton
                onClick={() => setForm(() => 'signup')}
            >Create an account</RedirectButton></FormText>
    </AuthForm>
}