import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../cart/CartContext';
import { MOCK_PRODUCTS, type Product } from '../data/products';
import { colors, formatPrice, shared } from '../theme';

type Props = {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
};

export function ProductListScreen({ onSelectProduct, onOpenCart }: Props) {
  const { itemCount } = useCart();

  return (
    <View style={shared.screen}>
      <View style={shared.header}>
        <Text style={shared.title}>Products</Text>
        <Pressable onPress={onOpenCart} hitSlop={8}>
          <Text style={shared.link}>Cart ({itemCount})</Text>
        </Pressable>
      </View>
      <FlatList
        data={MOCK_PRODUCTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[shared.card, styles.card]}
            onPress={() => onSelectProduct(item)}
          >
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <Text style={item.inStock ? styles.inStock : styles.outOfStock}>
                {item.inStock ? 'In stock' : 'Out of stock'}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  category: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  inStock: {
    fontSize: 12,
    color: colors.success,
    marginTop: 4,
  },
  outOfStock: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
  },
});
