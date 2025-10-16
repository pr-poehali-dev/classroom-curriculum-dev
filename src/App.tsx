
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditModeProvider } from "@/components/EditModeContext";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import AboutProject from "./pages/AboutProject";
import AboutAuthor from "./pages/AboutAuthor";
import LearningHub from "./pages/LearningHub";
import GameLoader from "./pages/GameLoader";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <EditModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<LearningHub />} />
            <Route path="/game/:topicId" element={<GameLoader />} />
            <Route path="/about-project" element={<AboutProject />} />
            <Route path="/about-author" element={<AboutAuthor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </EditModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;