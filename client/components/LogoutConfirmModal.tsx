import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<Props> = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View className="bg-white rounded-t-3xl p-6 shadow-xl">
        {/* Handle / Line on top */}
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

        <Text className="text-xl font-semibold text-center text-gray-800 mb-2">
          Confirm Logout
        </Text>
        <Text className="text-center text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to log out? You’ll be returned to the login screen.
        </Text>

        {/* Buttons */}
        <View className="flex-row justify-between space-x-4">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 bg-gray-100 px-4 py-3 rounded-xl border border-gray-300"
          >
            <Text className="text-center text-gray-700 font-medium text-base">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onConfirm}
            className="flex-1 bg-red-500 px-4 py-3 rounded-xl"
          >
            <Text className="text-center text-white font-medium ">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutConfirmModal;
