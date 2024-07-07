// components/ProfileCard.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  username: string;
  email: string;
}


const ProfileCard: React.FC<ProfileCardProps> = ({ username, email }) => {
    const router = useRouter()
    const handleSignOut = () => {
        signOut();
    }
    const handleUpdate = () => {
      router.replace(`/update/${username}`)
    }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px] h-[400px] p-6 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle>PROFILE</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username" className='font-bold text-lg'>Username</Label>
                <Input id="username" value={username} readOnly className='font-bold text-medium' />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className='font-bold text-lg'>Email</Label>
                <Input id="email" value={email} readOnly type="email" className='font-bold text-medium' />
              </div>
            </div>
          </form>
          <div className="mt-4 flex justify-between">
            <Button className="mr-4" onClick={handleUpdate}>Update Username</Button>
            <Button onClick={handleSignOut}>Logout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
