import styled from '@emotion/styled'
import { motion } from 'framer-motion';

const Container = styled.div`
    position: relative;
`;

const ErrorText = styled(motion.span)`
    color: red;
    text-align: left;
    position: absolute;
    left: 1rem;
    top: 100%;
    font-size: .75rem;
    transform: translate(0, -25%)
`;

interface IProps extends React.PropsWithChildren {
    isValid: 1 | 0,
    message: string
}


export const FormInput: React.FC<IProps> = ({ children, isValid, message }) => {
    return <Container>
        {children}
        {
            !isValid ?
                <ErrorText
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                >{message}</ErrorText> :
                ''
        }
    </Container>
}