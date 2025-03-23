'use client'
import Footer from "@/app/HelpingComponents/Footer";
import React, { useState } from "react";
import { MapPin, FileText, AlertTriangle } from "react-feather"; // Example of icons you can use

const FileReportPage = () => {
  const [reportData, setReportData] = useState({
    type: "",
    description: "",
    location: "",
    severity: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(reportData);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-cyan-600 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">File a New Report</h2>
        </div>

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
