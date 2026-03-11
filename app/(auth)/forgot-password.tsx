import { ScreenContainer } from '@/components/layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ForgotPasswordScreen() {
  return (
    <ScreenContainer>
      <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <ThemedText type="title">Quên mật khẩu</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>
          Nhập email để nhận link đặt lại mật khẩu.
        </ThemedText>
      </ThemedView>
    </ScreenContainer>
  );
}
