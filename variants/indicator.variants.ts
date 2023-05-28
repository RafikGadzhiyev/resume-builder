import { Variants } from "framer-motion";

export const IndicatorStyles: Variants = {
    initial: {
        backgroundColor: "#0fff13",
        width: "12px",
        height: '12px',
        borderRadius: '50%',
        border: "1px solid rgb(10 255 20 / 0)",
        cursor: 'pointer',
        transition: {
            duration: 300,
            ease: 'linear'
        },
    },
    active: {
        scale: 1.1,
        cursor: 'initial',
        boxShadow: '0 0 0 0 rgb(0 0 0 / 0)',
    },
    // next: {
    //     backgroundColor: "rgb(10 255 20 / .5)",
    // },
    // previous: {
    //     backgroundColor: "rgb(10 255 20 / .5)",
    // },
    inactive: {
        backgroundColor: 'rgb(10 255 20 / 0)',
        borderColor: "rgb(10 255 20 / .5)",
    },
    hover: {
        boxShadow: '0 0 10px 0 rgb(10 255 20 / 1)',
        backgroundColor: 'rgb(10 255 20 / .5)'
    },
    activeHover: {
        boxShadow: '0 0 0 0 rgb(0 0 0 / 0)'
    }
}