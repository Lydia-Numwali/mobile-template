import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useTaskContext } from '@/context/TaskContext';
import { useToastContext } from '@/context/ToastContext';
import { Task } from '../../types';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const { addTask, updateTask } = useTaskContext();
  const { addToast } = useToastContext();

  const [formData, setFormData] = useState<Partial<Task>>(
    task || {
      title: '',
      description: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    }
  );

  const handleChange = (name: keyof Task, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      handleChange('image', uri);
    }
  };

  const handleSubmit = () => {
    if (!formData.title?.trim()) {
      addToast({ message: 'Task title is required', variant: 'error' });
      return;
    }

    if (task?.id) {
      updateTask(task.id, formData);
      addToast({ message: 'Task updated successfully', variant: 'success' });
    } else {
      addTask(formData as Omit<Task, 'id'>);
      addToast({ message: 'Task added successfully', variant: 'success' });
    }

    onClose();
  };

  return (
    <View className="space-y-4 p-4">
      {/* Title */}
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Title</Text>
        <TextInput
          value={formData.title || ''}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="Task title"
          className="border border-gray-300 rounded px-3 py-2"
        />
      </View>

      {/* Description */}
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Description</Text>
        <TextInput
          value={formData.description || ''}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Task description"
          multiline
          className="border border-gray-300 rounded px-3 py-2 h-24"
        />
      </View>

      {/* Status */}
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Status</Text>
        <Picker
          selectedValue={formData.status}
          onValueChange={(itemValue) => handleChange('status', itemValue)}
          style={{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8 }}
        >
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="In Progress" value="in_progress" />
          <Picker.Item label="Completed" value="completed" />
        </Picker>
      </View>

      {/* Date */}
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Date</Text>
        <TextInput
          value={formData.date || ''}
          onChangeText={(text) => handleChange('date', text)}
          placeholder="YYYY-MM-DD"
          className="border border-gray-300 rounded px-3 py-2"
        />
      </View>

      {/* Rating */}
      {formData.status === 'completed' && (
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Rating (0–5)</Text>
          <TextInput
            value={formData.rating?.toString() || ''}
            onChangeText={(text) => handleChange('rating', parseFloat(text))}
            keyboardType="numeric"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </View>
      )}

      {/* Image Upload */}
      <View>
        <Text className="text-sm font-medium text-gray-700 mb-1">Image</Text>
        {formData.image ? (
          <Image source={{ uri: formData.image }} className="w-full h-40 mb-2 rounded" />
        ) : null}
        <Pressable
          onPress={handleImagePick}
          className="bg-gray-200 px-4 py-2 rounded text-center"
        >
          <Text className="text-center text-gray-700">Choose Image</Text>
        </Pressable>
      </View>

      {/* Submit + Cancel */}
      <View className="flex-row justify-end space-x-2 pt-2">
        <Pressable onPress={onClose} className="px-4 py-2 border border-gray-300 rounded">
          <Text className="text-gray-700">Cancel</Text>
        </Pressable>
        <Pressable onPress={handleSubmit} className="px-4 py-2 bg-blue-500 rounded">
          <Text className="text-white">{task ? 'Update Task' : 'Add Task'}</Text>
        </Pressable>
      </View>
    </View>
  );
};
