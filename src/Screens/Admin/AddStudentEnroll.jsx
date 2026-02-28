// AddStudentForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBook,
  FiFlag,
  FiArrowLeft,
  FiSave,
  FiX,
  FiPhoneCall,
  FiDroplet,
  FiFileText,
} from "react-icons/fi";
import { FaVenusMars, FaGraduationCap, FaIdCard } from "react-icons/fa";

const AddStudentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.student;
  const mode = location.state?.mode || "add";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    course: "",
    semester: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    emergencyContact: "",
    bloodGroup: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form if in edit mode
  useEffect(() => {
    if (editData && mode === "edit") {
      const [firstName, lastName] = editData.name.split(" ");
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: editData.email || "",
        phone: editData.phone || "",
        dateOfBirth: "",
        gender: editData.gender || "",
        address: "",
        course: editData.course || "",
        semester: editData.semester || "",
        enrollmentDate: editData.enrollmentDate || "",
        emergencyContact: "",
        bloodGroup: "",
        remarks: "",
      });
    }
  }, [editData, mode]);

  const courses = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Medicine",
    "Law",
    "Arts",
    "Economics",
  ];

  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.course) newErrors.course = "Course is required";
    if (!formData.semester) newErrors.semester = "Semester is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields correctly",
        icon: "error",
        confirmButtonColor: "#2E3A8C",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        title: mode === "add" ? "Success!" : "Updated!",
        text:
          mode === "add"
            ? "Student has been enrolled successfully"
            : "Student information has been updated successfully",
        icon: "success",
        confirmButtonColor: "#2E3A8C",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        navigate(-1);
      });
    }, 1500);
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all unsaved changes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header with Gradient */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {mode === "add" ? "Enroll New Student" : "Edit Student Information"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {mode === "add" 
                  ? "Fill in the details to enroll a new student" 
                  : "Update the student's information"}
              </p>
            </div>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 mt-4 md:mt-0 bg-[#2E3A8C] hover:bg-[#262e61] border border-gray-200 text-white rounded-lg hover:bg-gray-70 hover:border-gray-300 transition-all duration-200 shadow-sm"
            >
              <FiArrowLeft size={18} />
              <span className="text-sm font-medium">Go Back</span>
            </button>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiUser className="text-blue-600" size={18} />
                  </div>
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition ${
                          errors.firstName ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Enter first name"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition ${
                        errors.lastName ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition ${
                          errors.dateOfBirth ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition appearance-none ${
                          errors.gender ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-xs text-red-600">{errors.gender}</p>
                    )}
                  </div>

                  {/* Address - Full Width */}
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition ${
                          errors.address ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="Enter full address"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaGraduationCap className="text-purple-600" size={18} />
                  </div>
                  Academic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Course */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition appearance-none ${
                          errors.course ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.course && (
                      <p className="mt-1 text-xs text-red-600">{errors.course}</p>
                    )}
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiFlag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition appearance-none ${
                          errors.semester ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="">Select Semester</option>
                        {semesters.map((sem) => (
                          <option key={sem} value={sem}>
                            {sem} Semester
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.semester && (
                      <p className="mt-1 text-xs text-red-600">{errors.semester}</p>
                    )}
                  </div>

                  {/* Enrollment Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enrollment Date
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        name="enrollmentDate"
                        value={formData.enrollmentDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaIdCard className="text-green-600" size={18} />
                  </div>
                  Additional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <div className="relative">
                      <FiPhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <div className="relative">
                      <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition appearance-none"
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Remarks - Full Width */}
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks
                    </label>
                    <div className="relative">
                      <FiFileText className="absolute left-3 top-3 text-gray-400" size={18} />
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows="3"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
                        placeholder="Any additional remarks or notes"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
                >
                  <FiX size={18} />
                  <span className="text-sm font-medium">Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#2E3A8C] text-white rounded-lg hover:bg-[#1d255c] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="text-sm font-medium">
                        {mode === "add" ? "Enrolling..." : "Updating..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      <span className="text-sm font-medium">
                        {mode === "add" ? "Enroll Student" : "Update Student"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;