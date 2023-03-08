import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { RootState } from '../state/store';

interface IState {
    open: boolean
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
}

interface IProps extends React.PropsWithChildren {
    message: string,
}

export const ErrorSnackBar: React.FC<IProps> = ({ message }) => {
    const error = useSelector((store: RootState) => store.authReducer.error)
    const [isOpen, setIsOpen] = React.useState<boolean>(error !== null);

    const clickHandler = (e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        setIsOpen(() => false);
    }

    React.useEffect(() => {
        setIsOpen(() => error !== null)
    }, [error])

    return <Snackbar
        key={message}
        open={isOpen}
        autoHideDuration={2500}
        onClose={clickHandler}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
    >
        <Alert
            onClose={clickHandler}
            severity={'error'}
            sx={{
                width: '100%'
            }}
        >
            {message}
        </Alert>
    </Snackbar>
}