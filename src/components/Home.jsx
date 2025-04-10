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

  const getdata = async () => {
    const res = await fetch("https://crudappreactjs.herokuapp.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`https://crudappreactjs.herokuapp.com/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const deletedata = await res2.json();
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">

      {/* Success & Error Alerts */}
      {udata && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 relative">
          <strong>{udata.name}</strong> added successfully!
        </div>
      )}
      {updata && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 relative">
          <strong>{updata.name}</strong> updated successfully!
        </div>
      )}
      {dltdata && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <strong>{dltdata.name}</strong> deleted successfully!
        </div>
      )}

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <NavLink to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Add Data
          </button>
        </NavLink>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Username</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Job</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Number</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getuserdata.map((element, index) => (
              <tr key={element._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{element.name}</td>
                <td className="px-4 py-2">{element.email}</td>
                <td className="px-4 py-2">{element.work}</td>
                <td className="px-4 py-2">{element.mobile}</td>
                <td className="px-4 py-2 flex gap-2">
                  <NavLink to={`view/${element._id}`}>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
                      <RemoveRedEyeIcon fontSize="small" />
                    </button>
                  </NavLink>
                  <NavLink to={`edit/${element._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                      <CreateIcon fontSize="small" />
                    </button>
                  </NavLink>
                  <button
                    onClick={() => deleteuser(element._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
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
