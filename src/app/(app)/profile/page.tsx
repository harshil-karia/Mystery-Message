"use client";
import ProfileCard from '@/components/ProfileCard';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const Profile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast()

  useEffect(() => {
    if (session) {
      setUsername(session.user?.username || '');
      setEmail(session.user?.email || '');
    }
    if(!session || !session.user){
        router.replace('/')
        return
    }
  }, [session, session?.user ]);


  return (
    
        
        <div className="flex justify-center items-center min-h-screen">
         {   
        session ? (
            
                <ProfileCard 
                    username={username}
                    email={email}
                />
            
        ):(
            <>
            </>
        )
    }
    </div>
    
  );
}

export default Profile;
