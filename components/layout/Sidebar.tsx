import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Home, ListTodo, User, X } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import type { DrawerNavigationProp } from '@react-navigation/drawer';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const route = useRoute(); // Access the current route

  const navItems = [
    { route: 'home', label: 'Homepage', icon: <Home size={20} color="#2563EB" /> },
    { route: 'task', label: 'Tasks', icon: <ListTodo size={20} color="#2563EB" /> },
    { route: 'profile', label: 'Profile', icon: <User size={20} color="#2563EB" /> },
  ];

  if (!isOpen) return null;

  return (
    <View className="absolute inset-0 flex-row z-60">
      {/* Overlay */}
      <Pressable
        className="flex-1 bg-black/50"
        onPress={onClose}
        style={{ zIndex: 50 }} // Overlay behind sidebar and header
      />

      {/* Sidebar content */}
      <View className="w-64 bg-white shadow-xl" style={{ zIndex: 60 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-6 border-b border-gray-200">
          <Text className="text-xl font-semibold text-blue-600">TaskFlow</Text>
          <TouchableOpacity onPress={onClose} className="p-1 rounded-full">
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View className="p-4 flex-1">
          {navItems.map((item) => {
            const isActive = route.name === item.route; // Check if the item is the active route
            return (
              <TouchableOpacity
                key={item.route}
                onPress={() => {
                  navigation.navigate(item.route as never);
                  onClose();
                }}
                className={`flex-row items-center px-4 py-3 rounded-lg mb-2 ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-blue-200'
                }`}
              >
                <View className="mr-3">{item.icon}</View>
                <Text className={`font-medium ${isActive ? 'text-white' : 'text-primary'}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
