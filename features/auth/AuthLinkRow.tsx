import { Link, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/config/theme';
import { ThemedText } from '@/components/ui';

type AuthLinkRowProps = {
  label: string;
  linkLabel: string;
  href: Href;
};

export function AuthLinkRow({ label, linkLabel, href }: AuthLinkRowProps) {
  return (
    <View style={styles.row}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Link href={href} asChild>
        <ThemedText type="link" style={styles.link}>
          {linkLabel}
        </ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    marginTop: Spacing.sm,
  },
  label: {
    opacity: 0.8,
  },
  link: {
    fontWeight: '600',
  },
});
