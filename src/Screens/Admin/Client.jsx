// StudentEnrollmentDashboard.jsx
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiTrash2,
  FiPlus,
  FiUser,
  FiMail,
  FiBook,
  FiCalendar,
  FiPhone,
  FiFlag,
  FiEdit2,
  FiEye,
} from "react-icons/fi";
import { FaGraduationCap, FaVenusMars, FaUserGraduate } from "react-icons/fa";

const StudentEnrollmentDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");

  // Sample student data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStudents([
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 890",
          course: "Computer Science",
          enrollmentDate: "2024-01-15",
          status: "Active",
          gender: "Male",
          semester: "4th",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1 234 567 891",
          course: "Business Administration",
          enrollmentDate: "2024-01-20",
          status: "Active",
          gender: "Female",
          semester: "2nd",
        },
        {
          id: 3,
          name: "Mike Johnson",
          email: "mike.j@example.com",
          phone: "+1 234 567 892",
          course: "Engineering",
          enrollmentDate: "2024-02-01",
          status: "Inactive",
          gender: "Male",
          semester: "6th",
        },
        {
          id: 4,
          name: "Sarah Williams",
          email: "sarah.w@example.com",
          phone: "+1 234 567 893",
          course: "Medicine",
          enrollmentDate: "2024-02-10",
          status: "Active",
          gender: "Female",
          semester: "3rd",
        },
        {
          id: 5,
          name: "David Brown",
          email: "david.b@example.com",
          phone: "+1 234 567 894",
          course: "Law",
          enrollmentDate: "2024-02-15",
          status: "Active",
          gender: "Male",
          semester: "5th",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Custom styles for DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        borderBottomWidth: "2px",
        borderBottomColor: "#e2e8f0",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#1e293b",
        padding: "16px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#334155",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#f1f5f9",
        },
      },
    },
    cells: {
      style: {
        padding: "16px",
      },
    },
  };

  // Handle view student details
  const handleView = (student) => {
    Swal.fire({
      title: "Student Details",
      html: `
        <div class="text-left">
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Phone:</strong> ${student.phone}</p>
          <p><strong>Course:</strong> ${student.course}</p>
          <p><strong>Semester:</strong> ${student.semester}</p>
          <p><strong>Gender:</strong> ${student.gender}</p>
          <p><strong>Enrollment Date:</strong> ${student.enrollmentDate}</p>
          <p><strong>Status:</strong> ${student.status}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#3b82f6",
      background: "#ffffff",
      borderRadius: "12px",
    });
  };

  // Handle edit student
  const handleEdit = (student) => {
    // Navigate to edit page with student data
    navigate("/edit-student", { state: { student } });
  };

  // Handle delete student
  const handleDelete = (student) => {
    Swal.fire({
      title: "Delete Student Record?",
      text: `You are about to delete ${student.name}'s enrollment. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      borderRadius: "12px",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents(students.filter((s) => s.id !== student.id));
        Swal.fire({
          title: "Deleted!",
          text: "Student record has been deleted successfully.",
          icon: "success",
          background: "#ffffff",
          borderRadius: "12px",
          confirmButtonColor: "#3b82f6",
        });
      }
    });
  };

  // Columns definition with icons
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
      cell: (row) => (
        <span className="font-medium text-gray-700">#{row.id}</span>
      ),
    },
    {
      name: "Student",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <FiUser className="text-white text-sm" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Contact",
      selector: (row) => row.phone,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <FiPhone className="text-gray-400" />
          <span>{row.phone}</span>
        </div>
      ),
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <FaGraduationCap className="text-blue-500" />
          <span>{row.course}</span>
        </div>
      ),
    },
    {
      name: "Semester",
      selector: (row) => row.semester,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <FaUserGraduate className="text-purple-500" />
          <span>{row.semester}</span>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View Student"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Edit Student"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete Student"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: "140px",
    },
  ];

  // Filter functionality
  const filteredItems = students.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            {/* Left Side - Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create Enrollment
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and monitor student enrollments
              </p>
            </div>

            {/* Right Side - Search + Add */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Search */}
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search student..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-72 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
                />
              </div>

              {/* Add Button */}
              <button
                onClick={() => navigate("/admin/add-student-enroll")}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2E3A8C] text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <FiPlus size={18} />
                <span className="text-sm font-medium">Add Enrollment</span>
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-6">
            <DataTable
              columns={columns}
              data={filteredItems}
              progressPending={loading}
              progressComponent={
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              }
              pagination
              highlightOnHover
              pointerOnHover
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#f9fafb",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#e5e7eb",
                  },
                },
                headCells: {
                  style: {
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  },
                },
                rows: {
                  style: {
                    fontSize: "14px",
                    backgroundColor: "#ffffff",
                    minHeight: "60px",
                    borderBottom: "1px solid #f1f5f9",
                  },
                  highlightOnHoverStyle: {
                    backgroundColor: "#f8fafc",
                    borderBottomColor: "#e2e8f0",
                    outline: "none",
                  },
                },
                pagination: {
                  style: {
                    borderTop: "1px solid #e5e7eb",
                    padding: "16px",
                  },
                },
              }}
              noDataComponent={
                <div className="text-center py-16">
                  <FiUser className="mx-auto text-gray-300 text-5xl mb-4" />
                  <p className="text-gray-500 text-sm">
                    No enrollment records found
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentDashboard;
