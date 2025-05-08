import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Initialize the React Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Global toast notifications */}
      <Toaster />
      <Sonner />

      {/* Client-side routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* You can add custom routes here like */}
          {/* <Route path="/projects" element={<ProjectsPage />} /> */}
          {/* Make sure to keep this wildcard route at the bottom */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;






