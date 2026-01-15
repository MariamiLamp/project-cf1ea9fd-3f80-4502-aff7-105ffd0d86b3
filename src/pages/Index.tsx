import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "./LandingPage";
import UserDashboard from "./UserDashboard";

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <UserDashboard />;
};

export default Index;
