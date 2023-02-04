import { keyframes } from "../theme/stitches.config";

export const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});


export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  '100%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
});

export const rotate = keyframes({
  '0%': { transform: 'rotate(0)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const slideInFromLeft = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

export const slideOutToLeft = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(100%)' },
});

export const loaderSpin = keyframes({
  '0%, 100%': {
    boxShadow: '0.2em 0px 0 0px currentcolor'
  },
  '12%:': {
    boxShadow: '0.2em 0.2em 0 0 currentcolor'
  },
  '25%': {
    boxShadow: '0 0.2em 0 0px currentcolor'
  },
  '37%': {
    boxShadow: '-0.2em 0.2em 0 0 currentcolor'
  },
  '50%': {
    boxShadow: '-0.2em 0 0 0 currentcolor'
  },
  '62%': {
    boxShadow: '-0.2em -0.2em 0 0 currentcolor'
  },
  '75%': {
    boxShadow: '0px -0.2em 0 0 currentcolor'
  },
  '87%': {
    boxShadow: '0.2em -0.2em 0 0 currentcolor'
  }
})
