import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../state/store';
import EnvelopIcon from './../assets/icons/envelop.svg';
import RepeatIcon from './../assets/icons/repeat.svg'
import styled from '@emotion/styled'
import { BaseButton, FormTypeIconContainer } from '../elements/styledElements';
import { Timer } from './Timer';
import { VerificationCodeBlock } from './VerificationCodeBlock';
import { ResetUser } from '../state/slices/auth.slice';

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


const ResendContainer = styled.div`
    display: flex;
    gap: 1rem;
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

    &:not(:disabled):hover {
        // box-shadow: 0 0 10px #0FFF13;
        filter:drop-shadow(0 0 4px #0fff13)
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .5;
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
    const [isResendAvailable, setIsResendAvailable] = React.useState<boolean>(false);
    const [isFull, setIsFull] = React.useState<boolean>(false)
    const [timer, setTimer] = React.useState<number>(60);
    const { user_id } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((store: RootState) => store.authReducer.user);
    const oneTime = React.useRef(1);
    const cellsForm = React.useRef<HTMLFormElement>(null);
    const totalInputs = React.useRef<number>(-1);
    const code = React.useRef<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        code.current = '';
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
    }

    React.useEffect(() => {
        if (cellsForm.current && totalInputs.current === -1) {
            totalInputs.current = 0;
            for (let element of cellsForm.current.elements) {
                if (element.tagName === 'INPUT') totalInputs.current++;
            }
        }
    }, [])

    React.useEffect(() => {
        if (user_id && oneTime.current) {
            fetch(
                `${SERVER_BASE_URL}/verification/send_code/${user_id}`
            )
            oneTime.current--;
        }
    }, [user_id])

    return <VerificationContainer>
        <VerificationNotification>
            <EmailIcon src={EnvelopIcon} alt="Envelop icon" />
            <span>We have sent to your email <EmailText>{userData?.email}</EmailText> a verification code</span>
        </VerificationNotification>
        <VerificationForm
            ref={cellsForm}
        >
            <VerificationCodeBlock
                changeHandler={changeHandler}
            />
            <ResendContainer>
                <Timer
                    AvailableResend={setIsResendAvailable}
                    value={timer}
                />
                <ResendButton
                    disabled={!isResendAvailable}
                    type='button'
                    onClick={() => {
                        setTimer(prev => prev * 2);
                        fetch(
                            `${SERVER_BASE_URL}/verification/send_code/${user_id}`
                        )
                    }}
                >
                    Resend code <img src={RepeatIcon} alt='Repeat icon' />
                </ResendButton>
            </ResendContainer>
            <BaseButton
                type='button'
                disabled={!isFull}
                onClick={() => {
                    fetch(`${SERVER_BASE_URL}/verification/check_code/${code.current}`)
                        .then(response => {
                            response.json()
                                .then(result => navigate('/main/profile'))
                        })
                }}
            >
                Check code
            </BaseButton>
            <Link
                to='/auth'
                onClick={() => dispatch(ResetUser())}
            >
                Login via another email
            </Link>
            {/* <BackToLogin href='#' onClick={() => ResetUser()}>Login via another email</BackToLogin> */}
        </VerificationForm>
    </VerificationContainer>
}