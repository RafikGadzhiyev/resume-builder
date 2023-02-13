import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styled from '@emotion/styled'
import { AnimatePresence } from 'framer-motion';
import { LoginForm } from '../components/Login';
import { Registration } from '../components/SignUp';

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
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-radius: 2rem;
    background-color: #262626;
    overflow: hidden;
    `

const FormsContainer = styled.div`
    padding-bottom: 3rem;
`

const ExternalAuthsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    height: 100%;
    position: relative;
`;

export const Auth = () => {
    const [currentForm, setCurrentForm] = React.useState<'signin' | 'signup'>('signin');
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
    const br = React.useRef<boolean>(true);

    const checkUserToken = React.useCallback((token: string) => {
        fetch(
            BASE_URL + '/auth/google',
            {
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
    }, [])

    // React.useEffect(() => {
    //     if (br.current) {
    //         br.current = false;
    //         fetch(BASE_URL + '/token/refresh', {
    //             credentials: 'include'
    //         })
    //     }
    // }, [])

    return <AuthContainer>
        <AuthWrapper>
            <FormsContainer>
                <AnimatePresence>
                    {
                        currentForm === 'signin'
                            ? <LoginForm
                                setForm={setCurrentForm}
                            />
                            : <Registration
                                setForm={setCurrentForm}
                            />
                    }
                </AnimatePresence>
                <ExternalAuthsContainer>
                    <GoogleLogin
                        theme='filled_blue'
                        onSuccess={response => {
                            checkUserToken(response.credential + '');
                            console.log(response);
                        }}
                        onError={() => console.log("Authentification error! Try later!")}
                    />

                </ExternalAuthsContainer>
            </FormsContainer>
        </AuthWrapper>
    </AuthContainer>
}