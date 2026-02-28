import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  FaGraduationCap,
  FaUserGraduate,
  FaBookOpen,
  FaCalendarAlt,
  FaArrowLeft,
  FaArrowRight,
  FaBell,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaCheckCircle,
  FaExclamationCircle,
  FaSun,
  FaCloudSun,
  FaMoon,
  FaStar,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const StudentManagementDashboard = () => {
  const barChartData = [
    { subject: "Math", students: 45, average: 78 },
    { subject: "Physics", students: 38, average: 72 },
    { subject: "Chemistry", students: 42, average: 75 },
    { subject: "Biology", students: 35, average: 80 },
    { subject: "English", students: 50, average: 82 },
  ];

  const pieChartData = [
    { name: "Present", value: 85, color: "#10B981" },
    { name: "Absent", value: 10, color: "#EF4444" },
    { name: "Late", value: 5, color: "#F59E0B" },
  ];

  const recentTransactions = [
    {
      id: 1,
      student: "Alice Johnson",
      type: "Tuition Fee",
      amount: "$450",
      status: "Paid",
      date: "2026-02-15",
      icon: <FaMoneyBillWave className="text-green-500" />,
      color: "green",
    },
    {
      id: 2,
      student: "Bob Smith",
      type: "Library Fine",
      amount: "$25",
      status: "Pending",
      date: "2026-02-14",
      icon: <FaExclamationCircle className="text-yellow-500" />,
      color: "yellow",
    },
    {
      id: 3,
      student: "Carol Davis",
      type: "Activity Fee",
      amount: "$120",
      status: "Paid",
      date: "2026-02-13",
      icon: <FaCreditCard className="text-blue-500" />,
      color: "blue",
    },
    {
      id: 4,
      student: "David Wilson",
      type: "Lab Fee",
      amount: "$75",
      status: "Overdue",
      date: "2026-02-12",
      icon: <FaMoneyBillWave className="text-red-500" />,
      color: "red",
    },
  ];

  const upcomingHolidays = [
    {
      id: 1,
      name: "Spring Break",
      date: "2026-03-15",
      duration: "1 Week",
      type: "holiday",
      icon: <FaSun className="text-yellow-500" />,
    },
    {
      id: 2,
      name: "Memorial Day",
      date: "2026-05-25",
      duration: "1 Day",
      type: "holiday",
      icon: <FaCloudSun className="text-gray-500" />,
    },
    {
      id: 3,
      name: "Summer Vacation",
      date: "2026-06-01",
      duration: "2 Months",
      type: "holiday",
      icon: <FaSun className="text-orange-500" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Overdue":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Custom pie label that works well at all sizes
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${name} ${value}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6">

      {/* Header Stats */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { icon: <FaUserGraduate className="text-xl sm:text-2xl text-blue-600" />, bg: "bg-blue-100", label: "Total Students", value: "1,234" },
          { icon: <FaBookOpen className="text-xl sm:text-2xl text-green-600" />, bg: "bg-green-100", label: "Active Courses", value: "24" },
          { icon: <FaGraduationCap className="text-xl sm:text-2xl text-purple-600" />, bg: "bg-purple-100", label: "Graduation Rate", value: "92%" },
          { icon: <FaStar className="text-xl sm:text-2xl text-yellow-600" />, bg: "bg-yellow-100", label: "Achievements", value: "156" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center space-x-3"
          >
            <div className={`p-2 sm:p-3 ${stat.bg} rounded-lg flex-shrink-0`}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bar Chart */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -3 }}
        >
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700 flex items-center">
            <FaChartLine className="mr-2 text-blue-500 flex-shrink-0" />
            Subject Performance
          </h2>
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="students" fill="#3B82F6" name="Students" radius={[3, 3, 0, 0]} />
                <Bar dataKey="average" fill="#10B981" name="Average" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -3 }}
        >
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700 flex items-center">
            <FaUsers className="mr-2 text-green-500 flex-shrink-0" />
            Attendance Overview
          </h2>
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="55%"
                  paddingAngle={5}
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={true}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Transactions and Upcoming Holidays */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500 flex-shrink-0" />
            Recent Transactions
          </h2>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className={`p-2 bg-${transaction.color}-100 rounded-lg flex-shrink-0`}>
                    {transaction.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{transaction.student}</p>
                    <p className="text-xs text-gray-500 truncate">{transaction.type}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-800 text-sm">{transaction.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Holidays */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <FaSun className="mr-2 text-yellow-500 flex-shrink-0" />
            Upcoming Holidays
          </h2>
          <div className="space-y-3">
            {upcomingHolidays.map((holiday) => (
              <motion.div
                key={holiday.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 bg-white rounded-full shadow flex-shrink-0">
                    {holiday.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{holiday.name}</p>
                    <p className="text-xs text-gray-500">{holiday.duration}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-orange-600 text-sm">
                    {format(new Date(holiday.date), "MMM d")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentManagementDashboard;