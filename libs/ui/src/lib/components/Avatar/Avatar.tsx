import * as RUIAvatar from '@radix-ui/react-avatar';
import { ComponentProps } from '@stitches/react';
import { forwardRef, useMemo } from 'react';
import { styled } from '../../theme/stitches.config';

const AvatarRoot = styled(RUIAvatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: `$$diameter`,
  height: `$$diameter`,
  fontSize: '$$avatarFontsize',
  borderRadius: '100%',
  background: '$blackish',
  variants: {
    size: {
      xs: {
        $$diameter: '30px',
        $$avatarFontsize: '$fontSizes$xs',
      },
      sm: {
        $$diameter: '45px',
        $$avatarFontsize: '$fontSizes$sm',
      },
    },
  },
  defaultVariants: {
    size: 'xs',
  },
});

const AvatarImage = styled(RUIAvatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const AvatarFallback = styled(RUIAvatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba($white-rgb,0.1)',
  color: '$white-muted',
  fontSize: 'inherit',
  lineHeight: 1,
  fontWeight: 500,
});

type CustomProps = {
  src?: string;
  label?: string;
  children?: string;
};

type AvatarRootProps = ComponentProps<typeof AvatarRoot>;
type AvatarProps = Omit<AvatarRootProps, 'children'> & CustomProps;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, children, label, ...rest }, forwardedRef) => {
    if (typeof children !== 'string')
      throw new Error('Invalid children type, accepts only string type');

    const fallbackText = useMemo(() => {
      const wordsArray = children?.split(' ');
      if (wordsArray?.length === 1) return wordsArray[0].substring(0, 2);
      return children
        ?.split(' ')
        .slice(0, 3)
        .map((word) => word[0].toUpperCase())
        .join('');
    }, [children]);

    return (
      <AvatarRoot ref={forwardedRef} {...rest}>
        {Boolean(src) && <AvatarImage src={src} alt={label ?? children} />}

        <AvatarFallback>{fallbackText}</AvatarFallback>
      </AvatarRoot>
    );
  }
);

export default Avatar;
