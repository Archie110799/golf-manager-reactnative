/**
 * Screen + SafeArea — shell layout (không thuộc shadcn primitives).
 */

import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ViewProps } from 'react-native';

export type ScreenContainerProps = ViewProps & {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
};

export function ScreenContainer({
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  ...props
}: ScreenContainerProps) {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor }, style]}
      edges={edges}
      {...props}
    />
  );
}
