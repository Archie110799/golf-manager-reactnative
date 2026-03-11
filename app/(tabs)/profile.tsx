import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components/layout';
import { Button } from '@/components/ui';
import { CardLayout } from '@/components/layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuthStore } from '@/stores/authStore';
import { BookingAPI } from '@/services/api';
import { useRouter } from 'expo-router';
import { Spacing } from '@/config/theme';
import { formatDate } from '@/utils/format';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const { data: myBookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ['bookings', 'me'],
    queryFn: async () => {
      const res = await BookingAPI.getMyBookings();
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const confirmedBookings = Array.isArray(myBookings)
    ? (myBookings as Array<{
        id: string;
        date: string;
        status: string;
        course?: { name: string };
        slot?: { startTime: string; endTime: string };
      }>).filter((b) => b.status === 'confirmed')
    : [];

  return (
    <ScreenContainer>
      <FlatList
        data={[1]}
        keyExtractor={() => 'profile'}
        ListHeaderComponent={
          <>
            <ThemedView style={styles.header}>
              <ThemedText type="title">Cá nhân</ThemedText>
              {isAuthenticated && user ? (
                <CardLayout style={styles.userCard}>
                  <ThemedText type="subtitle">{user.fullName}</ThemedText>
                  <ThemedText style={styles.email}>{user.email}</ThemedText>
                  <Button
                    title="Đăng xuất"
                    variant="outline"
                    onPress={() => {
                      logout();
                      router.replace('/(auth)/login');
                    }}
                    style={styles.logoutBtn}
                  />
                </CardLayout>
              ) : (
                <CardLayout style={styles.userCard}>
                  <ThemedText style={styles.muted}>
                    Đăng nhập để xem thông tin và đặt sân.
                  </ThemedText>
                  <Button
                    title="Đăng nhập"
                    onPress={() => router.push('/(auth)/login')}
                    style={styles.loginBtn}
                  />
                </CardLayout>
              )}
            </ThemedView>

            {isAuthenticated && (
              <ThemedView style={styles.section}>
                <ThemedText type="subtitle">Đặt chỗ của tôi</ThemedText>
                {loadingBookings ? (
                  <ThemedText style={styles.muted}>Đang tải...</ThemedText>
                ) : confirmedBookings.length === 0 ? (
                  <CardLayout>
                    <ThemedText style={styles.muted}>Chưa có đặt chỗ nào</ThemedText>
                    <Button
                      title="Đặt sân"
                      variant="outline"
                      onPress={() => router.push('/(tabs)/booking')}
                      style={styles.bookingCta}
                    />
                  </CardLayout>
                ) : (
                  confirmedBookings.map((b) => (
                    <CardLayout key={b.id} style={styles.bookingCard}>
                      <ThemedText type="defaultSemiBold">
                        {b.course?.name ?? 'Sân'}
                      </ThemedText>
                      <ThemedText style={styles.muted}>
                        {formatDate(b.date)} • {b.slot?.startTime}–{b.slot?.endTime}
                      </ThemedText>
                    </CardLayout>
                  ))
                )}
              </ThemedView>
            )}
          </>
        }
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { padding: Spacing.md },
  userCard: { marginTop: Spacing.md },
  email: { marginTop: 4, opacity: 0.8 },
  logoutBtn: { marginTop: Spacing.lg },
  loginBtn: { marginTop: Spacing.md },
  muted: { opacity: 0.7 },
  section: { padding: Spacing.md, paddingTop: 0 },
  bookingCard: { marginTop: 8 },
  bookingCta: { marginTop: 12 },
  listContent: { paddingBottom: Spacing.xl },
});
