/**
 * Login form – RHF + Zod (DESIGN_REACTNATIVE.md §6.1)
 */

import { CardLayout, KeyboardAvoidingWrapper } from '@/components/layout';
import { Button, TextField } from '@/components/ui';
import { Spacing } from '@/config/theme';
import { AuthAPI } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { loginSchema, type LoginInput } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
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
    onError: (err: { response?: { data?: { message?: string } } }) => {
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại',
        text2: err.response?.data?.message ?? 'Vui lòng thử lại',
      });
    },
  });

  const onSubmit = handleSubmit((data) => loginMutation.mutate(data));

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <CardLayout style={styles.card}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
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
              <TextField
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
        </CardLayout>
      </View>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  card: {
    padding: Spacing.lg,
  },
  button: {
    marginTop: Spacing.md,
  },
});
