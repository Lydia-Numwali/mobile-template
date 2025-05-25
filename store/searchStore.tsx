import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  recentSearches: string[];
  setSearchQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  recentSearches: [],
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addRecentSearch: (query) => set((state) => {

    if (!query.trim() || state.recentSearches.includes(query)) {
      return state;
    }
    
    // Add the query to the beginning of the list and limit to 5 items
    const updatedSearches = [query, ...state.recentSearches].slice(0, 5);
    
    return { recentSearches: updatedSearches };
  }),
  
  clearRecentSearches: () => set({ recentSearches: [] }),
}));