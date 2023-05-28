import React from "react";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { RootState } from "../state/store";

interface IErrorProps extends React.PropsWithChildren {
  error: null | string;
}

export const ErrorSnackBar: React.FC<IErrorProps> = ({ error }) => {
  // const error = useSelector((store: RootState) => store.authReducer.error)
  const [isOpen, setIsOpen] = React.useState<boolean>(error !== null);

  const clickHandler = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setIsOpen(() => false);
  };

  React.useEffect(() => {
    setIsOpen(() => error !== null);
  }, [error]);

  return (
    <Snackbar
      key={error ? error : "Stateless snackbar"}
      open={isOpen}
      autoHideDuration={2500}
      onClose={clickHandler}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={clickHandler}
        severity={"error"}
        sx={{
          width: "100%",
        }}
      >
        {error ? error : ""}
      </Alert>
    </Snackbar>
  );
};

interface ISuccessProps extends React.PropsWithChildren {
  message: string;
}

export const SuccessSnackBar: React.FC<ISuccessProps> = ({ message }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const firstRender = React.useRef(1);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsOpen(() => false);
  };

  React.useEffect(() => {
    if (firstRender.current > 0) {
      firstRender.current--;
    } else {
      setIsOpen(() => true);
    }
  }, [resume]);

  return (
    <Snackbar
      autoHideDuration={2500}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
    >
      <Alert
        severity="success"
        onClose={handleClose}
        sx={{
          width: "100%",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
