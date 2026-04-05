import { StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components/layout';
import { Card, IconSymbol, ThemedText, ThemedView } from '@/components/ui';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/config/theme';

export default function MapScreen() {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ScreenContainer>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <IconSymbol name="map.fill" size={56} color={iconColor} style={styles.icon} />
          <ThemedText type="title" style={styles.title}>
            Bản đồ sân
          </ThemedText>
        </ThemedView>
        <Card style={styles.card}>
          <ThemedText type="defaultSemiBold">Tính năng sắp có</ThemedText>
          <ThemedText style={styles.muted}>
            Định vị sân, điều hướng hole, tracking khoảng cách (Mapbox) sẽ được tích hợp khi có API/dữ liệu bản đồ.
          </ThemedText>
        </Card>
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  card: {
    padding: Spacing.lg,
  },
  muted: {
    marginTop: 8,
    opacity: 0.8,
  },
});
