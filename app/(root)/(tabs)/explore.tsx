import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Container } from '@/components/layout/Container';
import Colors from '@/constants/Colors';
import { Search, MapPin, Car, Filter } from 'lucide-react-native';
import { Input } from '@/components/Input';
import { useSearchStore } from '@/store/searchStore';
import { useRouter } from 'expo-router';
import { BookingModal } from '@/components/BookingModal'; // Import the new modal component
import { Button } from '@/components/Button'; // Make sure you import your Button component

const { width } = Dimensions.get('window');

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  available: number;
  image: string;
  rating: number;
  features: string[];
  open24Hours: boolean;
  keywords: string[];
}

const parkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'Central City Parking',
    address: '123 Main St, Downtown',
    distance: '0.5 km',
    price: '$2.50/hr',
    available: 12,
    image:
      'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    features: ['Covered', 'Security', 'EV Charging'],
    open24Hours: true,
    keywords: ['downtown', 'central', 'city', 'main street'],
  },
  {
    id: '2',
    name: 'Westside Mall Parking',
    address: '456 Market Ave, Westside',
    distance: '1.2 km',
    price: '$3.00/hr',
    available: 8,
    image:
      'https://images.pexels.com/photos/1804035/pexels-photo-1804035.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    features: ['Covered', 'Security'],
    open24Hours: false,
    keywords: ['mall', 'westside', 'shopping', 'market'],
  },
  {
    id: '3',
    name: 'Harbor View Parking',
    address: '789 Ocean Blvd, Seaside',
    distance: '2.4 km',
    price: '$2.00/hr',
    available: 25,
    image:
      'https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    features: ['Covered', 'Security', 'EV Charging', 'Valet'],
    open24Hours: true,
    keywords: ['harbor', 'ocean', 'seaside', 'beach', 'view'],
  },
  {
    id: '4',
    name: 'Downtown Plaza Parking',
    address: '321 Center St, Downtown',
    distance: '0.8 km',
    price: '$2.75/hr',
    available: 5,
    image:
      'https://images.pexels.com/photos/2078146/pexels-photo-2078146.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.0,
    features: ['Security'],
    open24Hours: false,
    keywords: ['downtown', 'plaza', 'center', 'business'],
  },
];

// Modified ParkingCard to include a "Book Now" button
const ParkingCard = ({
  spot,
  onViewDetails, // For navigating to details page (if applicable)
  onBookNow,      // For opening the booking modal
}: {
  spot: ParkingSpot;
  onViewDetails: (spot: ParkingSpot) => void;
  onBookNow: (spot: ParkingSpot) => void;
}) => (
  <TouchableOpacity style={styles.parkingSpotCard} onPress={() => onViewDetails(spot)} activeOpacity={0.8}>
    <View style={styles.cardContent}>
      <Image source={{ uri: spot.image }} style={styles.parkingSpotImage} />
      <View style={styles.parkingSpotInfo}>
        <Text style={styles.parkingSpotName} numberOfLines={1}>
          {spot.name}
        </Text>
        <View style={styles.locationContainer}>
          <MapPin size={12} color={Colors.text.tertiary} />
          <Text style={styles.parkingSpotAddress}>{spot.distance} away</Text>
        </View>
        <View style={styles.parkingSpotDetails}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{spot.price}</Text>
          </View>
          <View style={styles.availableContainer}>
            <Car size={12} color={Colors.success[700]} />
            <Text style={styles.availableText}>{spot.available} spots</Text>
          </View>
        </View>
        {/* New: Book Now button */}
        <Button
          title="Book Now"
          variant="primary" // Assuming you have a 'primary' variant
          size="small"     // Adjust size as needed for card
          onPress={() => onBookNow(spot)}
          style={styles.bookNowButtonInCard}
        />
      </View>
    </View>
  </TouchableOpacity>
);

