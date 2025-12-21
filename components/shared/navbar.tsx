"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/assets/auth/logo.png";
import Image from "next/image";
import { getCookie } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "user_role=; Max-Age=0; path=/;";
    router.push("/login");
  };
  const token = getCookie("access_token");
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-sidebar-border glass-effect">
      <div className="container mx-auto max-w-6xl py-4 flex items-center justify-between animate-fade-in">
        <Link href="/" className="inline-flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={1000}
            height={1000}
            className="object-cover w-auto m-auto h-12 animate-fade-in"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-2 font-body">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="lg" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          {token ? (
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
