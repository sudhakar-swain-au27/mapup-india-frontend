import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  useEffect(() => {
    if (!isLoading && (!session || session.user.role !== 'admin')) {
      router.replace('/'); // Use replace to prevent going back to this page in history
    }
  }, [session, isLoading, router]);

  if (isLoading) return <p>Loading...</p>; // Show loading message or spinner

  // Render null if user is not an admin (in case of any async issues)
  if (session?.user.role !== 'admin') return null;

  return <AdminDashboard />;
}
