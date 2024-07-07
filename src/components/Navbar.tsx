'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { User } from 'next-auth';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const url = usePathname();

  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a className='text-xl font-bold mb-4 md:mb-0' href='/dashboard'>Mystrey Message</a>
        {
          session ? (
            url === '/dashboard' ? (
              <Link className='w-full md:w-auto' href='/profile'>
                <Button>Profile</Button>
              </Link>
            ) : (
              <Link className='w-full md:w-auto' href='/dashboard'>
                <Button>Dashboard</Button>
              </Link>
            )
          ) : (
            <Link className='w-full md:w-auto' href='/sign-in'>
              <Button>Login</Button>
            </Link>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
