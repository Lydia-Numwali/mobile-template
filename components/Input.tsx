import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorText?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  errorText,
  style,
  inputStyle,
  keyboardType = 'default',
  autoCapitalize = 'none',
  disabled = false,
  icon,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const containerClass = [
    'flex-row items-center h-14 px-4 rounded-xl border',
    disabled ? 'bg-gray-100 border-gray-300' : 'bg-white',
    isFocused ? 'border-blue-500' : 'border-gray-300',
    errorText ? 'border-red-500' : '',
  ].join(' ');

  return (
    <View className="mb-4" style={style}>
      {label && (
        <Text className="mb-2 text-sm text-gray-600">
          {label}
        </Text>
      )}

      <View className={containerClass}>
        {icon && <View className="mr-2">{icon}</View>}

        <TextInput
          className={`flex-1 h-full text-base text-gray-900 font-[Poppins-Regular] ${secureTextEntry ? 'pr-10' : ''}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af" // Tailwind's gray-400
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          style={inputStyle}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            className="absolute right-4 h-full justify-center"
          >
            {isPasswordVisible ? (
              <Eye size={20} color="#9ca3af" />
            ) : (
              <EyeOff size={20} color="#9ca3af" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorText && (
        <Text className="mt-1 text-xs text-red-500">{errorText}</Text>
      )}
    </View>
  );
}
export default Input;