import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '../context/AppContext';
import { Colors, Typography } from '../theme';
import { t } from '../data/strings';

// Screens
import SplashScreen from '../screens/Onboarding/SplashScreen';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import LanguageScreen from '../screens/Onboarding/LanguageScreen';
import ProfileSetupScreen from '../screens/Onboarding/ProfileSetupScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import TrackScreen from '../screens/Track/TrackScreen';
import LearnScreen from '../screens/Learn/LearnScreen';
import ConditionDetailScreen from '../screens/Learn/ConditionDetailScreen';
import AssessmentScreen from '../screens/Learn/AssessmentScreen';
import AssessmentResultScreen from '../screens/Learn/AssessmentResultScreen';
import BreastExamScreen from '../screens/Learn/BreastExamScreen';
import MythsScreen from '../screens/Learn/MythsScreen';
import CareScreen from '../screens/Care/CareScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ name, color, focused }) {
  return (
    <View style={[styles.iconWrapper, focused && styles.iconActive]}>
      <MaterialCommunityIcons name={name} size={24} color={color} />
    </View>
  );
}

function MainTabs() {
  const { state } = useApp();
  const lang = state.lang;
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.teal,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.divider,
          borderTopWidth: 1,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 8),
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarLabelStyle: { ...Typography.tiny, marginTop: -2 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabHome', lang),
          tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? 'home-heart' : 'home-heart-outline'} color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          tabBarLabel: t('tabTrack', lang),
          tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? 'calendar-heart' : 'calendar-heart-outline'} color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarLabel: t('tabLearn', lang),
          tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? 'book-open-page-variant' : 'book-open-outline'} color={color} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Care"
        component={CareScreen}
        options={{
          tabBarLabel: t('tabCare', lang),
          tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? 'bell-ring' : 'bell-outline'} color={color} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { state } = useApp();

  if (state.loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!state.onboarded ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="LanguageSelect" component={LanguageScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ConditionDetail" component={ConditionDetailScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="AssessmentResult" component={AssessmentResultScreen} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="BreastExam" component={BreastExamScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Myths" component={MythsScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'slide_from_right' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  iconActive: {
    backgroundColor: Colors.tealLight,
  },
});
