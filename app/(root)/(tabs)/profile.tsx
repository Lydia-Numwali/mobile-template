import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useUserContext } from '@/context/UserContext';
import { useToastContext } from '@/context/ToastContext';
import { History, Star, LogOut, Edit, Pencil } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/layout/Layout';
import { useNavigation } from 'expo-router';


const ProfilePage: React.FC = () => {
  const { user, logout } = useUserContext();
  const { addToast } = useToastContext();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
const navigation = useNavigation();
  const handleLogout = () => {
    logout();
    addToast({ message: 'Logged out successfully', variant: 'success' });
    setIsLogoutModalOpen(false);
  };

const menuItems = [
  { 
    icon: <History size={20} color="#6B7280" />, 
    label: 'History', 
    onClick: () => navigation.push('/home') 
  },
  { 
    icon: <Star size={20} color="#6B7280" />, 
    label: 'My Review', 
    onClick: () => navigation.navigate('/(root)/(tabs)/task') // adjust name based on your route config
  },
  { 
    icon: <LogOut size={20} color="#EF4444" />, 
    label: 'Logout', 
    onClick: () => navigation.replace('Login') // replace removes history
  }
];

  return (
    <Layout>
      <ScrollView className="flex p-8 bg-gray-300">
        
        {/* Profile Info */}
        <View className="bg-primary rounded-xl p-6 mb-12 shadow-md">
          <View className="flex flex-row justify-center mb-6">
            <View className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>

          <Text className="text-center font-semibold text-xl mb-1 text-white">{user.firstName} {user.lastName}</Text>
          <Text className="text-center mb-4 text-white text-sm">{user.email}</Text>
          <View className="flex flex-row justify-center">
            <Button
              variant="outline"
              leftIcon={<Pencil size={16} color="#2563EB" />}  
              onPress={() => {}}
            >
              <Text className='text-primary'>
              Edit Account

              </Text>
            </Button>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white rounded-md shadow-md overflow-hidden">
          {menuItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={item.onClick}
                className="flex flex-row items-center py-4 px-4 bg-gray-100"
              >
                <View className="mr-3">{item.icon}</View>
                <Text className={`text-base ${item.label === 'Logout' ? 'text-red-500' : 'text-gray-700'}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View className="border-b border-gray-200" />}
            </View>
          ))}
        </View>

        {/* Logout Modal */}
        <Modal
          transparent={true}
          visible={isLogoutModalOpen}
          onRequestClose={() => setIsLogoutModalOpen(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-2xl p-6">
              <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
              <Text className="text-lg font-semibold text-center mb-2">Confirm Logout</Text>
              <Text className="text-gray-600 text-center mb-6">Are you sure you want to log out?</Text>

              <View className="flex-row justify-around">
                <Button
                  variant="outline"
                  onPress={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onPress={handleLogout}
                >
                  Logout
                </Button>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </Layout>
  );
};

export default ProfilePage;
