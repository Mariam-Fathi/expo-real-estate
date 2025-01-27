import { getCurrentUser } from "@/lib/appwrite";
import { create } from "zustand";

interface StoreType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  fetchCurrentUser: () => void;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
const useAuthStore = create<StoreType>((set) => ({
  isAuthenticated: false,
  loading: false,
  user: null,
  fetchCurrentUser: async () => {
    set({ loading: true });
    try {
      const currentUser = await getCurrentUser();
      set({
        user: currentUser,
        isAuthenticated: !!currentUser,
        loading: true,
      });
    } catch (error) {
      console.log(error);
      set({ loading: true });
    }
  },
}));
