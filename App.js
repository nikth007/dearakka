import 'react-native-gesture-handler';
import React from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/data/AppContext';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? '#060F1E' : '#0F2441' }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppProvider>
          {Platform.OS === 'web' ? (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, width: '100%', maxWidth: 480, overflow: 'hidden' }}>
                <AppNavigator />
              </View>
            </View>
          ) : (
            <AppNavigator />
          )}
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
