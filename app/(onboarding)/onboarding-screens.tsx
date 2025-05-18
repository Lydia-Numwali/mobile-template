import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { data } from '@/components/constants';
import Swiper from 'react-native-swiper';
import { ChevronLeft, ChevronLeftBlue } from '@/assets/svgs';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';



const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<Swiper>(null);
  const lastIndex = activeIndex === data.onboarding.length - 1;

  return (
    <SafeAreaView className="w-full h-full bg-gray-100 py-6">
      {/* Skip button */}
      <View className="flex flex-row justify-end px-6">
        <TouchableOpacity onPress={() => router.push('/(onboarding)/login')}>
          <Text className="text-dark font-semibold underline text-[16px]">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Logo at top center */}
      <View className="items-center mt-4">
        <Image
          source={require("@/assets/images/logo_blue.png")}
          style={{ width: 120, height: 40 }} 
          resizeMode="contain"
        />
      </View>

      {/* Swiper */}
      <View className="flex-1">
        <Swiper
          ref={swiperRef}
          onIndexChanged={(index) => setActiveIndex(index)}
          loop={false}
          dotColor="#D5E2F5"
          activeDotColor="#0961F5"
          activeDotStyle={{ width: 20 }}
          paginationStyle={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {data.onboarding.map((item) => (
            <View
              key={item.id}
              className="absolute top-1/4 flex flex-col w-full px-4 items-center"
            >
              <Image
                source={item.image}
                style={{ width: 300, height: 300, marginBottom: 32 }}
                resizeMode="contain"
              />
              <Text className="text-dark font-semibold capitalize text-2xl mb-3">
                {item.title}
              </Text>
              <Text className="text-gray-1 text-[14px] text-left">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        {lastIndex ? (
          <CustomButton
            containerStyle="w-[200px] h-[60px] self-center pl-6 pr-2 bg-primary"
            title="Get Started"
            iconRight={<ChevronLeftBlue />}
            onPress={() => router.push('/(onboarding)/login')}
          />
        ) : (
          <TouchableOpacity
            className="w-[60px] h-[60px] rounded-full bg-primary items-center justify-center absolute bottom-0 right-20 flex-row"
            onPress={() => swiperRef.current?.scrollBy(1)}
          >
            <ChevronLeft />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
