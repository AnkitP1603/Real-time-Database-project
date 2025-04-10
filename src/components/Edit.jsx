import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const history = useHistory();
  const { id } = useParams();

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: ""
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => ({
      ...preval,
      [name]: value
    }));
  };

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
      setINP(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, work, add, mobile, desc, age } = inpval;

    const res2 = await fetch(`https://crudappreactjs.herokuapp.com/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, work, add, mobile, desc, age })
    });

    const data2 = await res2.json();

    if (res2.status === 422 || !data2) {
      alert("Fill the data");
    } else {
      setUPdata(data2);
      history.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <NavLink to="/" className="text-blue-500 underline">← Back to Home</NavLink>

      <form onSubmit={updateuser} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={inpval.name}
              onChange={setdata}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inpval.email}
              onChange={setdata}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="text"
              name="age"
              value={inpval.age}
              onChange={setdata}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="number"
              name="mobile"
              value={inpval.mobile}
              onChange={setdata}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Work</label>
            <input
              type="text"
              name="work"
              value={inpval.work}
              onChange={setdata}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="add"
              value={inpval.add}
              onChange={setdata}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="desc"
            value={inpval.desc}
            onChange={setdata}
            className="w-full border rounded px-3 py-2"
            rows="5"
          ></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
