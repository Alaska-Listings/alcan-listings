import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
const Index = lazy(() => import("./pages/Index"));
const PostListing = lazy(() => import("./pages/PostListing"));
const Browse = lazy(() => import("./pages/Browse"));
const ListingDetail = lazy(() => import("./pages/ListingDetail"));
const MyListings = lazy(() => import("./pages/MyListings"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Regions = lazy(() => import("./pages/Regions"));
const Categories = lazy(() => import("./pages/Categories"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminListings = lazy(() => import("./pages/admin/AdminListings"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 2, refetchOnWindowFocus: false } },
});


const PageLoader = () => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
    <div style={{width:'2rem',height:'2rem',border:'3px solid #e2e8f0',borderTopColor:'#64748b',borderRadius:'50%',animation:'spin 0.8s linear infinite'}} />
    <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post-listing" element={<PostListing />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/regions" element={<Regions />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/listings" element={<AdminListings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
              </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
