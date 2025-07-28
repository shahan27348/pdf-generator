"use client";
//global imports

import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
//local imports
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
// import MobileSidebar from "./mobilesidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-pink-200/20 bg-white/80 backdrop-blur-sm h-16">
      <div className="flex items-center">
        <Sparkles className="w-8 h-8 text-pink-500 mr-2" />
        <Link href="/">
          <h1
            className={cn(
              "text-xl md:text-3xl text-gray-800 font-semibold",
              font.className
            )}
          >
            Sommaire
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          Your Summary
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        <Link
          href="/upload"
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          Upload PDF
        </Link>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
