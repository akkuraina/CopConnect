"use client";
import Footer from "@/app/HelpingComponents/Footer";
import React, { useState } from "react";
import { MapPin, FileText } from "react-feather";

const FileReportPage = () => {
  const [reportData, setReportData] = useState({
    type: "",
    description: "",
    location: "",
    severity: "low",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/anonymous/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Anonymous complaint filed successfully!");
        setReportData({ type: "", description: "", location: "", severity: "low" });
      } else {
        setMessage(data.error || "Failed to submit complaint.");
      }
    } catch (error) {
      setMessage("Error submitting complaint.");
      console.error("Submission error:", error);
    }

    setTimeout(() => setMessage(null), 5001);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-cyan-600 to-blue-700 p-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Submit Anonymous Complaint</h2>
          </div>

          {message && (
            <div className="bg-blue-500 text-white p-3 rounded-lg mb-4 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold">
                Report Type
              </label>
              <select
                id="type"
                name="type"
                value={reportData.type}
                onChange={handleChange}
                className="w-full p-3 mt-2 bg-white/10 text-white border border-blue-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Accident">Accident</option>
                <option value="Crime">Crime</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={reportData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mt-2 bg-white/10 text-white border border-blue-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the incident in detail"
              ></textarea>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold">
                Location
              </label>
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="h-6 w-6 text-white" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={reportData.location}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 text-white border border-blue-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the location"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Submit Report
              </button>
              <button
                type="button"
                onClick={() => setReportData({ type: "", description: "", location: "", severity: "low" })}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FileReportPage;
