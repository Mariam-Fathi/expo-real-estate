import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => void;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const AuthContext = createContext<GlobalContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        console.log("context ...", currentUser);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("context ...", error);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const isLogged = !!user;

  return (
    <AuthContext.Provider value={{ user, refetch, isLogged, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