export default function ExploreScreen() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [filteredSpots, setFilteredSpots] = useState<ParkingSpot[]>(parkingSpots);

  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState<ParkingSpot | null>(null);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      const filtered = parkingSpots.filter(
        (spot) =>
          spot.name.toLowerCase().includes(text.toLowerCase()) ||
          spot.address.toLowerCase().includes(text.toLowerCase()) ||
          spot.keywords.some(keyword => keyword.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredSpots(filtered);
    } else {
      setFilteredSpots(parkingSpots);
    }
  };

  // Function to open the modal with the selected spot's data when "Book Now" is pressed
  const handleBookSpotPress = (spot: ParkingSpot) => {
    setSelectedParkingSpot(spot);
    setIsBookingModalVisible(true);
  };

  // Function to handle the full card press (e.g., navigate to a detailed spot page)
  const handleViewDetails = (spot: ParkingSpot) => {
    // You can implement navigation to a detailed parking spot screen here
    console.log("View details for:", spot.name);
    // Example: router.push(`/spotDetails/${spot.id}`);
  };

  const handleConfirmBooking = (spotId: string) => {
    setIsBookingModalVisible(false); // Close the modal
    console.log(`Booking confirmed for spot ID: ${spotId}`);
    // Here, you would typically navigate to a confirmation page or perform API calls
    // router.push(`/booking/${spotId}`); // Example: Navigate to a dedicated booking confirmation page
    alert(`Booking confirmed for Spot ID: ${spotId}`); // For demonstration
  };

  const firstFilteredSpot = filteredSpots.length > 0 ? filteredSpots[0] : null;

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Find Parking</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Input
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search for location"
            icon={<Search size={20} color={Colors.text.tertiary} />}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Top filtered single spot card or no results */}
      <View style={styles.filteredSpotContainer}>
        {firstFilteredSpot ? (
          <ParkingCard
            spot={firstFilteredSpot}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookSpotPress}
          />
        ) : (
          searchQuery.trim() !== '' && (
            <View style={styles.noResultsContainer}>
              <Car size={48} color={Colors.text.tertiary} />
              <Text style={styles.noResultsText}>
                No parking spots found for "{searchQuery}"
              </Text>
              <Text style={styles.noResultsSubtext}>
                Try a different search term or location
              </Text>
            </View>
          )
        )}
      </View>

      {/* Bottom full list of available parking spots */}
      <View style={styles.parkingSpotsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Parking Spots</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.parkingSpotsList}
        >
          {parkingSpots.map((spot) => (
            <ParkingCard
              key={spot.id}
              spot={spot}
              onViewDetails={handleViewDetails} // General card tap
              onBookNow={handleBookSpotPress}   // "Book Now" button tap
            />
          ))}
        </ScrollView>
      </View>

      {/* The Booking Modal */}
      <BookingModal
        isVisible={isBookingModalVisible}
        onClose={() => setIsBookingModalVisible(false)}
        parkingSpot={selectedParkingSpot} // Pass the currently selected spot
        onBookNow={handleConfirmBooking}
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    width: 24, // Placeholder, ideally this would be an icon
    height: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchInputWrapper: {
    flex: 1,
  },
  filterButton: {
    width: 56,
    height: 56,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  filteredSpotContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  parkingSpotsContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary[500],
  },
  parkingSpotsList: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  // Updated card styles for horizontal layout
  parkingSpotCard: {
    width: 320,
    borderRadius: 16,
    backgroundColor: Colors.background.primary,
    marginRight: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parkingSpotImage: {
    width: '45%',
    height: 120,
    borderRadius: 8,
    margin:4
  },
  parkingSpotInfo: {
    flex: 1,
    padding: 12,
  },
  parkingSpotName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  parkingSpotAddress: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginLeft: 4,
  },
  parkingSpotDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Added margin to separate from button
  },
  priceContainer: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  price: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary[700],
  },
  availableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availableText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.success[700],
    marginLeft: 4,
  },
  bookNowButtonInCard: {
    marginTop: 8, // Adjust spacing from other elements
    alignSelf: 'flex-start', // Align button to the start
    width: '90%', // Make button fit within the card info area
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});