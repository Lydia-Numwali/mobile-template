import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  // Animated, // Not used in the provided code, can be removed if not needed
} from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '@/components/layout/Container'; // Assuming path
import Colors from '@/constants/Colors'; // Assuming path
import { Search, Car, Clock, Bookmark, BookmarkCheck, Bell, Locate } from 'lucide-react-native';
// import { Input } from '@/components/Input'; // Not used, can be removed
import { LinearGradient } from 'expo-linear-gradient';
import { useSearchStore } from '@/store/searchStore'; // Assuming path
import { useBookmarkStore } from '@/store/bookmarkStore'; // Path to your new store

// Assuming ParkingLocation interface is defined in bookmarkStore or globally
interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  available: number;
  image: string;
  // isFavorite: boolean; // This will now be derived from the bookmark store
}

const initialParkingLocations: ParkingLocation[] = [
  {
    id: '1',
    name: 'Central City Parking',
    address: '123 Main St, Downtown',
    distance: '0.5 km',
    price: '$2.50/hr',
    available: 12,
    image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Westside Mall Parking',
    address: '456 Market Ave, Westside',
    distance: '1.2 km',
    price: '$3.00/hr',
    available: 8,
    image: 'https://images.pexels.com/photos/1804035/pexels-photo-1804035.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    name: 'Harbor View Parking',
    address: '789 Ocean Blvd, Seaside',
    distance: '2.4 km',
    price: '$2.00/hr',
    available: 25,
    image: 'https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  // const { searchQuery, setSearchQuery } = useSearchStore(); // searchQuery not used here
  const { toggleBookmark, isBookmarked } = useBookmarkStore();

  // You might fetch locations or use a static list
  const [locations, setLocations] = useState(initialParkingLocations);

  const handleSearchFocus = () => {
    router.push('/explore');
  };

  // The toggleFavorite function now uses the store
  const handleToggleFavorite = (location: ParkingLocation) => {
    toggleBookmark(location);
  };

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning 🌤️</Text>
            <Text style={styles.name}>Johan Liebert</Text>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              style={styles.iconButton}
            >
              <Bell size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={styles.avatarContainer}
            >
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                style={styles.avatar}
                onError={(e) => console.log('Failed to load avatar image', e.nativeEvent.error)}
              />
            </TouchableOpacity>
          </View>
        </View>

       

        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={[Colors.primary[600], Colors.primary[800]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Save 20% Today!</Text>
              <Text style={styles.bannerText}>Use code PARK20 for all bookings</Text>
            </View>
          </LinearGradient>
        </View>
        
        
        <Pressable onPress={() => router.push('/explore')} style={styles.locationBanner}>
          <Locate size={20} color={Colors.primary[700]} />
          <Text style={styles.locationText}>Find parking near your current location</Text>
        </Pressable>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/explore')}
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.primary[500] }]}>
                <Car size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Find Parking</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/tickets')} // Assuming you have a bookings route
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.secondary[500] }]}>
                <Clock size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/bookmarks')} // Navigate to bookmarks screen
            >
              <View style={[styles.actionIcon, { backgroundColor: Colors.accent[500] }]}>
                <BookmarkCheck size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Saved</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Parking</Text>
          {locations.map(location => (
            <Pressable
              key={location.id}
              style={styles.parkingCard}
              // onPress={() => router.push(`/parking-details/${location.id}`)} // Example route
            >
              <Image 
                source={{ uri: location.image }} 
                style={styles.parkingImage} 
                onError={(e) => console.log(`Failed to load image for ${location.name}`, e.nativeEvent.error)}
              />
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleToggleFavorite(location)}
              >
                {isBookmarked(location.id) ? (
                  <BookmarkCheck size={20} color={Colors.primary[500]} fill={Colors.primary[100]} />
                ) : (
                  <Bookmark size={20} color={Colors.neutral[500]} />
                )}
              </TouchableOpacity>
              <View style={styles.parkingInfo}>
                <Text style={styles.parkingName}>{location.name}</Text>
                <Text style={styles.parkingAddress}>{location.address}</Text>
                <View style={styles.parkingDetails}>
                  <Text style={styles.parkingDistance}>{location.distance}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.parkingPrice}>{location.price}</Text>
                </View>
                <View style={styles.availableContainer}>
                  <Text style={styles.availableText}>
                    {location.available} spots available
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    paddingTop: 16, // Adjust as per your safe area needs
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular', // Example: ensure fonts are loaded
    color: Colors.text.secondary,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold', // Example
    color: Colors.text.primary,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular', // Example
    color: Colors.text.tertiary,
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  locationText: {
    marginLeft: 12,
    fontSize: 14,
    color: Colors.primary[700],
    fontFamily: 'Poppins-Medium', // Example
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold', // Example
    color: Colors.text.primary,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Better distribution
  },
  actionButton: {
    alignItems: 'center',
    width: '30%', // Adjust if needed
  },
  actionIcon: {
    width: 60, // Slightly larger
    height: 60, // Slightly larger
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium', // Example
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  bannerContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    // height: 140, // Height can be dynamic or fixed
    paddingVertical: 20, // Added padding for content
  },
  bannerContent: {
    paddingHorizontal: 20, // Added padding for content
    alignItems: 'flex-start', // Align text to start
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold', // Example
    color: Colors.neutral[50],
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular', // Example
    color: Colors.neutral[100],
  },
  parkingCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  parkingImage: {
    width: '100%',
    height: 160, // Adjusted height
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 20,
    padding: 8, // Increased padding
  },
  parkingInfo: {
    padding: 16,
  },
  parkingName: {
    fontSize: 17, // Slightly larger
    fontFamily: 'Poppins-SemiBold', // Example
    color: Colors.text.primary,
    marginBottom: 4,
  },
  parkingAddress: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular', // Example
    color: Colors.text.secondary,
    marginBottom: 10, // Adjusted spacing
  },
  parkingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  parkingDistance: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium', // Example
    color: Colors.text.tertiary,
  },
  dot: {
    width: 5, // Slightly larger
    height: 5, // Slightly larger
    borderRadius: 2.5,
    backgroundColor: Colors.text.tertiary,
    marginHorizontal: 10, // Increased spacing
  },
  parkingPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium', // Example
    color: Colors.text.tertiary,
  },
  availableContainer: {
    backgroundColor: Colors.success[50],
    paddingVertical: 6, // Adjusted padding
    paddingHorizontal: 12,
    borderRadius: 8, // Slightly less rounded
    alignSelf: 'flex-start',
  },
  availableText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium', // Example
    color: Colors.success[700],
  },
});
