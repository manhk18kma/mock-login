'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { User } from 'lucide-react';

/**
 * Unified Avatar Component
 *
 * Synchronizes style according to design system, replaces all hardcoded avatar styles.
 *
 * Common patterns in codebase:
 * - `w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200` - Standard avatar
 * - `w-16 h-16 rounded-full bg-red-50 flex items-center justify-center` - Fallback with icon
 * - ImageWithFallback component for image loading
 *
 * Design System:
 * - Border radius: rounded-full (circle)
 * - Sizes: sm (32px), md (40px), lg (48px), xl (64px)
 * - Ring: ring-2 ring-gray-200 (default) or ring-white
 * - Fallback: bg-gray-100 with initials or User icon
 */

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'size-8', // 32px
        md: 'size-10', // 40px - Default
        lg: 'size-12', // 48px
        xl: 'size-16', // 64px - common in codebase
      },
      ring: {
        none: '',
        default: 'ring-2 ring-gray-200',
        white: 'ring-2 ring-white',
      },
    },
    defaultVariants: {
      size: 'md',
      ring: 'default',
    },
  }
);

const avatarImageVariants = cva('aspect-square size-full object-cover');

const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center rounded-full bg-gray-100 text-gray-600',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string; // For creating initials fallback
  fallback?: React.ReactNode; // Custom fallback content
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, fallback, size, ring, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(src);

    React.useEffect(() => {
      setImgSrc(src);
      setImgError(false);
    }, [src]);

    const handleImageError = () => {
      setImgError(true);
    };

    // Generate initials from name
    const getInitials = (nameStr?: string): string => {
      if (!nameStr) return '';
      const parts = nameStr.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return nameStr.substring(0, 2).toUpperCase();
    };

    const initials = getInitials(name);
    const showImage = src && !imgError && imgSrc;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, ring }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={imgSrc}
            alt={alt || name || 'Avatar'}
            className={avatarImageVariants()}
            onError={handleImageError}
          />
        ) : (
          <div className={cn(avatarFallbackVariants({ size }))}>
            {fallback ? (
              fallback
            ) : initials ? (
              <span className='font-medium'>{initials}</span>
            ) : (
              <User
                className={cn(
                  size === 'sm' && 'size-4',
                  size === 'md' && 'size-5',
                  size === 'lg' && 'size-6',
                  size === 'xl' && 'size-8'
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants, avatarImageVariants, avatarFallbackVariants };

