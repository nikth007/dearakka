import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useApp } from '../data/AppContext';
import { getCyclePhase, currentCycleDay } from '../utils/cycleCalc';
import FloatingTabBar from '../components/FloatingTabBar';

import HomeScreen from '../screens/HomeScreen';
import TrackScreen from '../screens/TrackScreen';
import CycleLogScreen from '../screens/CycleLogScreen';
import ChatScreen from '../screens/ChatScreen';
import LearnScreen from '../screens/LearnScreen';
import CareScreen from '../screens/CareScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { cycleData } = useApp();
  const cycleDay = currentCycleDay(cycleData.lastPeriodStart);
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData.cycleLength) : 'none';

  return (
    <Tab.Navigator
      tabBar={props => <FloatingTabBar {...props} phase={phase} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"  component={HomeScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Chat"  component={ChatScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Care"  component={CareScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isOnboarded, loading } = useApp();
  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="CycleLog"  component={CycleLogScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Profile"   component={ProfileScreen}  options={{ animation: 'slide_from_right' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
