// TaskTabs.tsx
import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

export const TaskTabs = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const tabs = ['all', 'completed', 'pending', 'in_progress'];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row space-x-2">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <Text className={`text-sm font-medium ${activeTab === tab ? 'text-white' : 'text-gray-800'}`}>
              {tab.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
