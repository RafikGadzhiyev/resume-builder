import React from 'react';
import LockIcon from './../assets/lock.svg'
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

interface IProps extends React.PropsWithChildren {
    setForm: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>
}

export const Registration: React.FC<IProps> = ({ setForm }) => {
    const [isOpened, setIsOpened] = React.useState<boolean>(false);

    return <AuthForm
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

        <AuthInput
            type='text'
            placeholder='Full name'
        />
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
        <PasswordContainer>
            <AuthInput
                type={isOpened ? 'text' : 'password'}
                placeholder='Confirm pasword'
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
        <FormButton>
            Let's go!
        </FormButton>
        <FormText>
            Already have an account? <RedirectButton
                onClick={() => setForm(() => 'signin')}
            >Log in</RedirectButton>
        </FormText>
    </AuthForm>
}