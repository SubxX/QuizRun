import { cva } from 'cva';

export const inputStyles = cva(
  `block w-full text-sm px-4 py-2 placeholder-white placeholder-opacity-30
  outline-none border border-white border-opacity-30 rounded-md
  focus:ring focus:ring-[#333] focus:border-[#707070] focus:shadow-md bg-[#6060601f]`
);

export const adornmentStyles = cva(
  "absolute top-2/4 transform -translate-y-2/4 flex items-center gap-1",
  {
    variants: {
      intent: {
        start: 'left-2',
        end: 'right-2'
      }
    }
  }
)
