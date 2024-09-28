import React, { useState } from 'react';
import { useDepartmentContext } from '../../context/DepartmentContext';

function AddDepartmentPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    
    const { addDepartment } = useDepartmentContext(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        addDepartment(formData);
    };

    return (
        <div className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-4">ฟอร์มการสร้างสาขาใหม่</h2>
            <form className="bg-base-200 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">ชื่อสาขา</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่ชื่อสาขา"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">รายละเอียด</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input input-bordered h-24"
                        placeholder="กรุณาใส่รายละเอียดของสาขา"
                        required
                    />
                </div>

                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">เพิ่มสาขา</button>
                </div>
            </form>
        </div>
    );
}

export default AddDepartmentPage;
