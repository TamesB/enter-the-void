
'use client';
import { useState, ReactNode } from "react";

function loadingButton() {
    return (
      <span
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        Loading...
      </span>
    );
  }

interface ButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className }: ButtonProps) => {
    const [loading, setLoading] = useState(false);
    
    const handleClick = () => {
      setLoading(true);
      // Perform your asynchronous operation here, then setLoading(false) when it's done.

    };



    return (<button
        onClick={handleClick}
        className={className}
        >
            {loading ? loadingButton() : children}
        </button>
    );
}
            
export default Button;