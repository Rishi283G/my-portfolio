import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/customCursor";
import mobileRippleEffect from "./components/ui/mobileRippleFallback";

const queryClient = new QueryClient();

function App() {
  // Add useEffect to call mobileRippleEffect after page load
  useEffect(() => {
    mobileRippleEffect();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;