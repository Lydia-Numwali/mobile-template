import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  AccessibilityInfo,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { TaskCard } from '@/components/ui/TaskCard';
import { useTaskContext } from '@/context/TaskContext';
import { TaskForm } from '@/components/ui/TaskForm';
import { Layout } from '@/components/layout/Layout';

const TAB_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
  { key: 'in_progress', label: 'In Progress' },
];

const TasksPage: React.FC = () => {
  const { tasks } = useTaskContext();
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    if (activeTab === 'all') return tasks;
    return tasks.filter((task) => task.status === activeTab);
  }, [tasks, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    AccessibilityInfo.announceForAccessibility(`${tab} tab selected`);
  };

  const renderTask = ({ item }: { item: typeof tasks[0] }) => (
    <View className="w-full md:w-1/2 px-1 mb-4">
      <TaskCard task={item} />
    </View>
  );

  return (
    <Layout>
      <View className="flex-1 bg-gray-300/50">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <Text
            className="text-xl font-semibold text-gray-800"
            accessibilityRole="header"
            accessibilityLabel="My Tasks"
          >
            My Tasks
          </Text>
          <TouchableOpacity
            onPress={() => setIsAddModalOpen(true)}
            className="bg-blue-600 p-3 rounded-full shadow"
            accessibilityRole="button"
            accessibilityLabel="Add new task"
            accessibilityHint="Opens the form to add a new task"
          >
            <Plus size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="px-6 mb-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 2 }}
          >
            <View className="flex-row space-x-3">
              {TAB_OPTIONS.map(({ key, label }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleTabChange(key)}
                  className={`px-5 py-2 rounded-full ${
                    activeTab === key ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: activeTab === key }}
                  accessibilityLabel={`${label} tasks tab`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      activeTab === key ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        ) : (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-gray-500 text-center text-base">
              No tasks found. Add some tasks to get started!
            </Text>
          </View>
        )}

        {/* Add Task Modal */}
        <Modal
          visible={isAddModalOpen}
          animationType="slide"
          onRequestClose={() => setIsAddModalOpen(false)}
          transparent={false}
        >
          <View className="flex-1 bg-white p-6">
            <Text className="text-xl font-semibold mb-5">Add New Task</Text>
            <TaskForm onClose={() => setIsAddModalOpen(false)} />
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

export default TasksPage;
