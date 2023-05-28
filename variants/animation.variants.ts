import { Variants } from "framer-motion";

export const Scale: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  active: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

export const FadeInOut: Variants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const FadeInOutTop: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  active: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};
