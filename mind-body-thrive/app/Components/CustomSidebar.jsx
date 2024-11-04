import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function CustomSidebar() {
 

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 flex flex-col p-4">
      {/* Logo / Home Link */}
      <Link href="/" className="text-2xl font-bold text-teal-600">
        MindBodyThrive
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
   
        <Link href="/dashboard" className="text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl">
        Dashboard
        </Link>
        <Link href="/tracking" className={`text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl`}>
          Tracking
        </Link>
        <Link href="/groups" className={`text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl hover:text-bold`}>
          Groups
        </Link>
        <Link href="/support" className={`text-lg hover:text-teal-600 p-5 mb-1 hover:bg-gray-100 hover:rounded-lg hover:text-xl`}>
          Support
        </Link>
       

        <Link href="#" className={`text-lg hover:text-teal-600  p-5 mb-1 `}>
          <UserButton />
        </Link>
      </nav>
    </aside>
  );
}
