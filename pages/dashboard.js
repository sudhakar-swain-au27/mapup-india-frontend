import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import ManagerDashboard from '../components/ManagerDashboard';
import UserDashboard from '../components/UserDashboard';

export default function Dashboard() {
  const [role, setRole] = useState('admin'); // Default role to 'admin'

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'user':
      default:
        return <UserDashboard />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
}
