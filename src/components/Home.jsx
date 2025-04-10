import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata, updatedata } from './context/ContextProvider';

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
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
        console.log("Delete failed");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <th className="px-6 py-3 font-medium">Organized By</th> {/* ✅ New column */}
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getuserdata) && getuserdata.map((element, index) => (
              <tr key={element._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{element.title}</td>
                <td className="px-6 py-3">{element.description}</td>
                <td className="px-6 py-3">{new Date(element.date).toLocaleDateString()}</td>
                <td className="px-6 py-3">{element.time}</td>
                <td className="px-6 py-3">{element.location}</td>
                <td className="px-6 py-3">{element.category}</td>
                <td className="px-6 py-3">{element.organiserName}</td> {/* ✅ New data cell */}
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <NavLink to={`/view/${element._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white p-1 rounded shadow-sm">
                        <RemoveRedEyeIcon fontSize="small" />
                      </button>
                    </NavLink>
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
    </div>
  );
};

export default Home;
