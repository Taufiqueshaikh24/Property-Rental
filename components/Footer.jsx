
import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/images/logo.png';

const Footer = () => {
        
    return (
        <footer className="bg-gray-200 py-4 mt-auto">
      <div
        className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4"
      >
 
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; 2024 PropertyPulse. All rights reserved.
          </p>
        </div>
    </footer>
)
};

export default Footer; 