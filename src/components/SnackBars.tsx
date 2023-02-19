import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface IState {
    open: boolean
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
}

interface IProps extends React.PropsWithChildren {
    message: string,
    open: boolean
}

export const ErrorSnackBar: React.FC<IProps> = ({ message, open }) => {
    const [snackState, setSnakeState] = React.useState<IState>({
        open,
        vertical: 'top',
        horizontal: 'center'
    });

    const onClose = () => {
        setSnakeState((prevState) => ({ ...prevState, open: false }))
    }
    return <Snackbar
        anchorOrigin={{ vertical: snackState.vertical, horizontal: snackState.horizontal }}
        open={snackState.open}
        autoHideDuration={5000}
        onClose={onClose}
        message={message}
        key={snackState.horizontal + snackState.vertical}
    />

}
export const ErrorAlert: React.FC<IProps> = ({ message, open }) => {
    return <Alert>

    </Alert>
}