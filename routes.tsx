import type { ReactNode } from 'react';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import ModuleDetail from './pages/ModuleDetail';
import Dashboard from './pages/Dashboard';
import Certificate from './pages/Certificate';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    visible: true
  },
  {
    name: 'Courses',
    path: '/courses',
    element: <Courses />,
    visible: true
  },
  {
    name: 'Course Detail',
    path: '/courses/:courseId',
    element: <CourseDetail />,
    visible: false
  },
  {
    name: 'Module Detail',
    path: '/modules/:moduleId',
    element: <ModuleDetail />,
    visible: false
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    visible: false
  },
  {
    name: 'Certificate',
    path: '/certificate',
    element: <Certificate />,
    visible: false
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
    visible: true
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <AdminDashboard />,
    visible: false
  }
];

export default routes;