import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';

// Lazy load layouts for code splitting
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const SecondLayout = lazy(() => import('./layouts/SecondLayout'));

// Lazy load page components
const Home = lazy(() => import('./features/home/Home'));
const About = lazy(() => import('./features/about/About'));
const Post = lazy(() => import('./features/post/Post'));
const Apply = lazy(() => import('./features/apply/Apply'));
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const Links = lazy(() => import('./features/links/Links'));

// Loading spinner shown during lazy loading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#015551]"></div>
      <p className="text-[#015551] font-medium">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route element={<SecondLayout />}>
            <Route path="/post" element={<Post />} />
            <Route path="/apply/:share" element={<Apply />} />
            <Route path="/dashboard/:dashboard" element={<Dashboard />} />
            <Route path="/links/:share" element={<Links />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App