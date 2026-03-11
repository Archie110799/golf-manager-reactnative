/**
 * Card layout – Flat, rounded, shadow (DESIGN_REACTNATIVE.md §4.2)
 */

import { BorderRadius, Spacing } from '@/config/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Platform, StyleSheet, View, type ViewProps } from 'react-native';

export type CardLayoutProps = ViewProps & {
  padded?: boolean;
};

export function CardLayout({
  style,
  padded = true,
  children,
  ...props
}: CardLayoutProps) {
  const backgroundColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');

  return (
    <View
      style={[
        styles.card,
        { backgroundColor, borderColor },
        padded && styles.padded,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        }),
  },
  padded: {
    padding: Spacing.md,
  },
});
