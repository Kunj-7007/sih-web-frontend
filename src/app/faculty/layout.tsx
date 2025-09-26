"use client";

import React from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

import {
  Bell,
  BookOpen,
  Briefcase,
  CircleUser,
  ChevronRight,
  Home,
  Landmark,
  Menu,
  Search,
  Settings,
  Users,
  Users2,
  UserCheck,
  BedDouble,
  Wallet,
} from "lucide-react";

// ---------- Notifications ----------
const recentActivities = [
  {
    time: "2 hours ago",
    text: "New batch of 450 students registered for Summer 2024.",
    icon: Users,
  },
  {
    time: "5 hours ago",
    text: "Monthly financial report generated and sent to stakeholders.",
    icon: Wallet,
  },
  {
    time: "1 day ago",
    text: "CM Patel College hostel renovation project completed.",
    icon: Landmark,
  },
  {
    time: "2 days ago",
    text: "Faculty performance reviews initiated for Q2 2024.",
    icon: UserCheck,
  },
];

// ---------- Theme & Nav ----------
const theme = {
  bg: "bg-slate-50",
  card: "bg-white",
  border: "border-blue-200",
  textMuted: "text-blue-900/70",
  primaryBg: "bg-[#001675]",
};

const navLinks = [
  { href: "/mentor", label: "Dashboard", icon: Home, active: true },
  // { href: "/mentor/hods", label: "HODs", icon: Users2 },
  //   { href: "/mentor/faculty", label: "Faculty", icon: UserCheck },
  { href: "/mentor/students", label: "Students", icon: Users },
  { href: "/mentor/placements", label: "Placements", icon: Briefcase },
  // { href: "/mentor/hostel", label: "Hostel", icon: BedDouble },
  // { href: "/mentor/library", label: "Library", icon: BookOpen },
];

// ---------- Layout ----------
export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        {/* ---------- Sidebar ---------- */}
        <aside
          className={`hidden md:block sticky top-0 h-screen overflow-y-auto border-r ${theme.border} ${theme.card}`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div
              className={`flex h-16 items-center px-6 border-b ${theme.border}`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="VidyaLink Logo"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <h1 className="font-bold text-xl">
                    <span className="text-[#001675]">Vidya</span>
                    <span className="text-[#444346]">Link</span>
                  </h1>
                  <p className={`text-xs font-medium ${theme.textMuted}`}>
                    ERP System
                  </p>
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 space-y-1 overflow-auto py-4 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    link.active
                      ? `${theme.primaryBg} text-white shadow-md`
                      : `${theme.textMuted} hover:bg-slate-100 hover:text-slate-900`
                  }`}
                >
                  <link.icon
                    className={`h-5 w-5 ${
                      link.active ? "text-white" : "text-slate-500"
                    }`}
                  />
                  <span className="flex-1">{link.label}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      link.active
                        ? "text-white/70"
                        : "text-slate-400 group-hover:translate-x-1"
                    }`}
                  />
                </a>
              ))}
            </nav>

            {/* Footer card */}
            <div className={`border-t ${theme.border} p-4`}>
              <Card className={`${theme.bg} ${theme.border}`}>
                <CardContent className="px-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">LDRP-ITR</h3>
                      <p className={`text-xs ${theme.textMuted}`}>
                        Gandhinagar, Gujarat
                      </p>
                      <p className={`text-xs ${theme.textMuted} mt-1`}>
                        Est. 2008 • NAAC A+
                      </p>
                    </div>
                    <Image
                      src="/ldrp.png"
                      alt="College Logo"
                      width={70}
                      height={70}
                      className="rounded-md object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* ---------- Main Section ---------- */}
        <div className="flex flex-col">
          {/* Header */}
          <header
            className={`sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b ${theme.border} ${theme.card} px-6`}
          >
            {/* Left */}
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-4 shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  {/* Mobile nav links could go here */}
                </SheetContent>
              </Sheet>
              <p className="text-2xl sm:text-3xl  l font-bold text-gray-900">
                Dr. Himani Trivedi
              </p>

              {/* <div className="relative hidden md:block">
                <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${theme.textMuted}`} />
                <Input
                  placeholder="Search..."
                  className={`pl-10 w-64 ${theme.card} ${theme.border}`}
                />
              </div> */}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Recent Activities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {recentActivities.map((item, idx) => (
                    <DropdownMenuItem key={idx} className="items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs">{item.text}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex items-center gap-2">
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-medium">Dr. HT</p>
                        <p className={`text-xs ${theme.textMuted}`}>LDRP-ITR</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#001675]">
                        <CircleUser className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Children Pages */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
