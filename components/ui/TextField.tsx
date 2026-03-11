/**
 * TextField (DESIGN_REACTNATIVE.md §4.4 – Atomic)
 */

import { BorderRadius, Spacing } from '@/config/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { Label } from './Label';

export type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function TextField({ label, error, style, ...props }: TextFieldProps) {
  const borderColor = useThemeColor({}, error ? 'error' : 'border');
  const textColor = useThemeColor({}, 'text');
  const surface = useThemeColor({}, 'surface');
  const placeholderColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.wrapper}>
      {label ? <Label text={label} /> : null}
      <TextInput
        placeholderTextColor={placeholderColor}
        style={[
          styles.input,
          {
            borderColor,
            color: textColor,
            backgroundColor: surface,
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <View style={styles.errorRow}>
          <Label text={error} variant="error" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
  },
  errorRow: {
    marginTop: Spacing.xs,
  },
});
