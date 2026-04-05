import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components/layout';
import { IconSymbol, ThemedText, ThemedView } from '@/components/ui';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/config/theme';

export default function FeedScreen() {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ScreenContainer>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.emptyState}>
          <IconSymbol
            name="square.grid.2x2.fill"
            size={64}
            color={iconColor}
            style={styles.icon}
          />
          <ThemedText type="title" style={styles.title}>
            Feed
          </ThemedText>
          <ThemedText style={styles.description}>
            Bài đăng, ảnh, like, comment sẽ hiển thị tại đây khi API Feed được kết nối.
          </ThemedText>
          <ThemedText style={styles.hint}>
            Dùng cursor-based pagination để tải thêm.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    maxWidth: 320,
    alignSelf: 'center',
  },
  icon: {
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  hint: {
    opacity: 0.6,
    fontSize: 14,
    textAlign: 'center',
  },
});
