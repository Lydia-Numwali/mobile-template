import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Container } from '@/components/layout/Container';
import Colors from '@/constants/Colors';
import {
  Ticket as TicketIcon,
  Clock,
  XCircle,
  CircleCheck as CheckCircle,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react-native';
import { Button } from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';
// Import the Booking interface along with the component
import { AddBookingModal, Booking } from '@/components/AddBookingModal';
import { Swipeable } from 'react-native-gesture-handler';

// Initial dummy data for tickets
const initialTickets: Booking[] = [
  {
    id: '1',
    parkingName: 'Central City Parking',
    address: '123 Main St, Downtown',
    date: 'Today',
    startTime: '09:30 AM',
    endTime: null,
    price: '$2.50/hr',
    status: 'active',
    duration: '2h 15m',
  },
  {
    id: '2',
    parkingName: 'Westside Mall Parking',
    address: '456 Market Ave, Westside',
    date: 'Tomorrow',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    price: '$6.00',
    status: 'upcoming',
  },
  {
    id: '3',
    parkingName: 'Harbor View Parking',
    address: '789 Ocean Blvd, Seaside',
    date: 'Yesterday',
    startTime: '02:00 PM',
    endTime: '04:30 PM',
    price: '$12.50',
    status: 'completed',
  },
  {
    id: '4',
    parkingName: 'Riverside Park',
    address: '789 River Road, North',
    date: '2024-06-01',
    startTime: '11:00 AM',
    endTime: '01:00 PM',
    price: '$4.00',
    status: 'upcoming',
  },
];

export default function TicketsScreen() {
  const [tickets, setTickets] = useState<Booking[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);

  // Modals visibility states
  const [ticketDetailsModalVisible, setTicketDetailsModalVisible] = useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [billModalVisible, setBillModalVisible] = useState(false);
  const [addBookingModalVisible, setAddBookingModalVisible] = useState(false);

  // Ref to close open swipeable rows
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return Colors.primary[500];
      case 'upcoming':
        return Colors.accent[500];
      case 'completed':
        return Colors.success[500];
      default:
        return Colors.neutral[500];
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case 'active':
        return Colors.primary[50];
      case 'upcoming':
        return Colors.accent[50];
      case 'completed':
        return Colors.success[50];
      default:
        return Colors.neutral[100];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  // Close any open swipeable row when another is opened
  const closeOpenSwipeables = (excludedRowId: string) => {
    Object.keys(swipeableRefs.current).forEach((id) => {
      if (id !== excludedRowId && swipeableRefs.current[id]) {
        swipeableRefs.current[id]?.close();
      }
    });
  };

  // --- Ticket Management Functions ---

  const handleTicketPress = (ticket: Booking) => {
    closeOpenSwipeables(ticket.id || ''); // Close any open swipeable
    setSelectedTicket(ticket);
    setTicketDetailsModalVisible(true);
  };

  const handleCheckout = () => {
    setTicketDetailsModalVisible(false);
    setCheckoutModalVisible(true);
  };

  const confirmCheckout = () => {
    if (selectedTicket) {
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === selectedTicket.id ? { ...t, status: 'completed', endTime: 'Now', price: '$5.00' } : t
        )
      );
    }
    setCheckoutModalVisible(false);
    setBillModalVisible(true);
  };

  const closeAllModals = () => {
    setTicketDetailsModalVisible(false);
    setCheckoutModalVisible(false);
    setBillModalVisible(false);
    setAddBookingModalVisible(false);
    setSelectedTicket(null); // Clear selected ticket
  };

  // --- Add/Update Logic ---
  const handleSaveBooking = (booking: Booking) => {
    if (booking.id) {
      // It's an update
      setTickets((prev) =>
        prev.map((t) => (t.id === booking.id ? booking : t))
      );
    } else {
      // It's a new booking
      const newId = Date.now().toString(); // Simple unique ID for demo
      setTickets((prev) => [{ ...booking, id: newId }, ...prev]);
    }
    closeAllModals();
  };

  const openAddBookingModal = () => {
    setSelectedTicket(null); // Clear selected ticket for add mode
    setAddBookingModalVisible(true);
  };

  const openEditBookingModal = (ticket: Booking) => {
    setSelectedTicket(ticket); // Set ticket for editing
    setAddBookingModalVisible(true);
    closeOpenSwipeables(ticket.id || ''); // Close swipeable after action
  };

  // --- Delete Logic ---
  const handleDeleteBooking = (ticketId: string) => {
    closeOpenSwipeables(ticketId); // Close swipeable immediately

    Alert.alert(
      'Delete Booking',
      'Are you sure you want to delete this parking booking?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // No action needed for cancel, swipeable will remain open
          }
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTickets((prev) => prev.filter((t) => t.id !== ticketId));
            setSelectedTicket(null); // Clear if deleted ticket was selected
            closeAllModals(); // Ensure no modals related to this ticket are open
          },
        },
      ],
      { cancelable: true }
    );
  };

  // --- Swipeable Row Renderers ---
  const renderRightActions = (progress: any, dragX: any, item: Booking) => {
    return (
      <View style={styles.swipeActionsContainer}>
        <TouchableOpacity
          style={[styles.swipeButton, styles.updateButton]}
          onPress={() => openEditBookingModal(item)}
        >
          <Edit2 size={24} color="#FFF" />
          <Text style={styles.swipeButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.swipeButton, styles.deleteButton]}
          onPress={() => handleDeleteBooking(item.id || '')} // Ensure ID is passed
        >
          <Trash2 size={24} color="#FFF" />
          <Text style={styles.swipeButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTicket = ({ item }: { item: Booking }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id || ''] = ref)} // Use item.id as key
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
      onSwipeableWillOpen={() => closeOpenSwipeables(item.id || '')}
      rightThreshold={40}
    >
      <TouchableOpacity
        style={styles.ticketItem}
        onPress={() => handleTicketPress(item)}
      >
        <View style={styles.ticketHeader}>
          <View style={styles.ticketIconContainer}>
            <TicketIcon size={24} color={Colors.primary[500]} />
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusBackground(item.status) },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <View style={styles.ticketBody}>
          <Text style={styles.parkingName}>{item.parkingName}</Text>
          <Text style={styles.address}>{item.address}</Text>

          <View style={styles.ticketDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{item.date}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>
                {item.startTime} {item.endTime ? `- ${item.endTime}` : ''}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>{item.price}</Text>
            </View>
          </View>

          {item.status === 'active' && (
            <View style={styles.durationContainer}>
              <Clock size={16} color={Colors.primary[500]} />
              <Text style={styles.durationText}>Duration: {item.duration}</Text>
            </View>
          )}
        </View>

        <View style={styles.viewMore}>
          <Text style={styles.viewMoreText}>View Details</Text>
          <ChevronRight size={16} color={Colors.primary[500]} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddBookingModal}>
          <Plus size={24} color={Colors.primary[500]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tickets}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id || Math.random().toString()} // Fallback for key if ID is missing (shouldn't be in real app)
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Ticket Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ticketDetailsModalVisible}
        onRequestClose={() => setTicketDetailsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTicketDetailsModalVisible(false)}
            >
              <XCircle size={24} color={Colors.neutral[500]} />
            </TouchableOpacity>

            <LinearGradient
              colors={[Colors.primary[600], Colors.primary[800]]}
              style={styles.ticketDetailsHeader}
            >
              <TicketIcon size={40} color="#FFFFFF" />
              <Text style={styles.ticketDetailsTitle}>Parking Ticket</Text>

              <View style={styles.ticketDetailsStatus}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: selectedTicket
                          ? getStatusColor(selectedTicket.status)
                          : Colors.primary[500],
                        fontSize: 14,
                      },
                    ]}
                  >
                    {selectedTicket ? getStatusText(selectedTicket.status) : ''}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.ticketDetailsBody}>
              <Text style={styles.ticketDetailsParkingName}>
                {selectedTicket?.parkingName}
              </Text>
              <Text style={styles.ticketDetailsAddress}>
                {selectedTicket?.address}
              </Text>

              <View style={styles.ticketDetailsRow}>
                <View style={styles.ticketDetailsColumn}>
                  <Text style={styles.ticketDetailsLabel}>Date</Text>
                  <Text style={styles.ticketDetailsValue}>
                    {selectedTicket?.date}
                  </Text>
                </View>

                <View style={styles.ticketDetailsColumn}>
                  <Text style={styles.ticketDetailsLabel}>Start Time</Text>
                  <Text style={styles.ticketDetailsValue}>
                    {selectedTicket?.startTime}
                  </Text>
                </View>

                <View style={styles.ticketDetailsColumn}>
                  <Text style={styles.ticketDetailsLabel}>End Time</Text>
                  <Text style={styles.ticketDetailsValue}>
                    {selectedTicket?.endTime || 'In progress'}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.ticketPriceRow}>
                <Text style={styles.ticketPriceLabel}>Price</Text>
                <Text style={styles.ticketPriceValue}>
                  {selectedTicket?.price}
                </Text>
              </View>

              {selectedTicket?.status === 'active' && (
                <View style={styles.durationDetails}>
                  <Clock size={20} color={Colors.primary[500]} />
                  <Text style={styles.durationDetailsText}>
                    Current duration: {selectedTicket.duration}
                  </Text>
                </View>
              )}

              {selectedTicket?.status === 'active' && (
                <Button
                  title="Check Out"
                  variant="primary"
                  size="large"
                  onPress={handleCheckout}
                  style={styles.checkoutButton}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Checkout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={checkoutModalVisible}
        onRequestClose={() => setCheckoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.checkoutModalContent}>
            <Text style={styles.checkoutTitle}>Confirm Check Out</Text>
            <Text style={styles.checkoutMessage}>
              Are you sure you want to end your parking session at{' '}
              {selectedTicket?.parkingName}?
            </Text>

            <View style={styles.checkoutDetails}>
              <Text style={styles.checkoutLabel}>Duration:</Text>
              <Text style={styles.checkoutValue}>
                {selectedTicket?.duration}
              </Text>

              <Text style={styles.checkoutLabel}>Estimated Cost:</Text>
              <Text style={styles.checkoutValue}>$5.00</Text>
            </View>

            <View style={styles.checkoutButtons}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setCheckoutModalVisible(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Confirm"
                variant="primary"
                onPress={confirmCheckout}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Bill Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={billModalVisible}
        onRequestClose={() => setBillModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.billModalContent}>
            <View style={styles.billHeader}>
              <CheckCircle size={60} color={Colors.success[500]} />
              <Text style={styles.billTitle}>Checkout Complete</Text>
            </View>

            <View style={styles.billDetails}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Parking Location</Text>
                <Text style={styles.billValue}>
                  {selectedTicket?.parkingName}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Date</Text>
                <Text style={styles.billValue}>{selectedTicket?.date}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Duration</Text>
                <Text style={styles.billValue}>{selectedTicket?.duration}</Text>
              </View>

              <View style={styles.billDivider} />

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Base Fee</Text>
                <Text style={styles.billValue}>$4.50</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Service Fee</Text>
                <Text style={styles.billValue}>$0.50</Text>
              </View>

              <View style={styles.billTotal}>
                <Text style={styles.billTotalLabel}>Total</Text>
                <Text style={styles.billTotalValue}>$5.00</Text>
              </View>
            </View>

            <Button
              title="Close"
              variant="primary"
              size="large"
              onPress={closeAllModals}
              style={styles.billButton}
            />
          </View>
        </View>
      </Modal>

      {/* Add/Edit Booking Modal */}
      <AddBookingModal
        isVisible={addBookingModalVisible}
        onClose={closeAllModals}
        onSave={handleSaveBooking} // Consolidated save handler
        initialBooking={selectedTicket} // Pass selectedTicket for editing
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  addButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: Colors.primary[50],
  },
  listContainer: {
    padding: 16,
  },
  ticketItem: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: '500',
    fontSize: 12,
  },
  ticketBody: {
    marginBottom: 12,
  },
  parkingName: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  address: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  detailValue: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.text.primary,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  durationText: {
    fontWeight: '500',
    fontSize: 12,
    color: Colors.primary[700],
    marginLeft: 6,
  },
  viewMore: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewMoreText: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  // Modals Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.background.primary,
    borderRadius: 24,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  ticketDetailsHeader: {
    padding: 24,
    alignItems: 'center',
  },
  ticketDetailsTitle: {
    fontWeight: '700',
    fontSize: 24,
    color: Colors.neutral[50],
    marginTop: 12,
    marginBottom: 16,
  },
  ticketDetailsStatus: {
    alignItems: 'center',
  },
  ticketDetailsBody: {
    padding: 24,
  },
  ticketDetailsParkingName: {
    fontWeight: '600',
    fontSize: 18,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  ticketDetailsAddress: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  ticketDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  ticketDetailsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  ticketDetailsLabel: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  ticketDetailsValue: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.text.primary,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    marginVertical: 20,
  },
  ticketPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketPriceLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.text.primary,
  },
  ticketPriceValue: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.primary[500],
  },
  durationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.primary[50],
    borderRadius: 10,
    marginBottom: 20,
  },
  durationDetailsText: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.primary[700],
    marginLeft: 8,
  },
  checkoutButton: {
    marginTop: 10,
  },
  checkoutModalContent: {
    width: '85%',
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 15,
  },
  checkoutMessage: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  checkoutDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.neutral[50],
    borderRadius: 10,
  },
  checkoutLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  checkoutValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  checkoutButtons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  billModalContent: {
    width: '85%',
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  billHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  billTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.success[600],
    marginTop: 10,
  },
  billDetails: {
    width: '100%',
    marginBottom: 20,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  billLabel: {
    fontSize: 15,
    color: Colors.text.secondary,
  },
  billValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  billDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    marginVertical: 10,
  },
  billTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    marginTop: 10,
  },
  billTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  billTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary[600],
  },
  billButton: {
    marginTop: 10,
    width: '100%',
  },
  // Swipeable actions
  swipeActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20, // Adjust as needed
    backgroundColor: Colors.neutral[100], // Background for swipe area
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden', // Ensure buttons don't bleed out
  },
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80, // Width of each button
    height: '100%', // Take full height of the row
    paddingVertical: 10,
  },
  updateButton: {
    backgroundColor: Colors.accent[500], // Example color for edit
  },
  deleteButton: {
    backgroundColor: Colors.primary[500], // Example color for delete
    borderTopRightRadius: 16, // Match parent border radius
    borderBottomRightRadius: 16, // Match parent border radius
  },
  swipeButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginTop: 5,
    fontSize: 12,
  },
});