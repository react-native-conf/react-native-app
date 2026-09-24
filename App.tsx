/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CartProvider } from './src/cart/CartContext';
import type { Product } from './src/data/products';
import { CartScreen } from './src/screens/CartScreen';
import { CheckoutScreen } from './src/screens/CheckoutScreen';
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen';
import { ProductListScreen } from './src/screens/ProductListScreen';
import { colors } from './src/theme';

type Route =
  | { name: 'list' }
  | { name: 'details'; product: Product }
  | { name: 'cart' }
  | { name: 'checkout' };

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CartProvider>
        <AppContent />
      </CartProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [stack, setStack] = useState<Route[]>([{ name: 'list' }]);
  const route = stack[stack.length - 1];

  const push = (next: Route) => setStack(prev => [...prev, next]);
  const goBack = () => setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const goHome = () => setStack([{ name: 'list' }]);

  // Android hardware back button pops the stack instead of exiting.
  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stack.length]);

  let screen: React.ReactNode;
  switch (route.name) {
    case 'details':
      screen = (
        <ProductDetailsScreen
          product={route.product}
          onBack={goBack}
          onOpenCart={() => push({ name: 'cart' })}
        />
      );
      break;
    case 'cart':
      screen = (
        <CartScreen
          onBack={goBack}
          onCheckout={() => push({ name: 'checkout' })}
        />
      );
      break;
    case 'checkout':
      screen = <CheckoutScreen onBack={goBack} onDone={goHome} />;
      break;
    default:
      screen = (
        <ProductListScreen
          onSelectProduct={product => push({ name: 'details', product })}
          onOpenCart={() => push({ name: 'cart' })}
        />
      );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom },
      ]}
    >
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
