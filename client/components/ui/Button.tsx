import React from 'react';
import { Text, Pressable, ActivityIndicator, View, GestureResponderEvent, StyleSheet } from 'react-native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth,
  isLoading,
  disabled,
  children,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.baseButton,
        styles[variant],
        styles[size],
        disabled || isLoading ? styles.disabled : {},
        fullWidth && styles.fullWidth,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={variant === 'outline' || variant === 'ghost' ? '#000' : '#fff'} />
      ) : (
        <View style={styles.iconTextWrapper}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text style={[styles.text, variant === 'primary' && styles.primaryText]}>{children}</Text>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#3b82f6', // Blue
  },
  secondary: {
    backgroundColor: '#f3f4f6', // Light gray
  },
  outline: {
    backgroundColor: 'white',
    borderColor: '#d1d5db', // Gray border
    borderWidth: 1,
  },
  danger: {
    backgroundColor: '#ef4444', // Red
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sm: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 4,
  },
  text: {
    fontWeight: '500',
  },
  primaryText: {
    color: 'white',
  },
});
