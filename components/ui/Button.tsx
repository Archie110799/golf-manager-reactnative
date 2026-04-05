/**
 * Button — API theo shadcn/ui (variant + size), theme xanh lá (DESIGN_REACTNATIVE.md).
 */

import { BorderRadius, Spacing } from '@/config/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type ViewProps,
} from 'react-native';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost';

export type ButtonSize = 'default' | 'sm' | 'lg';

export type ButtonProps = ViewProps & {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
};

const sizeStyles: Record<ButtonSize, { minHeight: number; padV: number; padH: number; font: number }> = {
  sm: { minHeight: 40, padV: Spacing.sm, padH: Spacing.md, font: 14 },
  default: { minHeight: 48, padV: Spacing.md, padH: Spacing.lg, font: 16 },
  lg: { minHeight: 52, padV: Spacing.md, padH: Spacing.xl, font: 16 },
};

export function Button({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
  ...props
}: ButtonProps) {
  const primary = useThemeColor({}, 'primary');
  const text = useThemeColor({}, 'text');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const destructive = useThemeColor({}, 'error');

  const sz = sizeStyles[size];
  const isDefault = variant === 'default';
  const isDestructive = variant === 'destructive';
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const bgColor = isDefault
    ? primary
    : isDestructive
      ? destructive
      : isSecondary
        ? surface
        : 'transparent';

  const textColor = isDefault || isDestructive
    ? surface
    : isOutline
      ? primary
      : isSecondary
        ? primary
        : isGhost
          ? text
          : text;

  const showSpinnerOnPrimary = isDefault || isDestructive;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: sz.minHeight,
          paddingVertical: sz.padV,
          paddingHorizontal: sz.padH,
          borderRadius: BorderRadius.md,
          backgroundColor: bgColor,
        },
        isOutline && {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: primary,
        },
        isSecondary && {
          borderWidth: 1,
          borderColor: border,
        },
        isGhost && { backgroundColor: 'transparent' },
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={showSpinnerOnPrimary ? surface : primary} />
      ) : (
        <Text style={[styles.text, { fontSize: sz.font, color: textColor }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.9,
  },
});
