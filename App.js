import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import RootNavigator from './src/navigation';
import WebShell from './src/components/web/WebShell';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <WebShell>
            <RootNavigator />
          </WebShell>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
