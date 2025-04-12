import React, { useState, useEffect, useContext } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, useNavigate } from 'react-router-dom';
import { adddata, deldata, updatedata } from './context/ContextProvider';

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        getdata();
      } else {
        console.log("Delete failed:", res.status, data.message || data);
      }

    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const updateData = (data) => {
    setUPdata(data);
    navigate("/update");
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
        {udata && (
          <div className="mb-4 rounded bg-green-100 border border-green-400 text-green-800 px-4 py-3">
            <strong>{udata.title}</strong> added successfully!
          </div>
        )}
        {updata && (
          <div className="mb-4 rounded bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3">
            <strong>{updata.title}</strong> updated successfully!
          </div>
        )}
        {dltdata && (
          <div className="mb-4 rounded bg-red-100 border border-red-400 text-red-800 px-4 py-3">
            <strong>{dltdata.title}</strong> deleted successfully!
          </div>
        )}

        <div className="flex justify-end mb-6">
          <NavLink to="/create">
            <button className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded shadow">
              + Add Event
            </button>
          </NavLink>
        </div>

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
                    <th key={head} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {paginatedData.map((element, index) => (
                  <tr key={element._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-3">{element.title}</td>
                    <td className="px-4 py-3">{element.description}</td>
                    <td className="px-4 py-3">{new Date(element.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{element.time}</td>
                    <td className="px-4 py-3">{element.location}</td>
                    <td className="px-4 py-3">{element.category}</td>
                    <td className="px-4 py-3">{element.organizedBy?.name || "N/A"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateData(element)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                        >
                          <CreateIcon fontSize="small" />
                        </button>
                        <button
                          onClick={() => deleteuser(element._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {getuserdata.length > itemsPerPage && (
              <div className="flex justify-center items-center py-4 space-x-1 text-sm text-white">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50">«</button>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50">&lt;</button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button key={idx} onClick={() => handlePageChange(idx + 1)} className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-700 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
                    {idx + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50">&gt;</button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50">»</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
