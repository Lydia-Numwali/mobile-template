import React, { useEffect } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { X } from 'lucide-react-native';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {

  // Handle Android back button (optional)
  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove();
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <RNModal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose} 
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className={`bg-white rounded-lg shadow-xl w-11/12 ${sizeClasses[size]}`}>
              {title && (
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                  <Text className="text-lg font-medium text-gray-900">{title}</Text>
                  <TouchableOpacity
                    onPress={onClose}
                    className="p-1 border-gray-100"
                    style={{
                      borderWidth: 1,
                      borderColor: '#D9D9D9', 
                      borderRadius: 8, 
                      padding: 4,
                    }}
                  >
                    <X size={20} className="text-gray-400" />
                  </TouchableOpacity>
                </View>
              )}
              <View className="px-4 py-3">
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
