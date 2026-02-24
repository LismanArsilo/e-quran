"use client";

import {
  BookOpen,
  ChevronDown,
  Clock,
  HandHeart,
  Home,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../share/ThemeToggle";

const navItems = [
  {
    title: "Home",
    icon: Home,
    type: "link",
    href: "/",
  },
  {
    title: "Surat",
    icon: BookOpen,
    type: "link",
    href: "/surat",
  },
  {
    title: "Doa",
    icon: HandHeart,
    type: "link",
    href: "/doa",
  },
  {
    title: "Imsakiyah",
    icon: Clock,
    type: "link",
    href: "/imsakiyah",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isDropdownParentActive = (dropdownItems) => {
    return dropdownItems.some((item) => isActive(item.href));
  };

  const getLogoSize = () => {
    if (windowWidth < 640) return { width: 120, height: 40 };
    if (windowWidth < 768) return { width: 140, height: 46 };
    return { width: 180, height: 60 };
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full border border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300 ${scrolled ? "py-1 shadow-md" : "py-2"} dark:shadow-amber-200/20`}
      >
        <div className="w-full px-6">
          <div className="flex h-16 items-center justify-between xl:justify-around">
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <div className="relative" style={getLogoSize()}>
                <Image
                  src="/images/icon-l-removebg.png"
                  alt="Logo RS Grha Permata Ibu"
                  fill
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 180px"
                  className="object-contain block"
                />
              </div>
            </Link>

            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.type === "dropdown") {
                  const isParentActive = isDropdownParentActive(item.items);

                  return (
                    <div key={item.title} className="relative group">
                      <button
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          isParentActive
                            ? "bg-amber-600 text-white dark:bg-amber-950 dark:text-white"
                            : "hover:bg-amber-600 hover:text-white dark:hover:bg-amber-900"
                        }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                        <ChevronDown className="ml-1 h-3 w-3 opacity-70" />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-2 w-65 rounded-md border bg-popover shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                        <div className="p-2 max-h-[80vh] overflow-y-auto">
                          {item.items.map((subItem) => {
                            const subItemActive = isActive(subItem.href);

                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`block rounded-md px-3 py-2 transition-all duration-200 hover:scale-[1.02] ${
                                  subItemActive
                                    ? "bg-amber-600 text-white dark:bg-amber-950 dark:text-white"
                                    : "hover:bg-amber-600 hover:text-white dark:hover:bg-amber-900"
                                }`}
                              >
                                <div className="font-medium">
                                  {subItem.title}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground line-clamp-2">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.type === "link") {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105 ${
                        active
                          ? "bg-amber-600 text-white dark:bg-amber-950 dark:text-white"
                          : "hover:bg-amber-600 hover:text-white dark:hover:bg-amber-900"
                      }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                }

                return null;
              })}

              <ThemeToggle />
            </div>

            {/* Mobile: Theme Toggle + Menu Button */}
            <div className="flex xl:hidden items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-amber-600 hover:text-white transition-all duration-200 active:scale-95"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />

        {/* Sidebar */}
        <div
          ref={mobileMenuRef}
          className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col h-full ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b shrink-0 bg-background">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={toggleMobileMenu}
            >
              <div className="relative h-10 w-36 sm:h-12 sm:w-40">
                <Image
                  src="/images/icon-l-removebg.png"
                  alt="Logo Rumah Sakit"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-amber-600 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2 pb-10">
              {navItems.map((item) => {
                const isParentActive =
                  item.type === "dropdown"
                    ? isDropdownParentActive(item.items)
                    : isActive(item.href);

                return (
                  <div key={item.title} className="space-y-1">
                    {item.type === "dropdown" ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className={`flex w-full items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 ${
                            isParentActive
                              ? "bg-amber-600 text-white"
                              : "hover:bg-amber-100 dark:hover:bg-amber-950/50"
                          }`}
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-3 h-5 w-5" />
                            <span className="font-medium">{item.title}</span>
                          </div>

                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              openDropdown === item.title ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`ml-4 space-y-1 border-l-2 border-amber-200 dark:border-amber-800 pl-4 transition-all duration-300 ${
                            openDropdown === item.title
                              ? "max-h-250"
                              : "max-h-0 overflow-hidden"
                          }`}
                        >
                          {item.items.map((subItem) => {
                            const subItemActive = isActive(subItem.href);

                            return (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`block px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 ${
                                  subItemActive
                                    ? "bg-amber-600 text-white"
                                    : "hover:bg-amber-100 dark:hover:bg-amber-950/50"
                                }`}
                                onClick={toggleMobileMenu}
                              >
                                <div className="font-medium text-sm">
                                  {subItem.title}
                                </div>

                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 active:scale-95 ${
                          isParentActive
                            ? "bg-amber-600 text-white"
                            : "hover:bg-amber-100 dark:hover:bg-amber-950/50"
                        }`}
                        onClick={toggleMobileMenu}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
