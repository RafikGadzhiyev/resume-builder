import {FC, PropsWithChildren, SyntheticEvent, useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { RootState } from "../state/store";

interface IErrorProps extends PropsWithChildren {
  error: null | string;
}

export const ErrorSnackBar: FC<IErrorProps> = ({ error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(error !== null);

  const clickHandler = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setIsOpen(() => false);
  };

  useEffect(() => {
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

interface ISuccessProps extends PropsWithChildren {
  message: string;
}

export const SuccessSnackBar: FC<ISuccessProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const resume = useSelector(
    (store: RootState) => store.resumeReducer.currentResume
  );
  const firstRender = useRef(1);

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setIsOpen(() => false);
  };

  useEffect(() => {
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
