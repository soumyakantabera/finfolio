import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { loadData, saveData } from './data/portfolioData';
import Navbar from './components/Navbar';
import MobileHeader from './mobile/MobileHeader';
import ResponsiveRoute from './mobile/ResponsiveRoute';
import useIsMobile from './mobile/useIsMobile';
import './index.css';

// Lazy-load desktop page components
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const CustomPage = React.lazy(() => import('./pages/CustomPage'));
const AdminLogin = React.lazy(() => import('./admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard'));

// Lazy-load mobile page components
const MobileHome = React.lazy(() => import('./mobile/MobileHome'));
const MobileProjects = React.lazy(() => import('./mobile/MobileProjects'));
const MobileAbout = React.lazy(() => import('./mobile/MobileAbout'));
const MobileContact = React.lazy(() => import('./mobile/MobileContact'));
const MobileProjectDetail = React.lazy(() => import('./mobile/MobileProjectDetail'));

function AppNav({ data, isAdmin }) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHeader data={data} /> : <Navbar data={data} isAdmin={isAdmin} />;
}

export default function App() {
  const [data, setData] = useState(() => loadData());
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem('finfolio_admin') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('finfolio_admin', isAdmin);
  }, [isAdmin]);

  const handleDataUpdate = (newData) => {
    saveData(newData);
    setData(newData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <AppNav data={data} isAdmin={isAdmin} />
        <React.Suspense fallback={<div />}>
          <Routes>
            <Route path="/" element={
              <ResponsiveRoute
                desktop={<Home data={data} />}
                mobile={<MobileHome data={data} />}
              />
            } />
            <Route path="/projects" element={
              <ResponsiveRoute
                desktop={<Projects data={data} />}
                mobile={<MobileProjects data={data} />}
              />
            } />
            <Route path="/projects/:slug" element={
              <ResponsiveRoute
                desktop={<ProjectDetail data={data} />}
                mobile={<MobileProjectDetail data={data} />}
              />
            } />
            <Route path="/about" element={
              <ResponsiveRoute
                desktop={<About data={data} />}
                mobile={<MobileAbout data={data} />}
              />
            } />
            <Route path="/contact" element={
              <ResponsiveRoute
                desktop={<Contact data={data} />}
                mobile={<MobileContact data={data} />}
              />
            } />
            <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminDashboard
                  data={data}
                  setData={handleDataUpdate}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route path="/page/:slug" element={<CustomPage data={data} />} />
          </Routes>
        </React.Suspense>
      </HashRouter>
    </ThemeProvider>
  );
}
