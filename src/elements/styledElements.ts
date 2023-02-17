import styled from "@emotion/styled";
import { motion } from 'framer-motion'

export const AuthForm = styled(motion.form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: stretch;
    gap: 1rem;
    margin: auto;
    text-align: center;
    position: relative;
    margin-bottom: 2.5rem;

    &::before {
        content: '';
        position: absolute;
        bottom: -.5rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(to right, transparent 5%, rgb(61 61 65 / 1), #fff, rgb(61 61 65 / 1), transparent 95%);
        width: 100%;
        display: block;
        height: 1px;
    }

`;

export const AuthInput = styled.input`
    all: unset;
    border-radius: 10px;
    text-align: left;
    background-color: rgb(118 118 128 / .25);
    text-indent: 1rem;
    padding: .5rem 1rem .5rem 0;
    min-width: 360px;
    box-sizing: border-box;
    transition: 300ms ease;
    color: #fff;
    margin-bottom: .4rem;

    &:hover {
        box-shadow: 0 0 0 2px rgb(15 255 19 / .25)
    }

    &:focus {
        box-shadow: 0 0 0 2px rgb(15 255 19 / .5);
    }


    &::placeholder {
        color: rgb(235 235 245 / .6);
    }

`;

export const FormTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 500;
`

export const PasswordContainer = styled.div`
    position: relative;
    &:not(:last-of-type){
        margin-bottom: .8rem;
    }
`;
export const ShowPaswordButton = styled.button`
    all: unset;
    right: 1.5rem;
    top: 50%;
    position: absolute;
    transform: translate(100%, -60%);
    cursor: pointer;
`;


export const FormText = styled.span`
    color: rgb(255 255 255 / 0.5);
    font-size: .75rem;
`;
export const RedirectButton = styled.button`
    all: unset;
    color: rgb(10 255 20 / 1);
    cursor: pointer;
    position: relative;

    &::before {
        content: '';
        width: 0%;
        height: 2px;
        background-color: #0FFF13;
        transition:  300ms ease;
        position: absolute;
        bottom: -2.5px;
        border-radius: 5px;
        left: 100%;
        transform: translateX(-100%);
    }

    &:hover {
        &::before {
            width: 100%;
            transform: translateX(0, 50%);
        }
    }
`;

export const FormButton = styled.button`
    all: unset;
    border-radius: 10px;
    background-color: #0AFF14;
    color: #000;
    cursor: pointer;
    padding: .5rem 3rem;
    font-weight: 600;
    width:fit-content;
    margin: auto;
    margin-top: 1rem;
    transition: 300ms ease;

    &:hover {
        box-shadow: 0 0 10px 2px #0FFF13;
    }

`;