/**
 * KeyboardAvoidingView wrapper — shell layout.
 */

import {
  KeyboardAvoidingView,
  Platform,
  type ViewProps,
} from 'react-native';

export type KeyboardAvoidingWrapperProps = ViewProps & {
  behavior?: 'height' | 'position' | 'padding';
};

export function KeyboardAvoidingWrapper({
  style,
  behavior = Platform.OS === 'ios' ? 'padding' : 'height',
  ...props
}: KeyboardAvoidingWrapperProps) {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={behavior}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      {...props}
    />
  );
}
