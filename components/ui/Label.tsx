/**
 * Label (DESIGN_REACTNATIVE.md §4.4 – Atomic)
 */

import { Spacing } from '@/config/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type LabelProps = TextProps & {
  text: string;
  variant?: 'default' | 'error' | 'secondary';
};

export function Label({
  text,
  variant = 'default',
  style,
  ...props
}: LabelProps) {
  const color = useThemeColor(
    {},
    variant === 'error'
      ? 'error'
      : variant === 'secondary'
        ? 'textSecondary'
        : 'text'
  );

  return (
    <Text style={[styles.label, { color }, style]} {...props}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
});
