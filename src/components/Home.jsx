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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
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

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">#</th>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Time</th>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Organized By</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((element, index) => (
              <tr key={element._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-6 py-3">{element.title}</td>
                <td className="px-6 py-3">{element.description}</td>
                <td className="px-6 py-3">{new Date(element.date).toLocaleDateString()}</td>
                <td className="px-6 py-3">{element.time}</td>
                <td className="px-6 py-3">{element.location}</td>
                <td className="px-6 py-3">{element.category}</td>
                <td className="px-6 py-3">{element.organiserName}</td>
                <td className="px-6 py-3">
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;