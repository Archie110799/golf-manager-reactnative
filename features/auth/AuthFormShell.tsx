import { Card, ThemedText } from '@/components/ui';
import { KeyboardAvoidingWrapper } from '@/components/layout';
import { BorderRadius, Spacing } from '@/config/theme';
import { StyleSheet, ScrollView, View, type ViewProps } from 'react-native';
import type { PropsWithChildren, ReactNode } from 'react';

type AuthFormShellProps = PropsWithChildren<ViewProps> & {
  title: string;
  description: string;
  footer?: ReactNode;
};

export function AuthFormShell({
  title,
  description,
  footer,
  children,
  style,
  ...props
}: AuthFormShellProps) {
  return (
    <KeyboardAvoidingWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, style]} {...props}>
          <Card style={styles.card}>
            <ThemedText type="title" style={styles.title}>
              {title}
            </ThemedText>
            <ThemedText style={styles.description}>{description}</ThemedText>
            <View style={styles.content}>{children}</View>
            {footer ? <View style={styles.footer}>{footer}</View> : null}
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  container: {
    flex: 1,
  },
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  description: {
    opacity: 0.8,
    marginBottom: Spacing.lg,
  },
  content: {
    gap: Spacing.sm,
  },
  footer: {
    marginTop: Spacing.lg,
  },
});
