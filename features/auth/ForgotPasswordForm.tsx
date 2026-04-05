import { Button, Input } from '@/components/ui';
import { AuthAPI } from '@/services/api';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthFormShell } from './AuthFormShell';
import { AuthLinkRow } from './AuthLinkRow';
import { getAuthErrorMessage } from './authError';

export function ForgotPasswordForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordInput) =>
      AuthAPI.forgotPassword({ email: data.email }),
    onSuccess: ({ data }) => {
      Toast.show({
        type: 'success',
        text1: 'Đã gửi yêu cầu khôi phục',
        text2: data.message,
      });
      router.replace('/(auth)/login');
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Không thể xử lý yêu cầu',
        text2: getAuthErrorMessage(error, 'Vui lòng thử lại'),
      });
    },
  });

  const onSubmit = handleSubmit((data) => forgotPasswordMutation.mutate(data));

  return (
    <AuthFormShell
      title="Quên mật khẩu"
      description="Nhập email tài khoản để nhận hướng dẫn đặt lại mật khẩu."
      footer={
        <AuthLinkRow
          label="Nhớ mật khẩu rồi?"
          linkLabel="Quay lại đăng nhập"
          href="/(auth)/login"
        />
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
      <Button
        title="Gửi hướng dẫn"
        onPress={onSubmit}
        loading={forgotPasswordMutation.isPending}
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
