import { Button, Input } from '@/components/ui';
import { AuthAPI } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { registerSchema, type RegisterInput } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthFormShell } from './AuthFormShell';
import { AuthLinkRow } from './AuthLinkRow';
import { getAuthErrorMessage } from './authError';

export function RegisterForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) =>
      AuthAPI.register({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone?.trim() || undefined,
      }),
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
      Toast.show({ type: 'success', text1: 'Đăng ký thành công' });
      router.replace('/(tabs)');
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Đăng ký thất bại',
        text2: getAuthErrorMessage(error, 'Vui lòng thử lại'),
      });
    },
  });

  const onSubmit = handleSubmit((data) => registerMutation.mutate(data));

  return (
    <AuthFormShell
      title="Đăng ký"
      description="Tạo tài khoản để đặt sân, lưu lịch sử và quản lý thông tin cá nhân."
      footer={
        <AuthLinkRow
          label="Đã có tài khoản?"
          linkLabel="Đăng nhập"
          href="/(auth)/login"
        />
      }
    >
      <Controller
        control={control}
        name="fullName"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Họ và tên"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="words"
            error={errors.fullName?.message}
          />
        )}
      />
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
        name="phone"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Số điện thoại"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            placeholder="Tuỳ chọn"
            error={errors.phone?.message}
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
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label="Xác nhận mật khẩu"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
        )}
      />
      <Button
        title="Đăng ký"
        onPress={onSubmit}
        loading={registerMutation.isPending}
        style={styles.button}
      />
    </AuthFormShell>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 4,
  },
});
