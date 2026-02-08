import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";
import CVCheck from "./pages/CVCheck";
import CoverLetter from "./pages/CoverLetter";
import Jobs from "./pages/Jobs";
import Interview from "./pages/Interview";
import CareerPath from "./pages/CareerPath";
import CVBuilder from "./pages/CVBuilder";
import Subscription from "./pages/Subscription";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import CandidateProfile from "./pages/CandidateProfile";
import Register from "./pages/Register";
import JobSeekerRegistration from "./pages/JobSeekerRegistration";
import CompanyRegistration from "./pages/CompanyRegistration";
import HRRegistration from "./pages/HRRegistration";
import HRDashboard from "./pages/HRDashboard";
import TemplatesMarketplace from "./pages/TemplatesMarketplace";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PostsPlanner from "./pages/PostsPlanner";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import ContactUs from "./pages/ContactUs";
import ProfileViews from "./pages/ProfileViews";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="hr-platform-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/cv-check" element={<CVCheck />} />
              <Route path="/cover-letter" element={<CoverLetter />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/career-path" element={<CareerPath />} />
              <Route path="/cv-builder" element={<CVBuilder />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/company" element={<CompanyDashboard />} />
              <Route path="/candidate/:id" element={<CandidateProfile />} />
              <Route path="/profile-views" element={<ProfileViews />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/register/jobseeker"
                element={<JobSeekerRegistration />}
              />
              <Route
                path="/register/company"
                element={<CompanyRegistration />}
              />
              <Route path="/register/hr" element={<HRRegistration />} />
              <Route path="/hr" element={<HRDashboard />} />
              <Route path="/templates" element={<TemplatesMarketplace />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/posts-planner" element={<PostsPlanner />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
