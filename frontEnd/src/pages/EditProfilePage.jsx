import React, { useState } from 'react';



function EditProfilePage() {
  const [formData, setFormData] = useState([{
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    ImageUrl: "",
    prefix: "",
    departmentId: "",
  }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    // Add your submit logic here (e.g., API call)
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
      <form className="bg-base-200 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Profile Picture URL</span>
          </label>
          <input
            type="text"
            name="ImageUrl"
            value={formData.ImageUrl}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="Enter profile picture URL"
          />
        </div>

        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
