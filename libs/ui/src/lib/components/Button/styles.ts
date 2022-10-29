import { cva } from 'cva';

export const buttonStyles = cva(
  `py-2 px-4 rounded-md text-sm text-white truncate transition-colors text-center inline-flex items-center justify-center gap-2`,
  {
    variants: {
      intent: {
        primary: 'bg-primary text-opacity-80',
      },
      disabled: {
        true: 'bg-opacity-50 text-opacity-50 cursor-not-allowed',
        false: 'hover:bg-opacity-90'
      }
    },
    defaultVariants: {
      intent: "primary",
      disabled: false,
    },
  }
);

export const iconButtonStyles = cva(
  "bg-white bg-opacity-10 w-10 h-10 flex-center transition-colors text-white text-opacity-50",
  {
    variants: {
      disabled: {
        true: 'opacity-80 cursor-not-allowed	',
        false: 'hover:bg-opacity-[.15] hover:text-opacity-80'
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-lg'
      }
    },
    defaultVariants: {
      rounded: false,
      disabled: false
    },
  }
)
