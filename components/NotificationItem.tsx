import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Bell,Menu,Filter,ArrowLeft,MapPin,Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface Notification {
  id: string;
  type: 'add' | 'delete' | 'update';
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'add', message: 'Task "Grocery Shopping" added.', timestamp: new Date(), isRead: false },
  { id: '2', type: 'update', message: 'Task "Meeting with John" updated.', timestamp: new Date(Date.now() - 3600000), isRead: true },
  { id: '3', type: 'delete', message: 'Task "Buy tickets" deleted.', timestamp: new Date(Date.now() - 7200000), isRead: false },
  { id: '4', type: 'add', message: 'Task "Call customer support" added.', timestamp: new Date(Date.now() - 86400000), isRead: false },
];

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'add':
        return 'bg-green-400';
      case 'delete':
        return 'bg-red-400';
      case 'update':
        return 'bg-orange-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <View className={`p-4 border-b border-gray-200  ${getBackgroundColor()}`}>
      <Text className="text-gray-80">{notification.message}</Text>
      <Text className="text-gray-500 text-xs mt-1">{notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
    </View>
  );
};

interface NotificationPopupProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ notifications, onClose }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <View className="absolute top-14 right-4 w-80 bg-white rounded-md shadow-md z-50">
        <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-700">Notifications</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500 font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
        <View className="p-4 items-center">
          <Text className="text-gray-500">No new notifications.</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="absolute top-14 right-4 w-80 bg-white rounded-md shadow-md z-50">
      <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-700">Notifications</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-blue-500 font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
      />
    </View>
  );
};

interface NotificationButtonProps {
  onPress: () => void;
  count: number;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ onPress, count }) => {
  return (
    <TouchableOpacity onPress={onPress} className="relative p-1">
      <Bell size={20} color="#2563EB" />
      {count > 0 && (
        <View className="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full w-5 h-5 justify-center items-center">
          <Text className="text-white text-xs font-bold">{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

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
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const navigation = useNavigation();

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const handleNotificationPress = () => {
    setIsNotificationsVisible(true);
    // Mark all as read when opened
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleCloseNotifications = () => {
    setIsNotificationsVisible(false);
  };

  return (
    <SafeAreaView className="bg-white shadow-sm px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {showBackButton && (
            <TouchableOpacity onPress={onBack} className="mr-2">
              <ArrowLeft size={24} color="#2563EB" />
            </TouchableOpacity>
          )}
          <Text className="text-xl font-bold text-gray-800">{title}</Text>
        </View>
        <View className="flex-row items-center gap-x-4">
          <NotificationButton onPress={handleNotificationPress} count={unreadCount} />
          <TouchableOpacity onPress={onMenuToggle} className="p-1">
            <Menu size={24} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      {isNotificationsVisible && (
        <NotificationPopup notifications={notifications} onClose={handleCloseNotifications} />
      )}

      {/* Homepage specific header content */}
      {!title && (
        <>
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center">
              <MapPin size={16} color="#2563EB" />
              <Text className="ml-1 text-sm text-primary">Kigali, Rwanda</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <View>
              <Text className="text-2xl font-semibold text-dark">Welcome Back 👋</Text>
              {/* Assuming user context is available */}
              {/* <Text className="text-gray-600">{user.name}</Text> */}
              <Text className="text-gray-600">John Doe</Text>
            </View>
          </View>

          {showSearch && (
            <View className="relative mt-4">
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
    </SafeAreaView>
  );
};