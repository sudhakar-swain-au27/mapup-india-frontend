import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session?.user.role !== 'admin') {
      router.push('/');                                              // Redirect to homepage if not admin
    }
  }, [session, loading]);

  if (loading || session?.user.role !== 'admin') return null;

  return <AdminDashboard />;
}
