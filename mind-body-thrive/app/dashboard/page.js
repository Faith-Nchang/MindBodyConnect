import Sidebar from '../components/Sidebar';
import { UserButton } from '@clerk/nextjs';

export default function Dashboard() {
    return (
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome to your dashboard! This is where you can manage your activities.</p>
          <UserButton />
        </main>
      </div>
    );
  }