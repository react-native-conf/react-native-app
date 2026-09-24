import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCart } from '../cart/CartContext';
import { colors, formatPrice, shared } from '../theme';

const SHIPPING_FEE = 5;
const TAX_RATE = 0.08;

type Props = {
  onBack: () => void;
  onDone: () => void;
};

export function CheckoutScreen({ onBack, onDone }: Props) {
  const { items, subtotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_FEE;
  const isValid =
    name.trim().length > 0 &&
    address.trim().length > 0 &&
    /^\+?[0-9\s-]{7,15}$/.test(phone.trim());

  const placeOrder = () => {
    // Mock order: no payment is processed.
    setOrderId(`ORD-${Date.now().toString().slice(-6)}`);
    clearCart();
  };

  if (orderId) {
    return (
      <View style={[shared.screen, styles.success]}>
        <Text style={styles.successTitle}>Order placed!</Text>
        <Text style={styles.successText}>Order ID: {orderId}</Text>
        <Text style={styles.successText}>Thanks for shopping, {name}.</Text>
        <Pressable style={[shared.button, styles.doneButton]} onPress={onDone}>
          <Text style={shared.buttonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={shared.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={shared.header}>
        <Pressable onPress={onBack} hitSlop={8}>
          <Text style={shared.link}>‹ Back</Text>
        </Pressable>
        <Text style={shared.title}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.section}>Shipping details</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.section}>Order summary</Text>
        <View style={shared.card}>
          {items.map(item => (
            <View key={item.product.id} style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                {item.product.name} × {item.quantity}
              </Text>
              <Text style={styles.summaryText}>
                {formatPrice(item.product.price * item.quantity)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Tax (8%)</Text>
            <Text style={styles.summaryText}>{formatPrice(tax)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Shipping</Text>
            <Text style={styles.summaryText}>{formatPrice(SHIPPING_FEE)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          style={[shared.button, !isValid && shared.buttonDisabled]}
          disabled={!isValid}
          onPress={placeOrder}
        >
          <Text style={shared.buttonText}>Place Order</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerSpacer: {
    width: 50,
  },
  content: {
    padding: 16,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
    color: colors.text,
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  summaryText: {
    fontSize: 14,
    color: colors.text,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  doneButton: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
});
