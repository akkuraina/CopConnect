'use client'
import React, { useState, useEffect } from 'react';

const TrackTips = () => {
  const [tips, setTips] = useState([]);

  // Simulating an API call (Replace this with an actual fetch request)
  useEffect(() => {
    const dummyTips = [
      { id: 1, description: "Suspicious activity near bank", status: "Pending" },
      { id: 2, description: "Vandalism reported in park", status: "Resolved" },
      { id: 3, description: "Illegal dumping spotted", status: "Pending" }
    ];
    setTips(dummyTips);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">Track Tip Status</h2>
      <p className="text-blue-100 mb-4">View the status of submitted tips</p>

      <div className="space-y-3">
        {tips.length > 0 ? (
          tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white/10 p-3 rounded-lg flex justify-between items-center"
            >
              <span className="text-white">{tip.description}</span>
              <span
                className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                  tip.status === "Resolved" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {tip.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-blue-200">No tips available.</p>
        )}
      </div>
    </div>
  );
};

export default TrackTips;
