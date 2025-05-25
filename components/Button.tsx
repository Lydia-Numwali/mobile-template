import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View, // Added View for icon spacing if needed
} from 'react-native';
import Colors from '@/constants/Colors'; // Assuming this path is correct

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonStyle?: ViewStyle; // Custom style for the button container
  textStyle?: TextStyle;   // Custom style for the text
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  style, // This is the main style prop from TouchableOpacityProps, applied to the TouchableOpacity
  buttonStyle, // This is an additional style prop specifically for the button's internal View if needed, but usually `style` is enough.
  textStyle: customTextStyle, // Renamed to avoid conflict with internal textStyle
  ...props
}) => {
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...sizeStyles[size], // Apply size-specific padding
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: Colors.primary[500],
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.secondary[500], // Assuming Colors.secondary[500] exists
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.primary[500],
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.text,
      ...textSizeStyles[size], // Apply size-specific font size
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseTextStyle,
          color: Colors.primary[50], // Corrected: Use a light color for text on dark backgrounds
                                      // Using Colors.primary[50] based on ActivityIndicator
        };
      case 'outline':
      case 'ghost':
        return {
          ...baseTextStyle,
          color: Colors.primary[500], // Text color for outline/ghost buttons
        };
      default:
        return baseTextStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style, buttonStyle]} // Merging generated styles, passed `style`, and `buttonStyle`
      disabled={isLoading || props.disabled}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary[500] : Colors.primary[50]}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
          <Text style={[getTextStyles(), customTextStyle]}>{title}</Text>
          {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    // Removed gap here, manage spacing with iconWrapper or margins if needed
  },
  text: {
    fontWeight: '600', // Corresponds to Poppins-SemiBold if Poppins is the default app font
    textAlign: 'center',
  },
  iconWrapper: {
    marginHorizontal: 8, // Add some space around icons
  },
});

const sizeStyles: Record<'small' | 'medium' | 'large', ViewStyle> = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
};

const textSizeStyles: Record<'small' | 'medium' | 'large', TextStyle> = {
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
};
