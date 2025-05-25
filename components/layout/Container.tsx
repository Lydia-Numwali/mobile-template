import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
  backgroundColor?: string;
}

export function Container({
  children,
  style,
  safeArea = true,
  backgroundColor = Colors.background.primary,
}: ContainerProps) {
  if (safeArea) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }, style]}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});