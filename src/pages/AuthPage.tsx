import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import styled from '@emotion/styled'
import { AnimatePresence } from 'framer-motion';
import { GrGooglePlus, GrGithub, GrLinkedinOption } from 'react-icons/gr'
import { LoginForm } from '../components/Login';
import { motion } from 'framer-motion'

const AuthContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const AuthWrapper = styled.div`
    width: 575px;
    border-radius: 10px;
    background-color: #1D2A44;
    overflow: hidden;
`

const Title = styled.h1`
    font-size: 3rem;   
    margin-bottom: 3rem;
`

const FormsContainer = styled.div`
    padding: 0 1rem;
    display: grid;
    grid-template-rows: 0.7fr 1fr;
    height: 500px;
`

const TabsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Tab = styled.div`
    height: 3rem;
    transition: 300ms linear;
    line-height: 3rem;
    text-align: center;
    background-color: #1b2439;
    cursor: pointer;


    &.left {
        border-radius: 10px 0 0 0;
    }

    &.right {
        border-radius: 0 10px 0 0;
    }
    
    &.active {
        background-color: #1D2A44;
        cursor: default;
    }

`

const ExternalAuthsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    height: 100%;
    border-bottom: 1px solid #fff;
    position: relative;

    &::before {
        content: "or";
        position: absolute;
        background-color: #1D2A44;
        padding-inline: .25rem;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 40%);
    }

`;

const ExternalAuthButton = styled.button`
    all: unset;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #181F2D;
    padding: .25rem;
    transition: 300ms ease;

    &:hover {
        background-color: #11161f;
    }

    &:active {
        background-color: #0d1119;
    }

`;

export const Auth = () => {
    const [currentForm, setCurrentForm] = React.useState<'signin' | 'signout'>('signin');
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
    const Login = useGoogleLogin({
        onSuccess: response => {
            checkUserToken(response.access_token);
            console.log(response);
        },
        onError: () => console.log("Error!")
    })

    const checkUserToken = (token: string) => {
        fetch(
            BASE_URL + '/oauth/google',
            {
                method: "POST",
                body: JSON.stringify({
                    token: encodeURIComponent(token)
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    return <AuthContainer>
        <Title>
            Welcome to HiResume!
        </Title>
        <AuthWrapper>
            <TabsContainer>
                <Tab
                    className={'left' + ' ' + (currentForm === 'signin' ? 'active' : '')}
                    onClick={() => setCurrentForm(() => 'signin')}
                >Sign in</Tab>
                <Tab
                    className={'right' + ' ' + (currentForm === 'signout' ? 'active' : '')}
                    onClick={() => setCurrentForm(() => 'signout')}
                >Sign up</Tab>
            </TabsContainer>

            <FormsContainer>
                <ExternalAuthsContainer>
                    <ExternalAuthButton
                        onClick={() => Login()}
                    >
                        <GrGooglePlus />
                    </ExternalAuthButton>
                    <ExternalAuthButton>
                        <GrGithub />
                    </ExternalAuthButton>
                    <ExternalAuthButton>
                        <GrLinkedinOption />
                    </ExternalAuthButton>
                </ExternalAuthsContainer>
                <AnimatePresence>
                    {
                        currentForm === 'signin'
                            ? <LoginForm />
                            : <motion.h1
                                initial={{
                                    x: 200,
                                    opacity: 0
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1
                                }}
                                exit={{
                                    x: 200,
                                    opacity: 0
                                }}
                            ></motion.h1>
                    }
                </AnimatePresence>
            </FormsContainer>
        </AuthWrapper>
    </AuthContainer>
}