import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';

import PeriodTracking from './pages/products/PeriodTracking';
import MoodMind from './pages/products/MoodMind';
import SymptomTracking from './pages/products/SymptomTracking';
import Predictions from './pages/products/Predictions';
import AskAkka from './pages/products/AskAkka';

import Library from './pages/library/Library';
import Category from './pages/library/Category';
import Article from './pages/library/Article';

import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Cookies from './pages/legal/Cookies';
import Disclaimer from './pages/legal/Disclaimer';

import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/products/period-tracking" element={<PeriodTracking />} />
        <Route path="/products/mood-mind" element={<MoodMind />} />
        <Route path="/products/symptom-tracking" element={<SymptomTracking />} />
        <Route path="/products/predictions" element={<Predictions />} />
        <Route path="/products/ask-akka" element={<AskAkka />} />

        <Route path="/health-library" element={<Library />} />
        <Route path="/health-library/:categoryId" element={<Category />} />
        <Route path="/health-library/:categoryId/:articleId" element={<Article />} />

        <Route path="/about" element={<About />} />

        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/medical-disclaimer" element={<Disclaimer />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth is full-screen, outside the marketing Layout */}
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth mode="signup" />} />
    </Routes>
  );
}
