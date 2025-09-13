import React, { useState } from "react";

export default function Complaint() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.description) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccess("Thank you, your complaint has been submitted successfully.");
    setForm({
      name: "",
      email: "",
      phone: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-900">
        Kochi Metro Station Complaint System
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select category</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Safety">Safety</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Facilities">Facilities</option>
            <option value="Others">Others</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div>
          <label className="block mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 rounded"
        >
          Submit Complaint
        </button>
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
      </form>
    </div>
  );
}
