import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const InputSxProps: SxProps<Theme> | undefined = {
    borderRadius: '5px',
    outline: 'none',
    backgroundColor: "rgb(118 118 128 / .25)",
    color: "#fff",
    ":hover": {
        boxShadow: '0 0 0 2px rgb(15 255 19 / .25)'
    },
    ":focus": {
        boxShadow: '0 0 0 2px rgb(15 255 19 / .5)'
    },
    "::placeholder": {
        color: 'rgb(235 235 245 / .6)'
    }
}