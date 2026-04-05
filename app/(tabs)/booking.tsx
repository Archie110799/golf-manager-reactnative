import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScreenContainer } from '@/components/layout';
import { Button, Card, ThemedText, ThemedView } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { BookingAPI, CoursesAPI } from '@/services/api';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Spacing } from '@/config/theme';
import { formatDate } from '@/utils/format';

function getNextDays(count: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export default function BookingScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getNextDays(1)[0]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const { data: courses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await CoursesAPI.getCourses();
      return res.data;
    },
  });

  const { data: slots = [], isLoading: loadingSlots } = useQuery({
    queryKey: ['slots', selectedCourseId, selectedDate],
    queryFn: async () => {
      if (!selectedCourseId) return [];
      const res = await CoursesAPI.getSlots(selectedCourseId, selectedDate);
      return res.data;
    },
    enabled: !!selectedCourseId,
  });

  const { data: myBookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ['bookings', 'me'],
    queryFn: async () => {
      const res = await BookingAPI.getMyBookings();
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const bookMutation = useMutation({
    mutationFn: (payload: { courseId: string; slotId: string; date: string }) =>
      BookingAPI.bookHole(payload),
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'Đặt sân thành công' });
      setSelectedSlotId(null);
      queryClient.invalidateQueries({ queryKey: ['bookings', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['slots', selectedCourseId, selectedDate] });
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      Toast.show({
        type: 'error',
        text1: 'Đặt sân thất bại',
        text2: err.response?.data?.message ?? 'Vui lòng thử lại',
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (bookingId: string) => BookingAPI.cancel(bookingId),
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'Đã hủy đặt chỗ' });
      queryClient.invalidateQueries({ queryKey: ['bookings', 'me'] });
    },
  });

  const dates = getNextDays(7);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  const handleBook = useCallback(() => {
    if (!selectedCourseId || !selectedSlotId || !selectedDate || !isAuthenticated) return;
    bookMutation.mutate({ courseId: selectedCourseId, slotId: selectedSlotId, date: selectedDate });
  }, [selectedCourseId, selectedSlotId, selectedDate, isAuthenticated, bookMutation]);

  return (
    <ScreenContainer>
      <FlatList
        data={[1]}
        keyExtractor={() => 'main'}
        renderItem={() => null}
        ListHeaderComponent={
          <>
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle">Chọn sân</ThemedText>
              {loadingCourses ? (
                <ActivityIndicator size="small" style={styles.loader} />
              ) : (
                <ThemedView style={styles.chipRow}>
                  {courses.map((c) => (
                    <TouchableOpacity
                      key={c.id}
                      onPress={() => {
                        setSelectedCourseId(c.id);
                        setSelectedSlotId(null);
                      }}
                      style={[
                        styles.chip,
                        selectedCourseId === c.id && styles.chipSelected,
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.chipText,
                          selectedCourseId === c.id && styles.chipTextSelected,
                        ]}
                      >
                        {c.name}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ThemedView>
              )}
            </ThemedView>

            {selectedCourseId && (
              <ThemedView style={styles.section}>
                <ThemedText type="subtitle">Chọn ngày</ThemedText>
                <ThemedView style={styles.chipRow}>
                  {dates.map((d) => (
                    <TouchableOpacity
                      key={d}
                      onPress={() => {
                        setSelectedDate(d);
                        setSelectedSlotId(null);
                      }}
                      style={[
                        styles.chip,
                        selectedDate === d && styles.chipSelected,
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.chipText,
                          selectedDate === d && styles.chipTextSelected,
                        ]}
                      >
                        {formatDate(d)}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ThemedView>
              </ThemedView>
            )}

            {selectedCourseId && (
              <ThemedView style={styles.section}>
                <ThemedText type="subtitle">Chọn giờ (slot)</ThemedText>
                {loadingSlots ? (
                  <ActivityIndicator size="small" style={styles.loader} />
                ) : slots.length === 0 ? (
                  <ThemedText style={styles.muted}>Không có slot trống</ThemedText>
                ) : (
                  <ThemedView style={styles.slotGrid}>
                    {slots.map((slot) => (
                      <TouchableOpacity
                        key={slot.id}
                        onPress={() => setSelectedSlotId(slot.id)}
                        style={[
                          styles.slotChip,
                          selectedSlotId === slot.id && styles.chipSelected,
                        ]}
                      >
                        <ThemedText
                          style={[
                            styles.slotChipText,
                            selectedSlotId === slot.id && styles.chipTextSelected,
                          ]}
                        >
                          {slot.startTime} – {slot.endTime}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </ThemedView>
                )}
              </ThemedView>
            )}

            {selectedCourseId && selectedSlotId && (
              <ThemedView style={styles.section}>
                <Card>
                  <ThemedText>
                    {selectedCourse?.name} • {formatDate(selectedDate)} •{' '}
                    {selectedSlot?.startTime}–{selectedSlot?.endTime}
                  </ThemedText>
                  {isAuthenticated ? (
                    <Button
                      title={bookMutation.isPending ? 'Đang đặt...' : 'Xác nhận đặt sân'}
                      onPress={handleBook}
                      loading={bookMutation.isPending}
                      style={styles.confirmBtn}
                    />
                  ) : (
                    <Button
                      title="Đăng nhập để đặt sân"
                      onPress={() => router.push('/(auth)/login')}
                      variant="outline"
                      style={styles.confirmBtn}
                    />
                  )}
                </Card>
              </ThemedView>
            )}

            {isAuthenticated && (
              <ThemedView style={styles.section}>
                <ThemedText type="subtitle">Đặt chỗ của tôi</ThemedText>
                {loadingBookings ? (
                  <ActivityIndicator size="small" style={styles.loader} />
                ) : Array.isArray(myBookings) && myBookings.length === 0 ? (
                  <ThemedText style={styles.muted}>Chưa có đặt chỗ nào</ThemedText>
                ) : (
                  (myBookings as Array<{
                    id: string;
                    date: string;
                    status: string;
                    course?: { name: string };
                    slot?: { startTime: string; endTime: string };
                  }>)
                    .filter((b) => b.status === 'confirmed')
                    .map((b) => (
                      <Card key={b.id} style={styles.bookingCard}>
                        <ThemedText type="defaultSemiBold">
                          {b.course?.name ?? 'Sân'}
                        </ThemedText>
                        <ThemedText style={styles.muted}>
                          {formatDate(b.date)} • {b.slot?.startTime}–{b.slot?.endTime}
                        </ThemedText>
                        <Button
                          title="Hủy đặt chỗ"
                          variant="ghost"
                          onPress={() => cancelMutation.mutate(b.id)}
                          style={styles.cancelBtn}
                        />
                      </Card>
                    ))
                )}
              </ThemedView>
            )}
          </>
        }
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { padding: Spacing.md, paddingBottom: Spacing.xl },
  section: { marginBottom: Spacing.lg },
  loader: { marginVertical: Spacing.md },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  chipSelected: { backgroundColor: '#166534', borderColor: '#166534' },
  chipText: { fontSize: 14 },
  chipTextSelected: { color: '#fff' },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  slotChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  slotChipText: { fontSize: 14 },
  confirmBtn: { marginTop: 12 },
  muted: { opacity: 0.7, marginTop: 4 },
  bookingCard: { marginTop: 8 },
  cancelBtn: { marginTop: 8 },
});
