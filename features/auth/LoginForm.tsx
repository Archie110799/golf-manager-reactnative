import { Button, Input } from '@/components/ui';
import { Spacing } from '@/config/theme';
import { AuthAPI } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { loginSchema, type LoginInput } from '@/validations/auth';
import { AuthFormShell } from './AuthFormShell';
import { AuthLinkRow } from './AuthLinkRow';
import { getAuthErrorMessage } from './authError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => AuthAPI.login(data),
    onSuccess: ({ data }) => {
      setAuth(
        {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          role: data.user.role ?? 'user',
        },
        data.accessToken,
        data.refreshToken
      );
      Toast.show({ type: 'success', text1: 'Đăng nhập thành công' });
      router.replace('/(tabs)');
    },
    onError: (err) => {
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại',
        text2: getAuthErrorMessage(err, 'Vui lòng thử lại'),
      });
    },
  });

  const onSubmit = handleSubmit((data) => loginMutation.mutate(data));

  return (
    <AuthFormShell
      title="Đăng nhập"
      description="Truy cập tài khoản để đặt sân và theo dõi lịch sử chơi golf."
      footer={
        <>
          <AuthLinkRow
            label="Chưa có tài khoản?"
            linkLabel="Đăng ký"
            href="/(auth)/register"
          />
          <AuthLinkRow
            label="Quên mật khẩu?"
            linkLabel="Khôi phục ngay"
            href="/(auth)/forgot-password"
          />
        </>
      }
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Mật khẩu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />
      <Button
        title="Đăng nhập"
        onPress={onSubmit}
        loading={loginMutation.isPending}
        style={styles.button}
      />
    </AuthFormShell>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: Spacing.md,
  },
});
