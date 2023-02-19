import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../state/store';
import EnvelopIcon from './../assets/icons/envelop.svg';
import RepeatIcon from './../assets/icons/repeat.svg'
import styled from '@emotion/styled'
import { BaseButton, FormTypeIconContainer } from '../elements/styledElements';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const EmailText = styled.span`
    color: #0AFF14;
`;

const EmailIcon = styled.img`
    width: 2rem;
    aspect-ratio: 1/1;
`

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

const VerificationFieldsContainer = styled.div`
    display: flex;
    gap: 1rem
`

const VerificationField = styled.input`
    all: unset;
    cursor: text;
    color: #f1f1f1;
    border-radius: 5px;
    background-color: rgb(43 43 47 / 0.5);
    padding: 1.75rem 0.75rem;
    font-size:5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    text-align: center;
    border: 2.5px solid rgb(241 241 241 / 0.1);
    transition: 300ms ease;

    &:hover {
        border-color: rgb(241 241 241 / 0.5);
    }
    
    &:focus {
        border-color: rgb(241 241 241 / 0.75);
    }

`;

const ResendContainer = styled.div`
    display: flex;
    gap: 1rem;
`

const ResendTimerContainer = styled.div`
    border: 2.5px solid rgb(241 241 241 / 0.1);
    background-color: rgb(43 43 47 / 0.5);
    border-radius: 5px;
    display: flex;
    width: fit-content;
    padding: .1rem .25rem;
    font-size: .7rem;
`

const ResendButton = styled.button`
    all: unset;
    cursor: pointer;
    color: #0AFF14;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
    transition: 300ms ease;

    &:hover {
        // box-shadow: 0 0 10px #0FFF13;
        filter:drop-shadow(0 0 4px #0fff13)
    }

`;

const BackToLogin = styled.a`
    all: unset;
    cursor: pointer;
    color: #0BDA13;
    font-size: 1rem;
    position: relative;
    transition: 300ms ease;

    &::before {
        content: "";
        position: absolute;
        bottom: -.25rem;
        left: 50%;
        transform: translate(-50%);
        width: 70%;
        height: 2px;
        background-color: #0BDA13;
        transition: 300ms ease;
    }

    &:hover {
        text-shadow: 0 0 10px #0FFF13;
        &::before{
            width: 100%;
            box-shadow: 0 0 10px #0FFF13;
        }
    }


`

export const VerificationCode = () => {
    const { user_id } = useParams();
    const userData = useSelector((store: RootState) => store.authReducer.user);
    const oneTime = React.useRef(1);

    React.useEffect(() => {
        if (user_id && oneTime.current) {
            fetch(
                `${SERVER_BASE_URL}/verification/send_code/${user_id}`
            )
            oneTime.current--;
        }
    }, [user_id])

    return <VerificationContainer>
        {/* Your id {user_id} */}
        <VerificationNotification>
            <EmailIcon src={EnvelopIcon} alt="Envelop icon" />
            <span>We have sent to your email <EmailText>{userData?.email}</EmailText> a verification code</span>
        </VerificationNotification>
        <VerificationForm>
            <VerificationFieldsContainer>
                <VerificationField
                    tabIndex={0}
                    type="text"
                    aria-autocomplete='none'
                    aria-spellCheck={false}
                    maxLength={1}
                />
                <VerificationField
                    type="text"
                    aria-autocomplete='none'
                    aria-spellCheck={false}
                    maxLength={1}
                />
                <VerificationField
                    type="text"
                    aria-autocomplete='none'
                    aria-spellCheck={false}
                    maxLength={1}
                />
                <VerificationField
                    type="text"
                    aria-autocomplete='none'
                    aria-spellCheck={false}
                    maxLength={1}
                />
                <VerificationField
                    type="text"
                    aria-autocomplete='none'
                    aria-spellCheck={false}
                    maxLength={1}
                />
                <VerificationField
                    type="text"
                    aria-autocomplete='none'
                    aria-spellCheck={false}
                    maxLength={1}
                />
            </VerificationFieldsContainer>
            <ResendContainer>
                <ResendTimerContainer>
                    <span>00</span>:
                    <span>59</span>
                </ResendTimerContainer>
                <ResendButton
                    type='button'
                >
                    Resend code <img src={RepeatIcon} alt='Repeat icon' />
                </ResendButton>
            </ResendContainer>
            <BaseButton
                type='button'

            >
                Check code
            </BaseButton>
            <BackToLogin href='#'>Login via another email</BackToLogin>
        </VerificationForm>
    </VerificationContainer>
}