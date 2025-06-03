import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';
import Apply from './pages/Apply';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import SecondLayout from './layouts/SecondLayout';
import Links from './pages/Links';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
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
    </Router>
  );
};

export default App