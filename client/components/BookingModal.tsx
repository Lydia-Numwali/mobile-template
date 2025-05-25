// components/BookingModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { X } from 'lucide-react-native';
import { Button } from './Button'; // Assuming your Button component is in this path

interface BookingModalProps {
  isVisible: boolean;
  onClose: () => void;
  parkingSpot: {
    id: string;
    name: string;
    address: string;
    price: string;
    available: number;
  } | null;
  onBookNow: (spotId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isVisible,
  onClose,
  parkingSpot,
  onBookNow,
}) => {
  if (!parkingSpot) {
    return null; // Don't render if no parking spot is provided
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={Colors.text.tertiary} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Book Parking Spot</Text>
          <Text style={styles.spotName}>{parkingSpot.name}</Text>
          <Text style={styles.spotAddress}>{parkingSpot.address}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>{parkingSpot.price}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoBox}>
              <Text style={styles.label}>Available</Text>
              <Text style={styles.value}>{parkingSpot.available} spots</Text>
            </View>
          </View>

          {/* You can add more booking form elements here, e.g., date, time, duration */}
          <Text style={styles.formLabel}>Select Duration:</Text>
          <Text style={styles.formPlaceholder}>2 hours</Text>
          {/* ... more input fields */}

          <Button
            title={`Confirm Booking for ${parkingSpot.price}`}
            variant="primary"
            size="large"
            onPress={() => onBookNow(parkingSpot.id)}
            style={styles.bookNowButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns modal to the bottom
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim background
  },
  modalView: {
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  spotName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  spotAddress: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginBottom: 16,
    textAlign: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.neutral[300],
    marginHorizontal: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  formPlaceholder: {
    fontSize: 16,
    color: Colors.text.secondary,
    backgroundColor: Colors.background.secondary,
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  bookNowButton: {
    marginTop: 16,
  },
});