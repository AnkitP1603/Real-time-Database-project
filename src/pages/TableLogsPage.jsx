import { useState, useEffect } from "react";

const events = [
  {
    title: "Hackathon 2025",
    description: "A 48-hour hackathon focusing on AI and ML.",
    date: "2025-05-01",
    time: "10:00 AM",
    location: "Auditorium Hall A",
    category: "Tech",
    status: "Upcoming",
    organizedBy: "Coding Club",
  },
  {
    title: "Cultural Fest",
    description: "Dance, music, drama, and more fun events.",
    date: "2025-03-10",
    time: "6:00 PM",
    location: "Open Air Theater",
    category: "Cultural",
    status: "Finished",
    organizedBy: "Cultural Council",
  },
  {
    title: "Guest Lecture: Future of Quantum Computing",
    description: "Talk by Dr. Alan Turing Jr.",
    date: "2025-04-05",
    time: "3:00 PM",
    location: "Seminar Room 2",
    category: "Academic",
    status: "Deleted",
    organizedBy: "Science Society",
  },
];

const statuses = ["All", "Upcoming", "Deleted", "Finished"];

export default function TableLogsPage() {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredEvents =
    selectedStatus === "All"
      ? events
      : events.filter((event) => event.status === selectedStatus);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="pt-24 px-4 min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="status" className="text-lg font-semibold">
            Status:
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Organized By</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredEvents.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3 font-medium whitespace-normal">{event.title}</td>
                  <td className="px-4 py-3 whitespace-normal">{event.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(event.date)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{event.time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{event.location}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{event.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{event.organizedBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        event.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                          : event.status === "Finished"
                          ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination (Static for now) */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <span>Page 1 of 1</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border rounded disabled:opacity-50 dark:border-gray-600">«</button>
            <button className="px-2 py-1 border rounded dark:border-gray-600">‹</button>
            <button className="px-2 py-1 border rounded dark:border-gray-600">›</button>
            <button className="px-2 py-1 border rounded dark:border-gray-600">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
