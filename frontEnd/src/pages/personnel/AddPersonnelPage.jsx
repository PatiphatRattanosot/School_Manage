import React, { useState } from 'react';
import { usePersonnelContext } from '../../context/PersonnelContext'; 
import { useDepartmentContext } from '../../context/DepartmentContext'; 

function AddPersonnelPage() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        departmentId: '',
    });

    const { addPersonnel } = usePersonnelContext(); 
    const { departments } = useDepartmentContext(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPersonnel(formData);
    };

    return (
        <div className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-4">ฟอร์มการสร้างบุคลากรใหม่</h2>
            <form className="bg-base-200 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">ชื่อ</span>
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่ชื่อ"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">นามสกุล</span>
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่นามสกุล"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">อีเมล</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่อีเมล"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">เบอร์โทรศัพท์</span>
                    </label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่เบอร์โทรศัพท์"
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">สาขา</span>
                    </label>
                    <select
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                    >
                        <option value="">เลือกสาขา</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">เพิ่มบุคลากร</button>
                </div>
            </form>
        </div>
    );
}

export default AddPersonnelPage;
