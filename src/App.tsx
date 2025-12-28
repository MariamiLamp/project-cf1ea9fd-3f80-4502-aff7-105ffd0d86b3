import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
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
import JobSeekerRegistration from "./pages/JobSeekerRegistration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="/register/jobseeker" element={<JobSeekerRegistration />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
