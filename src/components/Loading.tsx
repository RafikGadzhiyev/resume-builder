import { motion } from 'framer-motion'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type { Forms } from '../types';

const LoadingContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2.5px)",
    zIndex: 100,
    flexDirection: "column",
    gap: '1rem'
};

interface IProps extends React.PropsWithChildren {
    currentForm: Forms
}

export const Loading: React.FC<IProps> = ({ currentForm }) => {
    return <Box
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        component={motion.div}
        sx={LoadingContainerStyles}
    >
        <CircularProgress
            sx={{
                color: "#fff"
            }}
        />
        <b>
            {
                currentForm === 'signin' ?
                    'Signing in' :
                    'Signing up'
            }
        </b>
    </Box>
}