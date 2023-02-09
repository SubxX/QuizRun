import * as RUIAvatar from '@radix-ui/react-avatar';
import { ComponentProps } from '@stitches/react';
import { forwardRef, ReactNode, useMemo } from 'react';
import { pulse } from '../../animations/animations';
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
  color: '$$avatarFontColor',
  borderRadius: '100%',
  variants: {
    size: {
      xs: {
        $$diameter: '30px',
        $$avatarFontsize: '$fontSizes$xs',
      },
      sm: {
        $$diameter: '48px',
        $$avatarFontsize: '$fontSizes$sm',
      },
    },
    color: {
      default: {
        background: 'rgba($white-rgb,0.1)',
        $$avatarFontColor: '$white-muted',
      },
      primary: {
        background: '$primary',
        $$avatarFontColor: '$white',
      },
    },
    loading: {
      true: {
        opacity: 0.5,
        animation: `1020ms linear ${pulse} infinite`,
      },
    },
  },
  defaultVariants: {
    size: 'xs',
    color: 'default',
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
  color: 'inherit',
  fontSize: 'inherit',
  lineHeight: 1,
  fontWeight: 500,
});

type CustomProps = {
  src?: string;
  label?: string;
  children?: ReactNode;
};

type AvatarRootProps = ComponentProps<typeof AvatarRoot>;
type AvatarProps = AvatarRootProps & CustomProps;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, children, label, ...rest }, forwardedRef) => {
    const fallback = useMemo(() => {
      if (typeof children !== 'string') return children;
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
        {Boolean(src) && <AvatarImage src={src} alt={label} />}

        <AvatarFallback>{fallback}</AvatarFallback>
      </AvatarRoot>
    );
  }
);

export default Avatar;
