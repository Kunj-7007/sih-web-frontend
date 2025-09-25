// app/mentor/hostel/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  Users,
  IndianRupee,
  MessageSquareWarning,
  TrendingUp,
  TrendingDown,
  Wrench,
  Wifi,
  Droplets,
  ChevronRight,
  UtensilsCrossed, // New icon for Menu
} from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard"; // Your reusable card
import { THEMES } from "@/lib/theme"; // Your theme file

// --- Reusable Animated Counter Component ---
const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: any;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState<number>(0);
  const numericValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[^\d.]/g, ""))
      : Number(value);
  useEffect(() => {
    if (isNaN(numericValue)) return;
    let startTime: number | null = null;
    const duration = 1500;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(numericValue * easeOutQuart);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numericValue);
    };
    requestAnimationFrame(animate);
  }, [numericValue]);
  const formattedCount =
    count < 10 && !Number.isInteger(count)
      ? parseFloat(count.toFixed(1))
      : Math.round(count).toLocaleString();
  return (
    <span className="tabular-nums">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

// --- Reusable Metric Card Component ---
const MetricCard = ({
  title,
  value,
  change,
  icon,
  suffix = "",
  trend = "up",
  theme,
}: any) => (
  <Card
    className={`relative pt-0 h-30 ${theme.borderClass} ${theme.card} hover:shadow-lg transition-shadow duration-300`}
  >
    <CardContent className="p-4 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className={theme.primary.text}>
          {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
        {change && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              trend === "up"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="mt-2 text-left">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {/* <p className="text-2xl font-bold text-slate-900 tracking-tight"> */}
        <p className={`text-2xl font-bold ${theme.text} tracking-tight`}>
          <AnimatedCounter value={value} suffix={suffix} />
        </p>
      </div>
    </CardContent>
  </Card>
);

// --- Main Hostel Dashboard Component ---
export default function HostelDashboard() {
  const [currentTheme] = useState<string>("light");
  const themeConfig = THEMES[currentTheme];

  // --- Mock Data for Hostel ---
  const summaryMetrics = [
    {
      title: "Total Students",
      value: 350,
      change: "+12",
      icon: <Users />,
      trend: "up",
    },
    {
      title: "Occupancy Rate",
      value: 87.5,
      suffix: "%",
      change: "+2.5%",
      icon: <BedDouble />,
      trend: "up",
    },
    {
      title: "Pending Fees",
      value: 125000,
      prefix: "₹",
      change: "+₹15k",
      icon: <IndianRupee />,
      trend: "down",
    },
    {
      title: "Open Complaints",
      value: 4,
      change: "+1",
      icon: <MessageSquareWarning />,
      trend: "down",
    },
  ];

  const roomOccupancyData = [
    { name: "Occupied", value: 350, fill: themeConfig.primary.fill },
    { name: "Available", value: 50, fill: "#e5e7eb" },
  ];
  const feeStatisticsData = [
    { name: "Paid", value: 180, fill: themeConfig.primary.fill },
    { name: "Pending", value: 45, fill: themeConfig.tertiary.fill },
  ];
  const recentStudents = [
    { name: "Rohan Sharma", room: "A-201", branch: "CSE", year: "3rd" },
    { name: "Priya Mehta", room: "B-105", branch: "IT", year: "2nd" },
    { name: "Amit Patel", room: "C-310", branch: "Mechanical", year: "4th" },
    { name: "Sneha Verma", room: "A-202", branch: "CSE", year: "3rd" },
  ];
  const complaints = [
    {
      issue: "Wi-Fi not working",
      room: "B-Wing",
      status: "Pending",
      icon: <Wifi className="h-4 w-4 text-red-500" />,
    },
    {
      issue: "Water cooler issue",
      room: "C-Wing Ground Floor",
      status: "In Progress",
      icon: <Droplets className="h-4 w-4 text-amber-500" />,
    },
    {
      issue: "Room cleaning request",
      room: "A-301",
      status: "Resolved",
      icon: <Wrench className="h-4 w-4 text-green-500" />,
    },
  ];

  // --- [NEW] Mock Data for Today's Menu ---
  const todaysMenu = {
    breakfast: "Poha, Jalebi, Tea/Milk",
    lunch: "Roti, Rice, Dal Fry, Aloo Gobi, Salad",
    dinner: "Roti, Rice, Paneer Butter Masala, Sev Tameta, Buttermilk",
  };

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className={`${themeConfig.text} text-slate-900`}>
              Hostel Management
            </h1>
            <p className="text-slate-600">
              Overview of room occupancy, fees, and student activities.
            </p>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} theme={themeConfig} />
          ))}
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard
            title="Room Occupancy"
            description="Live status of available and occupied rooms."
            icon={<BedDouble />}
            theme={themeConfig}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <ResponsiveContainer width="40%" height={160}>
                <PieChart>
                  <Pie
                    data={roomOccupancyData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {roomOccupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-slate-800">350 / 400</h3>
                <p className="text-sm text-slate-600">Total Rooms Occupied</p>
                <Progress value={(350 / 400) * 100} className="h-2" />
              </div>
            </div>
          </DashboardCard>
          <DashboardCard
            title="Hostel Fee Status"
            description="Summary of collected and pending student fees."
            icon={<IndianRupee />}
            theme={themeConfig}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <ResponsiveContainer width="40%" height={160}>
                <PieChart>
                  <Pie
                    data={feeStatisticsData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {feeStatisticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px", marginLeft: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs text-slate-500">Amount Pending</p>
                <h3 className="text-3xl font-bold text-red-600">₹1,25,000</h3>
                <p className="text-sm text-slate-600">from 45 students</p>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* --- [NEW & RESTRUCTURED] Student Info and Menu Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Student Information Card (60% width) */}
          <DashboardCard
            title="Student Information"
            description="Details of recently checked-in students."
            icon={<Users />}
            theme={themeConfig}
            className="lg:col-span-3" // Takes 3 of 5 columns
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Room No.</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.room}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DashboardCard>

          {/* Today's Menu Card (40% width) */}
          <DashboardCard
            title="Today's Menu"
            description="Meal schedule for today."
            icon={<UtensilsCrossed />}
            theme={themeConfig}
            className="lg:col-span-2" // Takes 2 of 5 columns
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  Breakfast
                </h4>
                <p className="text-sm text-slate-600">{todaysMenu.breakfast}</p>
              </div>
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-slate-800">Lunch</h4>
                <p className="text-sm text-slate-600">{todaysMenu.lunch}</p>
              </div>
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-slate-800">Dinner</h4>
                <p className="text-sm text-slate-600">{todaysMenu.dinner}</p>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Complaints and Feedback Card */}
        <DashboardCard
          title="Complaints & Feedback"
          description="Track and resolve student complaints."
          icon={<MessageSquareWarning />}
          theme={themeConfig}
        >
          <div className="space-y-3">
            {complaints.map((complaint) => (
              <div
                key={complaint.issue}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* <complaint.icon /> */}
                  <div>
                    <p className="font-semibold text-sm">{complaint.issue}</p>
                    <p className="text-xs text-slate-500">{complaint.room}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    complaint.status === "Resolved"
                      ? "default"
                      : complaint.status === "Pending"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {complaint.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              View All Complaints <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </DashboardCard>
      </main>
    </div>
  );
}
