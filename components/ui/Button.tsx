/**
 * Button – Green theme (DESIGN_REACTNATIVE.md §4.4)
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

export type ButtonProps = ViewProps & {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  ...props
}: ButtonProps) {
  const primary = useThemeColor({}, 'primary');
  const text = useThemeColor({}, 'text');
  const surface = useThemeColor({}, 'surface');

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary && { backgroundColor: primary },
        isOutline && {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: primary,
        },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? surface : primary} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: isPrimary ? surface : primary },
            variant === 'ghost' && { color: text },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.9,
  },
});
