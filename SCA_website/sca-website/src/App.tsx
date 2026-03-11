import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Background from './components/common/Background';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Awards from './pages/Awards';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// HashRouter 사용 - GitHub Pages SPA 새로고침 문제 해결
function App() {
  return (
    <HashRouter>
      {/* 전역 배경 */}
      <Background />
      
      <div className="min-h-screen flex flex-col relative z-10">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/members" element={<Members />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
