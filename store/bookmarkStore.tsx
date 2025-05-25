import {create} from 'zustand';

// Define the structure of a parking location, assuming it's similar to HomeScreen
interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  distance?: string; // Optional as it might not be needed for bookmarks screen directly
  price?: string;    // Optional
  available?: number; // Optional
  image: string;
  // isFavorite is managed by the presence in the savedLocations array
}

interface BookmarkState {
  savedLocations: ParkingLocation[];
  addBookmark: (location: ParkingLocation) => void;
  removeBookmark: (locationId: string) => void;
  isBookmarked: (locationId:string) => boolean;
  toggleBookmark: (location: ParkingLocation) => void;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  savedLocations: [],
  addBookmark: (location) =>
    set((state) => ({
      savedLocations: [...state.savedLocations, location],
    })),
  removeBookmark: (locationId) =>
    set((state) => ({
      savedLocations: state.savedLocations.filter((loc) => loc.id !== locationId),
    })),
  isBookmarked: (locationId) => {
    const state = get();
    return state.savedLocations.some(loc => loc.id === locationId);
  },
  toggleBookmark: (location) => {
    const { savedLocations, addBookmark, removeBookmark } = get();
    const isCurrentlyBookmarked = savedLocations.some(loc => loc.id === location.id);
    if (isCurrentlyBookmarked) {
      removeBookmark(location.id);
    } else {
      // Ensure we only store necessary data or the full object if needed on bookmark screen
      const bookmarkData: ParkingLocation = {
        id: location.id,
        name: location.name,
        address: location.address,
        image: location.image,
        price: location.price, // Include if you want to show price on bookmarks
        distance: location.distance, // Include if you want to show distance
      };
      addBookmark(bookmarkData);
    }
  }
}));
