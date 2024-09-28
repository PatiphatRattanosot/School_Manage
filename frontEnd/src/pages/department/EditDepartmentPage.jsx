import React, { useState, useEffect } from 'react';
import { useDepartmentContext } from '../../context/DepartmentContext'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditDepartmentPage() {
    const { id } = useParams(); 
    const { fetchById, updateDepartment } = useDepartmentContext(); 
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        const fetchDepartment = async () => {
            const department = await fetchById(id); 
            setFormData(department); 
        };

        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        updateDepartment(id, formData); 
        navigate("/dashboard/department"); 
    };

    return (
        <div className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-4">ฟอร์มแก้ไขสาขา</h2>
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
                    <button type="submit" className="btn btn-primary">แก้ไขสาขา</button>
                </div>
            </form>
        </div>
    );
}

export default EditDepartmentPage;
