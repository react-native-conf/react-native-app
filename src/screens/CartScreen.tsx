import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../cart/CartContext';
import { colors, formatPrice, shared } from '../theme';

type Props = {
  onBack: () => void;
  onCheckout: () => void;
};

export function CartScreen({ onBack, onCheckout }: Props) {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  return (
    <View style={shared.screen}>
      <View style={shared.header}>
        <Pressable onPress={onBack} hitSlop={8}>
          <Text style={shared.link}>‹ Back</Text>
        </Pressable>
        <Text style={shared.title}>Cart</Text>
        <View style={styles.headerSpacer} />
      </View>
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.product.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[shared.card, styles.row]}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.product.name}</Text>
                <Text style={styles.price}>
                  {formatPrice(item.product.price)}
                </Text>
                <Pressable
                  onPress={() => removeFromCart(item.product.id)}
                  hitSlop={8}
                >
                  <Text style={styles.remove}>Remove</Text>
                </Pressable>
              </View>
              <View style={styles.qty}>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.qtyButtonText}>−</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
        </View>
        <Pressable
          style={[shared.button, items.length === 0 && shared.buttonDisabled]}
          disabled={items.length === 0}
          onPress={onCheckout}
        >
          <Text style={shared.buttonText}>Proceed to Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSpacer: {
    width: 50,
  },
  list: {
    paddingHorizontal: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    color: colors.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  remove: {
    color: colors.danger,
    marginTop: 8,
  },
  qty: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    color: colors.text,
  },
  qtyText: {
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
});
