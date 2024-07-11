import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { MailPlus, Send } from 'lucide-react';

const ContactUs = () => {
    const companyEmail = "harshil.karia.hk@gmail.com"
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${companyEmail}`;
  return (
        <Link href={gmailLink} target='_blank' rel={"noopener noreferrer"} className='w-full md:w-auto'>
            <MailPlus></MailPlus>
        </Link>
    
  )
}
export default ContactUs
