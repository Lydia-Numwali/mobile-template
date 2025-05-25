import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';

interface NotificationProps {
  isVisible: boolean;
  message: string;
  type: 'added' | 'deleted' | 'deletedWithError'; // Types of notification
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ isVisible, message, type, onClose }) => {
  // Default to green for "added" notifications
  let backgroundColor = '#4CAF50';

  // Change background color based on notification type
  if (type === 'deleted') backgroundColor = '#FFEB3B'; // Yellow for task deleted
  else if (type === 'deletedWithError') backgroundColor = '#F44336'; // Red for error

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          }}
        >
          <View
            style={{
              backgroundColor,
              padding: 20,
              borderRadius: 10,
              width: '80%',
              maxWidth: 350,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{message}</Text>
            <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default Notification;
