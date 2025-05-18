import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity,ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';


import { useTaskContext } from '@/context/TaskContext';
import { getRandomQuote } from '@/data/mockData';
import { TaskCard } from '@/components/ui/TaskCard';
import { Layout } from '@/components/layout/Layout';

interface Task {
  id: string;
  title: string;
  description: string; 
  date?: string;  
  status: 'completed' | 'in_progress' | 'pending';
  rating?: number;  
  
}

const HomePage: React.FC = () => {
  const { tasks } = useTaskContext();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('all');

  const dailyQuote = useMemo(() => getRandomQuote(), []);

  const filteredTasks = useMemo(() => {
    if (activeTab === 'all') return tasks.slice(0, 4);
    return tasks.filter((task) => task.status === activeTab).slice(0, 4);
  }, [tasks, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <ScrollView className="flex-1 px-4 py-6 bg-gray-300/50">

<View style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
  <ImageBackground
    source={require("@/assets/images/home.png")}
    resizeMode="cover"
    style={{
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
    }}
  >

          <View className="flex-1">
            <Text className="text-white text-2xl font-medium mb-1">🕯️Daily Quote🕯️</Text>
            <Text className="text-white font-light">{dailyQuote.quote}</Text>
          </View>
          <Image
            source={require("@/assets/images/homie.png")}
            className="contain "
          />
        </ImageBackground>
        </View>
        

        {/* Header */}
        <View className="flex-row items-center justify-between mb-4 mx-2">
          <Text className="text-lg font-semibold text-primary">Recent Activities</Text>
          <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/task')}>
            <Text className="text-primary underline text-sm">View All</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {['all', 'completed', 'pending', 'in_progress'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabChange(tab)}
              className={`px-4 py-2 mr-2 rounded-full ${activeTab === tab ? 'bg-primary' : 'bg-gray-100'}`}
            >
              <Text className={`text-sm capitalize ${activeTab === tab ? 'text-white font-medium' : 'text-primary'}`}>
                {tab.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            keyExtractor={(task) => task.id}
            renderItem={({ item }) => (
              <View className="w-[300px] mr-4">
                <TaskCard task={item} />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 4,
              paddingBottom: 12,
            }}
          />
        ) : (
          <Text className="text-gray-500 text-center py-8">
            No tasks found. Add some tasks to get started!
          </Text>
        )}
      </ScrollView>
    </Layout>
  );
};

export default HomePage;
