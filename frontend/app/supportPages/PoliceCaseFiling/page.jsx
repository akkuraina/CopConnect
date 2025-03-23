"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Video, X } from "lucide-react";
import Footer from "@/app/HelpingComponents/Footer";

const PoliceReportForm = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    reportingOfficer: "",
    badge: "",
    dateTime: "",
    location: "",
    incidentType: "",
    victimName: "",
    victimContact: "",
    suspectDescription: "",
    narrative: "",
    evidence: "",
    witnesses: "",
    status: "open",
    priority: "medium",
  });

  const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: file.type.startsWith("image/") ? "image" : "video",
      preview: URL.createObjectURL(file),
    }));
    setMediaFiles([...mediaFiles, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setMediaFiles(mediaFiles.filter((file) => file.id !== fileId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", { ...formData, mediaFiles });
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 py-10 px-6">
  <Card className="max-w-4xl mx-auto bg-white border border-blue-500/30 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center text-blue-400">
            Police Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Case Number
                </label>
                <input
                  type="text"
                  name="caseNumber"
                  value={formData.caseNumber}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reporting Officer
                </label>
                <input
                  type="text"
                  name="reportingOfficer"
                  value={formData.reportingOfficer}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Badge Number
                </label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Incident Type
                </label>
                <select
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                  required
                >
                  <option value="">Select type</option>
                  <option value="theft">Theft</option>
                  <option value="assault">Assault</option>
                  <option value="burglary">Burglary</option>
                  <option value="vandalism">Vandalism</option>
                  <option value="domestic">Domestic Incident</option>
                  <option value="traffic">Traffic Incident</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Victim Information
                </label>
                <input
                  type="text"
                  name="victimName"
                  value={formData.victimName}
                  onChange={handleChange}
                  placeholder="Victim Name"
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
                <input
                  type="text"
                  name="victimContact"
                  value={formData.victimContact}
                  onChange={handleChange}
                  placeholder="Contact Information"
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>

              {/* Suspect Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Suspect Description
                </label>
                <textarea
                  name="suspectDescription"
                  value={formData.suspectDescription}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>

              {/* Incident Narrative */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Incident Narrative
                </label>
                <textarea
                  name="narrative"
                  value={formData.narrative}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                  required
                />
              </div>

              {/* Evidence Section */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Evidence
                </label>
                <textarea
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  placeholder="Describe the evidence collected..."
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex-1">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 cursor-pointer group">
                        <div className="text-center">
                          <Camera className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                          <span className="mt-2 block text-sm text-gray-400 group-hover:text-blue-500">
                            Upload Photos
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </label>

                    <label className="flex-1">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 cursor-pointer group">
                        <div className="text-center">
                          <Video className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                          <span className="mt-2 block text-sm text-gray-400 group-hover:text-blue-500">
                            Upload Videos
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </label>
                  </div>

                  {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mediaFiles.map((file) => (
                        <div key={file.id} className="relative">
                          <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
                            {file.type === "image" ? (
                              <img
                                src={file.preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={file.preview}
                                className="w-full h-full object-cover"
                                controls
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Witnesses */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Witnesses
                </label>
                <textarea
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleChange}
                  className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                />
              </div>

              {/* Status and Priority */}
              <div className="col-span-2 md:grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"

                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Report
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    <Footer />
    </>
  );
};

export default PoliceReportForm;
