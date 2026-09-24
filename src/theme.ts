import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f5f5f5',
  card: '#fff',
  text: '#222',
  muted: '#777',
  primary: '#1a73e8',
  success: '#2e7d32',
  danger: '#c62828',
  border: '#ddd',
  disabled: '#9e9e9e',
};

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const shared = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
});
