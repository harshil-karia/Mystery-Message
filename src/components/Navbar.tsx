'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import ContactUs from './ContactUs';
import { House, LogIn, User2, UserPlus } from 'lucide-react';
import { User } from 'next-auth';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const url = usePathname();

  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a className='text-xl font-bold mb-4 md:mb-0' href='/dashboard'>Mystery Message</a>
        <div className='flex items-center space-x-7'>
          {session ? (
            url === '/dashboard' ? (
              <Link className='w-full md:w-auto' href='/profile'>
                <Button title='Profile'>
                  <User2></User2>
                </Button>
              </Link>
            ) : (
              <Link className='w-full md:w-auto' href='/dashboard'>
                <Button title='dashboard'>
                  <House></House>
                </Button>
              </Link>
            )
          ) : (
            url === '/sign-in' ? (
              <Link className='w-full md:w-auto' href='/sign-up'>
                <Button title='sign-up'>
                  <UserPlus></UserPlus>
                </Button>
              </Link>
            ) : (
              <Link className='w-full md:w-auto' href='/sign-in'>
                <Button><LogIn></LogIn></Button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
