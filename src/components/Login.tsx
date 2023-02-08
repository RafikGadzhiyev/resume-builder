import styled from '@emotion/styled'
import { motion } from 'framer-motion';

const Form = styled(motion.form)`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: stretch;
    width: 70%;
    margin: auto;
`;
const Input = styled.input`
    all: unset;
    border-radius: 10px;
    border: 1px solid #fff;
    padding: .25rem .5rem;
`;
const Button = styled.button`
    all: unset;
    border-radius: 10px;
    cursor: pointer;
    padding: .25rem .5rem;
    box-sizing: border-box;
    margin-top: 1rem;
    border: 1px solid #fff;
    text-align: center;
`;

export const LoginForm = () => {
    return <Form
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
        <Input
            type='email'
            placeholder='Email'
        />
        <Input
            type='Password'
            placeholder='Password'
        />
        <Button>Sign in</Button>
    </Form>
}