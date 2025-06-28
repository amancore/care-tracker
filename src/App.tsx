
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ReportSummarizer from "./pages/ReportSummarizer";
import DoctorAI from "./pages/DoctorAI";
import MedicalHistory from "./pages/MedicalHistory";
import Reminders from "./pages/Reminders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
function AppContent() {
  const location = useLocation();
  if (location.pathname === "/") {
		return (
			<Routes>
				<Route path="/" element={<Index />} />
			</Routes>
		);
	}
  return (
    <Sidebar>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-summarizer" element={<ReportSummarizer />} />
        <Route path="/doctor-ai" element={<DoctorAI />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Sidebar>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
