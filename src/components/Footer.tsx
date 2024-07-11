// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import ContactUs from './ContactUs';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-4">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="text-sm">&copy; All rights reserved.</div>
          </div>
        </div>
        <Link href="/terms-and-conditions"className="text-gray-300 text-sm ml-1 hover:text-white mr-4">
        Terms & Conditions
        </Link>
        <Link href="/privacy-policy"className="text-gray-300 text-sm hover:text-white">
        Privacy Policy
        </Link>
        <div className="flex items-center justify-center md:justify-end space-x-4 md:space-x-8 mt-4 md:mt-0">
          <Link href="https://www.instagram.com/harshil_karia/" target="_blank" rel="noopener noreferrer">
            <Instagram className="cursor-pointer" size="24" />
          </Link>
          <Link href="https://github.com/harshil-karia/Mystery-Message" target="_blank" rel="noopener noreferrer">
            <Github className="cursor-pointer" size="24" />
          </Link>
          <Link href="https://x.com/karia__harshil" target="_blank" rel="noopener noreferrer">
            <Twitter className="cursor-pointer" size="24" />
          </Link>
          <Link href="https://www.linkedin.com/in/harshil-karia-658694293/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="cursor-pointer" size="24" />
          </Link>
          <ContactUs />
        </div>
      </div><br></br>
      <div className="text-center mt-4 text-gray-300 text-sm">
        Developed By
        <Link href="https://www.linkedin.com/in/harshil-karia-658694293/" target="_blank" rel="noopener noreferrer"className="text-gray-300 text-sm ml-1 hover:text-white mr-4">
           HARSHIL KARIA
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
