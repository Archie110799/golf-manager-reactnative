import { ScreenContainer } from '@/components/layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RegisterScreen() {
  return (
    <ScreenContainer>
      <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <ThemedText type="title">Đăng ký</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>
          Màn hình đăng ký – bổ sung RegisterForm sau.
        </ThemedText>
      </ThemedView>
    </ScreenContainer>
  );
}
