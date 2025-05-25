import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView,  ActivityIndicator, } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/Input';
import CustomButton from '@/components/CustomButton';
import { ChevronLeftBlue } from '@/assets/svgs';

import { Mail, Lock, ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);  
        router.push('/(root)/(tabs)/home');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
     

          {/* Logo */}
          <View className="items-center mt-6 mb-10">
            <Image
              source={require('@/assets/images/logo_blue.png')}
              className="w-32 h-10"
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="px-6 mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome Back 👋</Text>
            <Text className="text-base text-gray-600">Sign in to continue</Text>
          </View>

          {/* Form */}
          <View className="px-6 space-y-5">
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              errorText={errors.email}
              icon={<Mail size={20} color="#9CA3AF" />} // Tailwind gray-400
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              errorText={errors.password}
              icon={<Lock size={20} color="#9CA3AF" />}
            />

            <TouchableOpacity className="self-end mb-8" activeOpacity={0.7}>
              <Text className="text-primary font-medium text-sm">Forgot Password?</Text>
            </TouchableOpacity>

 <CustomButton
              title={
                loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  'Login Now'
                )
              }
              containerStyle="w-[80%] text-center m-4 h-[54px]  justify-center bg-primary"
              onPress={handleLogin}
              disabled={loading}
            />
          </View>

          {/* Footer */}
          <View className="flex-row justify-center items-center mt-auto mb-12 px-6">
            <Text className="text-gray-600 text-sm">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-primary font-semibold text-sm ml-1">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
