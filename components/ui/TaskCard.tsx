import React, { useState } from 'react';
import { View, Text, Pressable, Image, Modal } from 'react-native';
import { MoreVertical, Star } from 'lucide-react-native';
import { format } from 'date-fns';
import { Task } from '@/types';
import { TaskActions } from './TaskActions';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No date';
    try {
      return format(new Date(dateString), 'PPP');
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-orange-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <>
      <Pressable
        onPress={() => setIsActionsOpen(true)}
        className="rounded-2xl mb-3"
        android_ripple={{ color: '#e5e7eb' }}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        <View className="bg-white rounded-2xl shadow-md px-4 py-3">

          {/* Image */}
          {task.image && (
            <View className="h-40 rounded-lg overflow-hidden mb-3">
              <Image
                source={{ uri: task.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          )}

          {/* Title and Icon */}
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-base font-semibold text-gray-900 flex-1 pr-2">
              {task.title}
            </Text>

            <Pressable
              onPress={() => setIsActionsOpen(true)}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <MoreVertical size={20} color="gray" />
            </Pressable>
          </View>

          {/* Description */}
          {task.description && (
            <Text className="text-sm text-gray-600 mb-2">{task.description}</Text>
          )}

          {/* Date, Status, Rating */}
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-xs text-gray-500">{formatDate(task.date)}</Text>
              <Text className={`text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </Text>
            </View>

            {/* Only show rating if task is completed */}
            {task.status === 'completed' && task.rating !== undefined && (
              <View className="flex-row items-center">
                <Star size={14} color="#facc15" fill="#facc15" />
                <Text className="ml-1 text-xs text-gray-700">{task.rating}</Text>
              </View>
            )}
          </View>

        </View>
      </Pressable>

      {/* Modal for Actions */}
      <Modal visible={isActionsOpen} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/80 px-4">
          <View className="bg-white p-4 rounded-xl w-full max-w-md">
            <TaskActions taskId={task.id} onClose={() => setIsActionsOpen(false)} />
            <Pressable
              onPress={() => setIsActionsOpen(false)}
              className="mt-4 border p-2 rounded-lg border-primary"
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Text className="text-center text-primary font-semibold">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
