import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ToastContainer } from '../ui/Toast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getPageTitle = () => {
    const routeName = route.name;

    if (routeName === 'home') return ''; // No title for Home page
    if (routeName === 'task') return 'My Tasks';
    if (routeName === 'profile') return 'My Profile';

    return '';
  };

  const shouldShowBackButton = () => {
    return route.name !== 'home'; // Hide back button on Home page
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-300/100">
      {/* The header remains at the top */}

      <Header
        onMenuToggle={toggleSidebar}
        showSearch={route.name === 'home'}
        title={getPageTitle()}
        showBackButton={shouldShowBackButton()}
        onBack={handleBack}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />


      <View className="flex-1">
        {children}
      </View>

      <ToastContainer />
    </SafeAreaView>
  );
};
