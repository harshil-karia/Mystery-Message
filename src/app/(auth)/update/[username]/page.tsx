"use client"
import ChangeUsernameForm from '@/components/ChangeUsernameForm'
import { User } from '@/model/User';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
const page = () => {
    const { data: session } = useSession();
    if (!session || !session.user) {
        return <div>
        </div>;
    }
    
    const user: User = session?.user as User;
    const username = user.username as string
    const url = usePathname();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ChangeUsernameForm oldUsername={username} />
    </div>
  )
}

export default page
