import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata, updatedata } from './context/ContextProvider';

const socket = io("https://mib-backend-uuga.onrender.com");

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
  const token = localStorage.getItem("token");

  const getdata = async () => {
    try {
      const res = await fetch("https://mib-backend-uuga.onrender.com/api/v1/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok && data.events) {
        setUserdata(data.events);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();

    // Listen to real-time events
    socket.on('eventCreated', () => {
      getdata();
    });

    socket.on('eventUpdated', () => {
      getdata();
    });

    socket.on('eventDeleted', () => {
      getdata();
    });

    return () => {
      socket.off('eventCreated');
      socket.off('eventUpdated');
      socket.off('eventDeleted');
    };
  }, []);

  const deleteuser = async (id) => {
    try {
      const res = await fetch(`https://mib-backend-uuga.onrender.com/api/v1/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setDLTdata(data);
        // getdata() not needed here since socket handles it
      } else {
        console.log("Delete failed");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const totalPages = Math.ceil(getuserdata.length / itemsPerPage);
  const paginatedData = getuserdata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-24 px-4 min-h-screen bg-gray-300 dark:bg-[#111827] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Alerts */}
        {udata && (
          <div className="mb-4 rounded-md bg-green-100 border border-green-400 text-green-800 px-4 py-3">
            <strong className="font-semibold">{udata.title}</strong> added successfully!
          </div>
        )}
        {updata && (
          <div className="mb-4 rounded-md bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3">
            <strong className="font-semibold">{updata.title}</strong> updated successfully!
          </div>
        )}
        {dltdata && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-400 text-red-800 px-4 py-3">
            <strong className="font-semibold">{dltdata.title}</strong> deleted successfully!
          </div>
        )}

        {/* Add Button */}
        <div className="flex justify-end mb-6">
          <NavLink to="/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow-sm transition-all duration-200">
              + Add Event
            </button>
          </NavLink>
        </div>

        {/* Loader or Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Fetching Events...</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {["#", "Title", "Description", "Date", "Time", "Location", "Category", "Organized By", "Actions"].map((head) => (
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
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No events found.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((element, index) => (
                    <tr key={element._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-4 py-3">{element.title}</td>
                      <td className="px-4 py-3">{element.description}</td>
                      <td className="px-4 py-3">{new Date(element.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{element.time}</td>
                      <td className="px-4 py-3">{element.location}</td>
                      <td className="px-4 py-3">{element.category}</td>
                      <td className="px-4 py-3">{element.organiserName}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <NavLink to={`/edit/${element._id}`}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded shadow-sm">
                              <CreateIcon fontSize="small" />
                            </button>
                          </NavLink>
                          <button
                            onClick={() => deleteuser(element._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded shadow-sm"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {getuserdata.length > itemsPerPage && (
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
                {Array.from({ length: totalPages }, (_, idx) => (
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
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
        )}
      </div>
    </div>
  );
};

export default Home;