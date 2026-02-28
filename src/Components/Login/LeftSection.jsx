import React, { useState, useEffect } from "react";
import lgnIllustartion1 from "../../Assets/Login/lgnIll.png";
import lgnIllustartion2 from "../../Assets/Login/lgnIll2.png";
import lgnIllustartion3 from "../../Assets/Login/lgnIll3.png";

const slides = [
  {
    title: "Empower Modern Education",
    description:
      "Transform your institution with smart tools for managing students, tracking performance, handling admissions, and organizing academic records—all in one platform.",
    image: lgnIllustartion1,
  },
  {
    title: "Simplify Attendance & Scheduling",
    description:
      "Easily manage attendance, class schedules, exams, and timetables with automated workflows that save time for teachers and administrators.",
    image: lgnIllustartion2,
  },
  {
    title: "Track Performance & Progress",
    description:
      "Monitor student grades, assignments, and academic progress in real-time with secure data management and detailed performance insights.",
    image: lgnIllustartion3,
  },
];

export default function LeftSection({ logo }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const { title, description, image } = slides[currentSlide];

  return (
    <div className="flex flex-col justify-center items-center bg-white p-10 transition-all duration-500">
      <div className="mb-6">
        {/* <img src={logo} alt="logo" className="w-auto h-24 mb-3" /> */}
      </div>
      <img src={image} alt="Illustration" className="w-auto h-72 mb-6" />
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4 tracking-wide">
        {title}
      </h2>
      <p className="text-gray-600 tracking-wide text-center max-w-md">
        {description}
      </p>
      <div className="flex mt-4 space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2 ${
              index === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-gray-400"
            } rounded-full transition-all duration-300`}
          ></span>
        ))}
      </div>
    </div>
  );
}
