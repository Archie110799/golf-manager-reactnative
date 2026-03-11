import { Link } from 'expo-router';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ScreenContainer } from '@/components/layout';
import { Button } from '@/components/ui';
import { CardLayout } from '@/components/layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/stores/authStore';
import { DashboardAPI } from '@/services/api';
import { Spacing } from '@/config/theme';

function formatMonth(month: string): string {
  const [y, m] = month.split('-');
  const d = new Date(parseInt(y, 10), parseInt(m, 10) - 1);
  return d.toLocaleDateString('vi-VN', { month: 'short', year: '2-digit' });
}

export default function DashboardScreen() {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const res = await DashboardAPI.getStats();
      return res.data;
    },
    enabled: isAuthenticated && isAdmin,
  });

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title">Dashboard</ThemedText>
          <ThemedText style={styles.subtitle}>
            Golf Manager – Quản lý sân & đặt chỗ
          </ThemedText>
        </ThemedView>

        {!isAuthenticated ? (
          <ThemedView style={styles.section}>
            <CardLayout>
              <ThemedText style={styles.muted}>
                Đăng nhập để đặt sân hoặc quản lý (admin).
              </ThemedText>
              <Link href="/(auth)/login" asChild>
                <Button title="Đăng nhập" style={styles.cta} />
              </Link>
            </CardLayout>
          </ThemedView>
        ) : isAdmin ? (
          <>
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Xin chào, {user?.fullName} (Admin)
              </ThemedText>
            </ThemedView>
            {loadingStats ? (
              <ActivityIndicator size="large" style={styles.loader} />
            ) : stats ? (
              <>
                <ThemedView style={styles.statsGrid}>
                  <CardLayout style={styles.statCard}>
                    <ThemedText style={styles.statValue}>{stats.visitors}</ThemedText>
                    <ThemedText style={styles.statLabel}>Lượt truy cập</ThemedText>
                  </CardLayout>
                  <CardLayout style={styles.statCard}>
                    <ThemedText style={styles.statValue}>{stats.coursesCount}</ThemedText>
                    <ThemedText style={styles.statLabel}>Số sân</ThemedText>
                  </CardLayout>
                  <CardLayout style={styles.statCard}>
                    <ThemedText style={styles.statValue}>{stats.bookingsCount}</ThemedText>
                    <ThemedText style={styles.statLabel}>Đặt sân</ThemedText>
                  </CardLayout>
                  <CardLayout style={styles.statCard}>
                    <ThemedText style={styles.statValue}>{stats.videosCount}</ThemedText>
                    <ThemedText style={styles.statLabel}>Video</ThemedText>
                  </CardLayout>
                  <CardLayout style={styles.statCard}>
                    <ThemedText style={styles.statValue}>{stats.postsCount}</ThemedText>
                    <ThemedText style={styles.statLabel}>Bài đăng</ThemedText>
                  </CardLayout>
                </ThemedView>
                <ThemedView style={styles.section}>
                  <ThemedText type="subtitle" style={styles.sectionTitle}>
                    Doanh thu theo tháng
                  </ThemedText>
                  <CardLayout>
                    {stats.revenueByMonth.length === 0 ? (
                      <ThemedText style={styles.muted}>Chưa có dữ liệu</ThemedText>
                    ) : (
                      stats.revenueByMonth.map((r, i) => (
                        <ThemedView
                          key={r.month}
                          style={[
                            styles.revenueRow,
                            i < stats.revenueByMonth.length - 1 && styles.revenueRowBorder,
                          ]}
                        >
                          <ThemedText>{formatMonth(r.month)}</ThemedText>
                          <ThemedText type="defaultSemiBold">
                            {r.revenue.toLocaleString('vi-VN')} ₫
                          </ThemedText>
                        </ThemedView>
                      ))
                    )}
                  </CardLayout>
                </ThemedView>
              </>
            ) : null}
          </>
        ) : (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.welcome}>
              Xin chào, {user?.fullName}
            </ThemedText>
            <CardLayout>
              <ThemedText style={styles.muted}>
                Đặt sân nhanh hoặc xem thông tin cá nhân.
              </ThemedText>
              <Link href="/(tabs)/booking" asChild>
                <Button title="Đặt sân" style={styles.cta} />
              </Link>
              <Link href="/(tabs)/profile" asChild>
                <Button title="Cá nhân" variant="outline" style={styles.ctaOutline} />
              </Link>
            </CardLayout>
          </ThemedView>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xl },
  header: { marginBottom: Spacing.lg },
  subtitle: { marginTop: 4, opacity: 0.8 },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { marginBottom: Spacing.sm },
  welcome: { marginBottom: Spacing.sm },
  muted: { opacity: 0.8, marginBottom: Spacing.sm },
  cta: { marginTop: 8 },
  ctaOutline: { marginTop: 8 },
  loader: { marginVertical: Spacing.xl },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  statCard: {
    minWidth: '47%',
    flexGrow: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    opacity: 0.8,
    marginTop: 4,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  revenueRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
});
