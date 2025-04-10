import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const getdata = async () => {
    const res = await fetch(`https://crudappreactjs.herokuapp.com/getuser/${id}`, {
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
      console.log("user deleted");
      history.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Welcome Harsh Pathak</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-end gap-3 mb-4">
          <NavLink to={`/edit/${getuserdata._id}`}>
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              <CreateIcon />
            </button>
          </NavLink>
          <button
            onClick={() => deleteuser(getuserdata._id)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            <DeleteOutlineIcon />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-3">
            <img src="/profile.png" alt="profile" className="w-16 h-16 rounded-full" />
            <h3 className="text-lg font-medium">Name: <span className="font-normal">{getuserdata.name}</span></h3>
            <h3 className="text-lg font-medium">Age: <span className="font-normal">{getuserdata.age}</span></h3>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <MailOutlineIcon className="text-blue-500" /> Email: <span>{getuserdata.email}</span>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <WorkIcon className="text-green-600" /> Occupation: <span>{getuserdata.work}</span>
            </p>
          </div>

          {/* Right Section */}
          <div className="space-y-3 mt-4 md:mt-0">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <PhoneAndroidIcon className="text-purple-500" /> Mobile: <span>+91 {getuserdata.mobile}</span>
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <LocationOnIcon className="text-red-500" /> Location: <span>{getuserdata.add}</span>
            </p>
            <p className="text-sm text-gray-700">Description: <span>{getuserdata.desc}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
