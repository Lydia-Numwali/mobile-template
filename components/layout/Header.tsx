import React, { useState } from 'react';
import { DevSettings } from 'react-native';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Menu,
  Search,
  Filter,
  MapPin,
  ArrowLeft,
  Bell,
} from 'lucide-react-native';
import { useUserContext } from '@/context/UserContext';

interface HeaderProps {
  onMenuToggle: () => void;
  showSearch?: boolean;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  showSearch = true,
  title,
  showBackButton = false,
  onBack,
}) => {
  const { user } = useUserContext();
  const [refreshing, setRefreshing] = useState(false);

 const onRefresh = () => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
    DevSettings.reload(); 
  }, 1000);
};


  return (
    <SafeAreaView className="bg-white shadow-sm px-4 py-4">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <MapPin size={16} color="#2563EB" />
            <Text className="ml-1 text-sm text-primary">Kigali, Rwanda</Text>
          </View>
        </View>

        {title ? (
          
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              {showBackButton && (
                <TouchableOpacity onPress={onBack} className="mr-2">
                  <ArrowLeft size={24} color="#2563EB" />
                </TouchableOpacity>
              )}
              <Text className="text-xl font-bold text-primary">{title}</Text>
            </View>
            <TouchableOpacity onPress={onMenuToggle} className="p-1">
              <Menu size={24} color="#2563EB" />
            </TouchableOpacity>
          </View>
        ) : (
          // ✅ Homepage layout
          <>
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-2xl font-semibold text-dark">Welcome Back 👋</Text>
                <Text className="text-gray-600">{user?.firstName || 'User'}</Text>
              </View>
              <TouchableOpacity onPress={onMenuToggle} className="p-1">
                <Menu size={24} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {showSearch && (
              <View className="relative">
                <View className="absolute left-3 top-0 bottom-0 justify-center">
                  <Search size={16} color="#9CA3AF" />
                </View>
                <TextInput
                  placeholder="Search..."
                  className="border border-gray-300 rounded-md pl-10 pr-12 py-2 text-sm"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity className="absolute right-0 top-0 bottom-0 justify-center p-4 bg-blue-600 rounded-r-md">
                  <Filter size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
