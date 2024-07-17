"use client";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Inbox", href: "/inbox" },
  { name: "All calls", href: "/all-calls" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex pt-4">
      <div className="w-[90%] flex items-center justify-center gap-4 flex-grow">
        <header
          className="flex justify-items-start items-center mb-4
        space-x-4"
        >
          <div
            className="flex items-center justify-center w-12 h-12 
              border-4border-green-500 rounded-full text-green-500"
          >
            <Phone size={24} />
          </div>
          <h2 className="text-xl font-semibold">Activity</h2>
        </header>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                `flex h-[48px] items-center justify-center 
                  gap-2 rounded-md p-3 text-sm font-medium
                  md:flex-none md:justify-start md:p-2 md:px-3
                  hover:bg-sky-200 hover:text-blue-700
                  transition-colors duration-300 ease-in-out
                  relative`,
                {
                  "after:absolute after:left-[20%] after:bottom-[-2px] after:w-[60%] after:h-[4px] after:bg-red-500":
                    pathname === link.href, // Underline with red color and spacing
                }
              )}
            >
              <p className="md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
