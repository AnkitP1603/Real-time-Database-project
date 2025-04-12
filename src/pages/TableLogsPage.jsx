import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://mib-backend-uuga.onrender.com");

export default function TableLogsPage() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 8;

  const fetchLogs = async () => {
    try {
      const res = await axios.get("https://mib-backend-uuga.onrender.com/api/v1/logs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const filteredLogs = res.data.logs.filter((log) =>
        ["created", "updated", "deleted"].includes(log.action)
      );

      const formatted = filteredLogs.map((log) => ({
        title: log.title,
        description: `${log.action} by ${log.performedBy?.name || "Unknown"}`,
        date: new Date(log.timestamp).toISOString().split("T")[0],
        time: new Date(log.timestamp).toLocaleTimeString(),
        action: log.action,
      }));

      setEvents(formatted.reverse());
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    socket.on("logUpdated", fetchLogs);
    return () => socket.off("logUpdated", fetchLogs);
  }, []);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = events.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(events.length / logsPerPage);

  return (
    <div className="pt-24 px-4 min-h-screen bg-gray-300 dark:bg-[#111827] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                {["Title", "Description", "Date", "Time", "Action"].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {currentLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No logs found.
                  </td>
                </tr>
              ) : (
                currentLogs.map((event, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 font-medium">{event.title}</td>
                    <td className="px-4 py-3">{event.description}</td>
                    <td className="px-4 py-3">{formatDate(event.date)}</td>
                    <td className="px-4 py-3">{event.time}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          event.action === "created"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                            : event.action === "updated"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {event.action}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {events.length > logsPerPage && (
            <div className="flex justify-center items-center py-4 space-x-1 text-sm text-white">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              >
                &gt;
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}