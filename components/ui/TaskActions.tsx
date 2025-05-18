import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTaskContext } from '@/context/TaskContext';
import { useToastContext } from '@/context/ToastContext';
import { Edit, Trash2 } from 'lucide-react-native';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { TaskForm } from './TaskForm';

interface TaskActionsProps {
  taskId: string;
  onClose: () => void;
}

export const TaskActions: React.FC<TaskActionsProps> = ({ taskId, onClose }) => {
  const { getTaskById, deleteTask } = useTaskContext();
  const { addToast } = useToastContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 32 }}>
        <Text style={{ textAlign: 'center', color: '#6b7280', fontSize: 16 }}>Task not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteTask(taskId);
    addToast({
      message: 'Task deleted successfully',
      variant: 'success',
    });
    setIsDeleteModalOpen(false);
    onClose();
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <View style={{ gap: 16, marginVertical: 8 }}>
        {/* Edit Button */}
        <Button
          variant="primary"
          size="md"
          leftIcon={<Edit size={18} color="white" />}
          fullWidth
          onPress={handleEdit}
        >
          Edit Task
        </Button>

        {/* Delete Button */}
        <Button
          variant="danger"
          size="md"
          leftIcon={<Trash2 size={18} color="white" />}
          fullWidth
          onPress={() => setIsDeleteModalOpen(true)}
        >
          <Text className='text-white'>
            Delete Task
          </Text>
        </Button>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion" size="sm">
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 16, color: '#374151' }}>Are you sure you want to delete this task?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
            <Button variant="outline" size="sm" onPress={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onPress={handleDelete}>
              <Text className='text-white'>
                Confirm
              </Text>
            </Button>
          </View>
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Task">
        <TaskForm task={task} onClose={() => { setIsEditModalOpen(false); onClose(); }} />
      </Modal>
    </>
  );
};
