'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const signUpClick = () => {
    router.push('/sign-up');
  };

  const loginClick = () => {
    router.push('/sign-in');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change '50' to adjust when the background appears
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`p-4 fixed top-0 left-0 w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'} text-black`}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold hover:text-teal-600">
            MindBodyThrive
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
      
          {/* <Link href="/features" className="hover:text-teal-600">Features</Link>
          <Link href="/about" className="hover:text-teal-600">About</Link>
          <Link href="/contact" className="hover:text-teal-600">Contact</Link> */}
          <SignedIn>
            <Link href="/dashboard" className="hover:text-teal-600">Dashboard </Link>
            </SignedIn>
            <SignedOut>
          <button className='bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition' onClick={signUpClick}>Signup</button>
          <button className='border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-600 hover:text-white transition' onClick={loginClick}>Login</button>
          </SignedOut>
        </div>
        <div className="md:hidden">
          <button className="text-gray-500 hover:text-teal-600 focus:outline-none">
            {/* Mobile menu icon can be added here */}
          </button>
        </div>
      </div>
    </nav>
  );
}
