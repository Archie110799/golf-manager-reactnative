/**
 * Input — tương đương shadcn Input (+ Label / thông báo lỗi).
 */

import { BorderRadius, Spacing } from '@/config/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { Label } from './label';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...props }: InputProps) {
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

/** @deprecated Dùng `Input` — giữ tạm để migrate import cũ. */
export const TextField = Input;
export type TextFieldProps = InputProps;

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
