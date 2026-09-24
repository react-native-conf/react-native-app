import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../cart/CartContext';
import type { Product } from '../data/products';
import { colors, formatPrice, shared } from '../theme';

type Props = {
  product: Product;
  onBack: () => void;
  onOpenCart: () => void;
};

export function ProductDetailsScreen({ product, onBack, onOpenCart }: Props) {
  const { addToCart, itemCount } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <View style={shared.screen}>
      <View style={shared.header}>
        <Pressable onPress={onBack} hitSlop={8}>
          <Text style={shared.link}>‹ Back</Text>
        </Pressable>
        <Pressable onPress={onOpenCart} hitSlop={8}>
          <Text style={shared.link}>Cart ({itemCount})</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>{product.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={product.inStock ? styles.inStock : styles.outOfStock}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      <View style={styles.footer}>
        {added && <Text style={styles.addedText}>Added to cart</Text>}
        <Pressable
          style={[shared.button, !product.inStock && shared.buttonDisabled]}
          disabled={!product.inStock}
          onPress={handleAdd}
        >
          <Text style={shared.buttonText}>
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  imagePlaceholder: {
    height: 220,
    borderRadius: 12,
    backgroundColor: '#e3ecfa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageText: {
    fontSize: 72,
    fontWeight: '700',
    color: colors.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  category: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 12,
  },
  inStock: {
    color: colors.success,
    marginTop: 4,
  },
  outOfStock: {
    color: colors.danger,
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginTop: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  addedText: {
    color: colors.success,
    textAlign: 'center',
    marginBottom: 8,
  },
});
