// app/hostel/layout.tsx (Example file path)
"use client";

import React from "react";
import Image from "next/image";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
  CircleUser,
  ChevronRight,
  Home,
  Menu,
  Users,
  BedDouble,
  Wallet,
  ClipboardList,
  UtensilsCrossed, // New Icon for Mess/Dining
  MessageSquareWarning, // New Icon for Complaints
} from "lucide-react";

// ---------- Mock Data ----------
const recentActivities = [
  {
    time: "1 hour ago",
    text: "New maintenance request logged for Room A-201.",
    icon: MessageSquareWarning,
  },
  {
    time: "3 hours ago",
    text: "Monthly mess bill has been generated.",
    icon: Wallet,
  },
  {
    time: "1 day ago",
    text: "5 new students checked into B-Wing.",
    icon: Users,
  },
  {
    time: "2 days ago",
    text: "Night attendance for all blocks is complete.",
    icon: ClipboardList,
  },
];

// ---------- Theme & Nav (Updated for Hostel) ----------
const theme = {
  bg: "bg-slate-50",
  card: "bg-white",
  border: "border-blue-200",
  textMuted: "text-blue-900/70",
  primaryBg: "bg-[#001675]",
};

const navLinks = [
  { href: "/hostel", label: "Dashboard", icon: Home, active: true },
  { href: "/hostel/rooms", label: "Rooms & Allocation", icon: BedDouble },
  { href: "/hostel/students", label: "Student Details", icon: Users },
  { href: "/hostel/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/hostel/mess", label: "Mess/Dining", icon: UtensilsCrossed },
  { href: "/hostel/fees", label: "Fee Management", icon: Wallet },
  {
    href: "/hostel/complaints",
    label: "Complaints",
    icon: MessageSquareWarning,
  },
];

// ---------- Layout Component ----------
export default function HostelLayout({
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
                    Hostel Portal
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
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        LDRP-ITR Hostel
                      </h3>
                      <p className={`text-xs ${theme.textMuted}`}>
                        Gandhinagar, Gujarat
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
              {/* --- [CHANGED] --- */}
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                Hostel Management
              </p>
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
                      <div className="p-2 mt-1 rounded-lg bg-blue-50 text-blue-700">
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
                        {/* --- [CHANGED] --- */}
                        <p className="text-sm font-medium">Hetrath Bhatt</p>
                        <p className={`text-xs ${theme.textMuted}`}>
                          Hostel Warden
                        </p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#001675]">
                        <span className="text-sm font-semibold text-white">
                          HB
                        </span>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
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
