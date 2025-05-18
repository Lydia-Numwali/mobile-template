import { View, Text, ScrollView, Image,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '@/components/CustomInput';
import { AppleSvg, ChevronLeftBlue, EyeOpen, EyeSvg, GoogleSvg, MailGray, Lock } from '@/assets/svgs';
import Checkbox from 'expo-checkbox';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/userSlice';
import CustomButton from '@/components/CustomButton';
import storage from './storage';
import {axiosInstance} from '@/app/api/axios';

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }

    setLoading(true); 
    try {
      console.log(formData)
      const response = await axiosInstance.post('/login', formData);

      const accessToken = response.data.accessToken;
      const user = response.data.user;

      await storage.storeToken(accessToken);
      await storage.storeUser(user);

      dispatch(loginSuccess(user));
      router.replace('/(root)/(tabs)/home');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials and try again.');
      setLoginFailed(true);
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-300/30">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="w-full px-6 pt-20 pb-10">
          <View className="w-full items-center">
            <Image source={require('../../assets/images/logo_blue.png')} />
          </View>

          <Text className="mt-12 text-dark font-semibold text-2xl">Login Now</Text>
          <Text className="text-gray-1 text-[14px] mt-3 mb-12">
            Enter your email and password to login into your account
          </Text>

          <CustomInput
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            iconLeft={<MailGray />}
            placeholder="Email"
            placeholderStyle="text-gray-2"
          />
          <CustomInput
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            iconLeft={<Lock />}
            placeholder="Password"
            placeholderStyle="text-gray-2"
            iconRight={{ close: <EyeSvg />, open: <EyeOpen /> }}
            multiline={false}
            numberOfLines={1}
          />

          <View className="flex flex-row justify-between items-center mb-6">
            <View className="flex flex-row gap-2 items-center">
              <Checkbox value={isSelected} onValueChange={setIsSelected} />
              <Text className="text-gray-1 font-semibold text-[14px]">Remember Me</Text>
            </View>
            <Link
              href="/(onboarding)/login"
              className="text-primary hover:font-medium text-[14px] underline"
            >
              Forgot Password?
            </Link>
          </View>

        <CustomButton
  title={
    loading ? (
      <ActivityIndicator size="small" color="#ffffff" />
    ) : (
      'Sign In'
    )
  }
  containerStyle="w-full h-[60px] mb-6 justify-center bg-primary"
  iconRight={!loading && <ChevronLeftBlue />} // hide icon when loading
  onPress={handleLogin}
  disabled={loading}
/>

          <Text className="text-[15px] text-gray-1 text-center">
            Don’t have an Account?{' '}
            <Link className="underline text-primary font-medium text-center" href="/(onboarding)/register">
              Register Now
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;