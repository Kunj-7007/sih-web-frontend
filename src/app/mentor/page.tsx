"use client";

import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GraduationCap,
  Users,
  TrendingUp,
  TrendingDown,
  BookOpenCheck,
  HeartHandshake,
  ClipboardCheck,
  Award,
  Calendar,
  ChevronDown,
  UserCheck,
  BarChart3,
  BookCopy,
  MessageSquareWarning,
  Star,
  Trophy,
  Send,
  Bell,
  Settings,
} from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard"; // Import the new card
import { THEMES } from "@/lib/theme";

// Animated Counter Component
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

// Metric Card Component
const MetricCard = ({
  title,
  value,
  change,
  icon,
  prefix = "",
  suffix = "",
  trend = "up",
  theme,
}: {
  title: string;
  value: number | string;
  change?: string;
  icon: React.ReactElement;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  theme: any;
}) => (
  <Card
    className={`relative overflow-hidden h-30 ${theme.borderClass} ${theme.card} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
  >
    <CardContent className="p-4 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div
          className={`p-2 rounded-xl ${theme.primary.bg}/10 ${theme.primary.text} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        {change && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${
              trend === "up"
                ? "bg-emerald-100 text-emerald-700"
                : trend === "down"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {trend === "up" && <TrendingUp className="h-3 w-3" />}
            {trend === "down" && <TrendingDown className="h-3 w-3" />}
            {change}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className={`text-sm font-medium ${theme.textMuted}`}>{title}</h3>
        <p className={`text-2xl font-bold ${theme.text} tracking-tight`}>
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
      </div>
    </CardContent>
  </Card>
);

// Main Dashboard Component for Class Coordinator
export default function ClassCoordinatorDashboard() {
  const [currentTheme] = useState<string>("light");
  const themeConfig = THEMES[currentTheme];

  // Mock Data for a Class Coordinator
  const summaryMetrics = [
    {
      title: "Class Attendance",
      value: 92.5,
      suffix: "%",
      change: "+1.5%",
      icon: <UserCheck className="h-5 w-5" />,
      trend: "up" as const,
    },
    {
      title: "Average GPA",
      value: 3.4,
      change: "+0.1",
      icon: <GraduationCap className="h-5 w-5" />,
      trend: "up" as const,
    },
    {
      title: "Leave Application",
      value: 78,
      // suffix: "%",
      change: "+5%",
      icon: <BookOpenCheck className="h-5 w-5" />,
      trend: "down" as const,
    },
    {
      title: "Students at Risk",
      value: 4,
      change: "-1",
      icon: <MessageSquareWarning className="h-5 w-5" />,
      trend: "down" as const,
    },
  ];

  const gpaDistributionData = [
    { name: "< 2.0", students: 2, fill: "#ef4444" },
    { name: "2.0-2.5", students: 5, fill: "#f97316" },
    { name: "2.5-3.0", students: 12, fill: "#eab308" },
    { name: "3.0-3.5", students: 25, fill: "#84cc16" },
    { name: "3.5-4.0", students: 16, fill: "#22c55e" },
  ];

  const attendanceEngagementData = [
    { week: "W1", attendance: 90, engagement: 75 },
    { week: "W2", attendance: 91, engagement: 80 },
    { week: "W3", attendance: 88, engagement: 70 },
    { week: "W4", attendance: 92, engagement: 85 },
    { week: "W5", attendance: 93, engagement: 88 },
    { week: "W6", attendance: 92.5, engagement: 90 },
  ];

  const courseDeliveryData = [
    {
      subject: "Advanced Algorithms",
      faculty: "Dr. Alan Turing",
      completion: 90,
      lastClass: "Graphs",
    },
    {
      subject: "Database Systems",
      faculty: "Prof. Ada Lovelace",
      completion: 75,
      lastClass: "Normalization",
    },
    {
      subject: "Operating Systems",
      faculty: "Dr. Linus Torvalds",
      completion: 65,
      lastClass: "Memory Mgmt",
    },
    {
      subject: "Software Engineering",
      faculty: "Prof. Grace Hopper",
      completion: 82,
      lastClass: "Agile Methods",
    },
  ];

  const studentWellbeingData = {
    moodSurvey: [
      { name: "Positive", value: 75, fill: themeConfig.primary.fill },
      { name: "Neutral", value: 15, fill: "#fbbf24" },
      { name: "Stressed", value: 10, fill: "#f87171" },
    ],
    supportTickets: 5,
    upcomingEvents: [
      { title: "Mental Health Workshop", date: "Sep 25" },
      { title: "Career Counseling Fair", date: "Oct 2" },
    ],
  };

  const achievements = [
    {
      name: "Alice Johnson",
      achievement: "Winner, National Coding Olympiad",
      icon: Trophy,
    },
    {
      name: "Bob Williams",
      achievement: "Published Research Paper on AI",
      icon: BookCopy,
    },
    {
      name: "Charlie Brown",
      achievement: "Top Performer in Mid-term Exams",
      icon: Star,
    },
  ];

  return (
    <div className={`min-h-screen ${themeConfig.bg}`}>
      <main className="p-4 sm:p-6 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`${themeConfig.text}`}>Class Councillor</h1>
            <p className={`${themeConfig.textMuted} `}>
              Analytics and management for B.Tech CSE - Section B (2025 Batch).
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Fall Semester 2025
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Fall Semester 2025</DropdownMenuItem>
              <DropdownMenuItem>Spring Semester 2025</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} theme={themeConfig} />
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Academic & Course Metrics) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Performance */}
            <DashboardCard
              title="Academic Performance "
              description="Distribution of student Grade Point Averages (GPA)."
              icon={<BarChart3 />}
              theme={themeConfig}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gpaDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  />
                  <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                    {gpaDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </DashboardCard>

            {/* Attendance & Engagement */}
            <DashboardCard
              title="Attendance "
              description="Weekly trends for class attendance of Student ."
              icon={<TrendingUp />}
              theme={themeConfig}
              className="h-100"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke={themeConfig.primary.stroke}
                    strokeWidth={3}
                    name="Attendance (%)"
                  />
                  {/* <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke={themeConfig.secondary.stroke}
                    strokeWidth={3}
                    name="Engagement Score"
                  /> */}
                </LineChart>
              </ResponsiveContainer>
            </DashboardCard>
          </div>
          {/* Right Column (Well-being, Admin, etc.) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Details */}
            <DashboardCard
              title="Course Details"
              description="Real-time syllabus completion status for all subjects."
              icon={<BookCopy />}
              theme={themeConfig}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Faculty</TableHead>
                    {/* <TableHead>Last Topic Covered</TableHead>
                      <TableHead className="text-right">Completion</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseDeliveryData.map((course) => (
                    <TableRow key={course.subject}>
                      <TableCell className="font-medium">
                        {course.subject}
                      </TableCell>
                      <TableCell>{course.faculty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DashboardCard>

            {/* Recognition & Achievements */}
            <DashboardCard
              title="Recognition & Achievements"
              icon={<Award />}
              theme={themeConfig}
            >
              <div className="space-y-3">
                {achievements.map((ach) => {
                  const Icon = ach.icon;
                  return (
                    <div key={ach.name} className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${themeConfig.primary.bg}/10 ${themeConfig.primary.text}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{ach.name}</p>
                        <p className={`text-xs ${themeConfig.textMuted}`}>
                          {ach.achievement}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DashboardCard>

            {/* Admin & Quick Actions */}
            <DashboardCard
              title="Administrative & Actions"
              icon={<ClipboardCheck />}
              theme={themeConfig}
            >
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Fee Payment Status</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Forms Submitted</span>
                    <span className="font-semibold">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                {/* <Button
                  className={`w-full mt-4 justify-start gap-2 ${themeConfig.primary.bg} ${themeConfig.primary.hover}`}
                >
                  <Send className="h-4 w-4" /> Send Attendance Alert
                </Button> */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Bell className="h-4 w-4" /> Publish Announcement
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Settings className="h-4 w-4" /> Report Center
                </Button>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
}
