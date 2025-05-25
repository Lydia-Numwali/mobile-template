import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { CustomInputProps } from '@/types';

const CustomInput = ({
  containerStyle,
  iconLeft,
  iconRight,
  placeholder,
  secureTextEntry = false,
  onChangeText,
}: CustomInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className={`relative w-full pl-3 py-3 rounded-[12px] flex flex-row items-center border 
          ${isFocused ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white'} ${containerStyle} mb-6`}
        >
          {iconLeft && <View>{iconLeft}</View>}

          <TextInput
            placeholder={placeholder}
            secureTextEntry={!isPasswordVisible}
            className="bg-transparent px-3 py-2 w-full h-full text-gray-800 font-semibold"
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {iconRight && (
            <TouchableOpacity onPress={handleTogglePasswordVisibility} className="absolute right-4">
              {isPasswordVisible ? iconRight.open : iconRight.close}
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CustomInput;
