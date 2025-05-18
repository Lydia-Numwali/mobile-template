import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Link, router } from 'expo-router';
import Toast from 'react-native-toast-message';

import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import {
  CheckSvg,
  ChevronLeftBlue,
  EyeOpen,
  EyeSvg,
  MailGray,
  Lock,
} from '@/assets/svgs';

import { axiosInstance } from '@/app/api/axios';
import storage from './storage';
import { loginSuccess } from '@/redux/userSlice';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
};

const Register: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
  });

  const handleInputChange = useCallback(
    (key: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleRegister = async () => {
    const { firstName, lastName, email, password, address } = formData;

    if (!firstName || !lastName || !email || !password || !address) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      return;
    }

    if (!agreedToTerms) {
      Toast.show({
        type: 'error',
        text1: 'Please agree to the Terms & Conditions',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/register', formData);
      const { accessToken, user } = response.data;

      await storage.storeToken(accessToken);
      await storage.storeUser(user);

      dispatch(loginSuccess(user));
      router.replace('/(onboarding)/login');

      Toast.show({
        type: 'success',
        text1: 'Registration successful!',
      });
    } catch (err: unknown) {
      const errorMessage =
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as any).response?.data?.message === 'string'
          ? (err as any).response.data.message
          : 'Please try again.';

      console.error('Registration failed:', err);

      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-300/30">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full px-6 pt-20 pb-10">
          <View className="items-center mb-6">
            <Image source={require('../../assets/images/logo_blue.png')} />
          </View>

          <Text className="text-dark font-semibold text-2xl mb-3">Register Now</Text>
          <Text className="text-gray-1 text-[14px] mb-10">
            We're happy to have you on board with us. Create your free account
          </Text>

          <CustomInput
            value={formData.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            placeholder="Firstname"
            placeholderStyle="text-gray-2 font-semibold"
          />

          <CustomInput
            value={formData.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            placeholder="Lastname"
            placeholderStyle="text-gray-2 font-semibold"
          />

          <CustomInput
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            iconLeft={<MailGray />}
            placeholder="Email"
            placeholderStyle="text-gray-2 font-semibold"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <CustomInput
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            iconLeft={<Lock />}
            placeholder="Password"
            placeholderStyle="text-gray-2 font-semibold"
            secureTextEntry={!showPassword}
            iconRight={{
              close: <EyeSvg />,
              open: <EyeOpen />,
              onPress: () => setShowPassword((prev) => !prev),
            }}
          />

          <CustomInput
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="Address"
            placeholderStyle="text-gray-2 font-semibold"
          />

          <TouchableOpacity
            onPress={() => setAgreedToTerms((prev) => !prev)}
            className="flex-row items-center gap-3 my-4"
          >
            <CheckSvg opacity={agreedToTerms ? 1 : 0.3} />
            <Text className="text-[14px] font-semibold text-gray-1">
              Agree to Terms & Conditions
            </Text>
          </TouchableOpacity>

          <CustomButton
            title={loading ? <ActivityIndicator color="#fff" /> : 'Sign Up'}
            containerStyle="w-full h-[60px] mb-6 justify-center bg-primary"
            iconRight={<ChevronLeftBlue />}
            onPress={handleRegister}
            disabled={loading}
            textStyle="text-center"
          />

          <Text className="text-[15px] text-gray-1 text-center">
            Already have an Account?{' '}
            <Link
              className="underline text-primary font-bold text-center"
              href="/(onboarding)/login"
            >
              Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
