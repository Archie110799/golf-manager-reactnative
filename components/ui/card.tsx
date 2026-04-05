/**
 * Card — container có viền + đổ bóng nhẹ (shadcn Card).
 */

import { BorderRadius, Spacing } from '@/config/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Platform, StyleSheet, View, type ViewProps } from 'react-native';

export type CardProps = ViewProps & {
  padded?: boolean;
};

export function Card({
  style,
  padded = true,
  children,
  ...props
}: CardProps) {
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
