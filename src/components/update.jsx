import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatedata } from './context/ContextProvider'; // Assuming this is your context

const UpdateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the event ID from the URL
  const { updata, setUPdata } = useContext(updatedata); // Access context to update event list

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: ''
  });

  // Preload the event data from context, if available
  useEffect(() => {
    console.log("updata:", updata); // Check the context data
    console.log("Event ID:", id); // Ensure the ID is coming from the URL

    if (updata && updata.events) {
      const existingEvent = updata.events.find(event => event.id === id);
      if (existingEvent) {
        console.log("Event found in context:", existingEvent); // Debugging log
        setEventData({
          title: existingEvent.title,
          description: existingEvent.description,
          date: existingEvent.date,
          time: existingEvent.time,
          location: existingEvent.location,
          category: existingEvent.category
        });
      } else {
        console.log("Event not found in context, fetching from API...");
      }
    }

  }, [id, updata]); // Fetch data when 'id' or 'updata' changes

  // Fetch the event data from the backend if it's not available in the context
  useEffect(() => {
    if (!eventData.title && id) { // Only fetch if no title is set
      console.log("Fetching event data from API...");
      fetch(`https://mib-backend-uuga.onrender.com/api/v1/events/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log("Fetched data from API:", data);
            setEventData({
              title: data.title,
              description: data.description,
              date: data.date,
              time: data.time,
              location: data.location,
              category: data.category
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching event data:', error);
        });
    }
  }, [id, eventData.title]); // Prevent re-fetching if data is already loaded

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to update an event.");
      return;
    }

    try {
      // PUT request to update the event
      const res = await fetch(`https://mib-backend-uuga.onrender.com/api/v1/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          category: eventData.category
        })
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Error occurred!");
      }

      // Update the event in context state after successful update
      setUPdata({
        ...updata,
        events: updata.events.map((event) => (event.id === id ? data : event))
      });

      alert("Event updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4 pt-24 pb-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Time</label>
              <input
                type="text"
                name="time"
                placeholder="e.g., 6:30 PM"
                value={eventData.time}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <select
                name="category"
                value={eventData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Technical">Tech Fest</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-xl transition duration-300"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
