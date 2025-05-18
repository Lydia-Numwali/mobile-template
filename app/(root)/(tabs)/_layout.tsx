import { TaskProvider } from '@/context/TaskContext';
import { ToastProvider } from '@/context/ToastContext';
import { UserProvider } from '@/context/UserContext'
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <UserProvider>
    <TaskProvider>
      <ToastProvider>
    <Stack screenOptions={{ headerShown: false }}>
    
      <Stack.Screen name="home" />
      <Stack.Screen name="task"  />
      <Stack.Screen name="profile" />
    </Stack>
    </ToastProvider>
    </TaskProvider>
    </UserProvider>
  );

};

export default Layout;
