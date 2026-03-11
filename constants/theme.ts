/**
 * Golf Manager – Green theme (DESIGN_REACTNATIVE.md §4.1)
 * Xanh lá chủ đạo, Flat design, rounded corners.
 */

import { Platform } from 'react-native';

const tintColorLight = '#166534';
const tintColorDark = '#86efac';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#52634f',
    background: '#f0fdf4',
    surface: '#ffffff',
    tint: tintColorLight,
    primary: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#bbf7d0',
    success: '#22c55e',
    error: '#dc2626',
    warning: '#eab308',
    info: '#3b82f6',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9ca39e',
    background: '#0f1f14',
    surface: '#1a2e1f',
    tint: tintColorDark,
    primary: '#22c55e',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#166534',
    success: '#22c55e',
    error: '#dc2626',
    warning: '#eab308',
    info: '#3b82f6',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
