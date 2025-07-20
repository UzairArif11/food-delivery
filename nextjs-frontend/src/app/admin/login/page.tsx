import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Admin login portal for food delivery management system.',
  robots: 'noindex, nofollow', // Don't index admin pages
};

const AdminLoginContent = dynamic(() => import('@/components/admin/AdminLoginContent'), { ssr: false });

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminLoginContent />
    </div>
  );
}
