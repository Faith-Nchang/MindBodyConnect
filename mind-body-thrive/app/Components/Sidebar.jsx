// src/components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
 

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 flex flex-col p-5">
      {/* Logo / Home Link */}
      <Link href="/" className="text-2xl font-bold hover:text-teal-400 mb-6">
        MindBodyThrive
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className={`text-lg hover:text-teal-600 p-5 mb-1`}>
          Dashboard;
        </Link>
        <Link href="/tracking" className={`text-lg hover:text-teal-600 p-5 mb-1`}>
          Tracking
        </Link>
        <Link href="/groups" className={`text-lg hover:text-teal-600 p-5 mb-1`}>
          Groups
        </Link>
        <Link href="/support" className={`text-lg hover:text-teal-600 p-5 mb-1`}>
          Support
        </Link>
        <Link href="/logout" className={`text-lg hover:text-teal-600 p-5 mb-1`}>
          Logout
        </Link>
      </nav>
    </aside>
  );
}
