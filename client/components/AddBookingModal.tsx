import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Button } from '@/components/Button';

// Define the structure for a booking, now including an optional 'id' for editing
export interface Booking {
  id?: string; // Optional for new bookings, required for editing
  parkingName: string;
  address: string;
  date: string;
  startTime: string;
  endTime: string | null;
  price: string;
  status: 'active' | 'completed' | 'upcoming';
  duration?: string;
}

interface AddBookingModalProps {
  isVisible: boolean;
  onClose: () => void;
  // onSave now takes a 'Booking' object, which might include an ID for updates
  onSave: (booking: Booking) => void;
  // 'initialBooking' prop to pre-fill form when editing
  initialBooking?: Booking | null;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
  isVisible,
  onClose,
  onSave,
  initialBooking,
}) => {
  const [parkingName, setParkingName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState<'active' | 'completed' | 'upcoming'>('upcoming');
  const [duration, setDuration] = useState('');

  // Populate form fields when 'initialBooking' changes (e.g., when editing)
  useEffect(() => {
    if (initialBooking) {
      setParkingName(initialBooking.parkingName);
      setAddress(initialBooking.address);
      setDate(initialBooking.date);
      setStartTime(initialBooking.startTime);
      setEndTime(initialBooking.endTime || '');
      setPrice(initialBooking.price);
      setStatus(initialBooking.status);
      setDuration(initialBooking.duration || '');
    } else {
      // Reset form fields when opening for a new booking
      setParkingName('');
      setAddress('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setPrice('');
      setStatus('upcoming');
      setDuration('');
    }
  }, [initialBooking]);

  const handleSave = () => {
    if (!parkingName || !address || !date || !startTime || !price) {
      Alert.alert('Missing Information', 'Please fill in all required fields (Name, Address, Date, Start Time, Price).');
      return;
    }

    const bookingToSave: Booking = {
      parkingName,
      address,
      date,
      startTime,
      endTime: endTime || null,
      price,
      status,
      ...(status === 'active' && { duration }), // Only include duration if status is 'active'
    };

    // If initialBooking exists, we're in edit mode, so include the ID
    if (initialBooking && initialBooking.id) {
      bookingToSave.id = initialBooking.id;
    }

    onSave(bookingToSave);
    onClose(); // Close modal after saving
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={addBookingStyles.centeredView}>
        <View style={addBookingStyles.modalView}>
          <TouchableOpacity style={addBookingStyles.closeButton} onPress={onClose}>
            <X size={24} color={Colors.neutral[500]} />
          </TouchableOpacity>

          <Text style={addBookingStyles.modalTitle}>
            {initialBooking ? 'Edit Booking' : 'Add New Booking'}
          </Text>
          <ScrollView contentContainerStyle={addBookingStyles.formContent}>
            <Text style={addBookingStyles.label}>Parking Name</Text>
            <TextInput
              style={addBookingStyles.input}
              placeholder="e.g., Downtown Garage"
              placeholderTextColor={Colors.text.tertiary}
              value={parkingName}
              onChangeText={setParkingName}
            />

            <Text style={addBookingStyles.label}>Address</Text>
            <TextInput
              style={addBookingStyles.input}
              placeholder="e.g., 123 Street, City"
              placeholderTextColor={Colors.text.tertiary}
              value={address}
              onChangeText={setAddress}
            />

            <Text style={addBookingStyles.label}>Date (e.g., Today, Tomorrow, 2024-12-25)</Text>
            <TextInput
              style={addBookingStyles.input}
              placeholder="e.g., Today"
              placeholderTextColor={Colors.text.tertiary}
              value={date}
              onChangeText={setDate}
            />

            <View style={addBookingStyles.row}>
              <View style={addBookingStyles.halfWidth}>
                <Text style={addBookingStyles.label}>Start Time (e.g., 09:00 AM)</Text>
                <TextInput
                  style={addBookingStyles.input}
                  placeholder="HH:MM AM/PM"
                  placeholderTextColor={Colors.text.tertiary}
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
              <View style={addBookingStyles.spacer} />
              <View style={addBookingStyles.halfWidth}>
                <Text style={addBookingStyles.label}>End Time (Optional)</Text>
                <TextInput
                  style={addBookingStyles.input}
                  placeholder="HH:MM AM/PM"
                  placeholderTextColor={Colors.text.tertiary}
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
            </View>

            <Text style={addBookingStyles.label}>Price (e.g., $2.50/hr or $10.00)</Text>
            <TextInput
              style={addBookingStyles.input}
              placeholder="$X.XX"
              placeholderTextColor={Colors.text.tertiary}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <Text style={addBookingStyles.label}>Status</Text>
            <View style={addBookingStyles.statusPicker}>
              {['upcoming', 'active', 'completed'].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    addBookingStyles.statusOption,
                    status === s && { backgroundColor: Colors.primary[100] },
                  ]}
                  onPress={() => setStatus(s as 'active' | 'completed' | 'upcoming')}
                >
                  <Text
                    style={[
                      addBookingStyles.statusOptionText,
                      status === s && { color: Colors.primary[700], fontWeight: 'bold' },
                    ]}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {status === 'active' && (
              <>
                <Text style={addBookingStyles.label}>Duration (e.g., 2h 15m)</Text>
                <TextInput
                  style={addBookingStyles.input}
                  placeholder="e.g., 2h 15m"
                  placeholderTextColor={Colors.text.tertiary}
                  value={duration}
                  onChangeText={setDuration}
                />
              </>
            )}

            <Button
              title={initialBooking ? 'Save Changes' : 'Add Booking'}
              variant="primary"
              size="large"
              onPress={handleSave}
              style={addBookingStyles.saveButton}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const addBookingStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%', // Limit height for scrollability
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    padding: 20,
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
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  formContent: {
    paddingBottom: 20, // Give some padding at the bottom of the scroll view
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfWidth: {
    width: '48%',
  },
  spacer: {
    width: '4%',
  },
  statusPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.neutral[100],
    borderRadius: 10,
    marginBottom: 15,
    padding: 5,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusOptionText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  saveButton: {
    marginTop: 20,
  },
});