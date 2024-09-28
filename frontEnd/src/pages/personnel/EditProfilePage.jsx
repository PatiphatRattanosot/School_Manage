import React, { useEffect, useState } from 'react';
import { usePersonnelContext } from '../../context/PersonnelContext';
import { useDepartmentContext } from '../../context/DepartmentContext';
import { useParams, useNavigate } from 'react-router-dom';

function EditPersonnelPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const { updatePerson, fetchById } = usePersonnelContext();
    const { departments } = useDepartmentContext();

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        ImageUrl: '',
        prefix: '',
        departmentId: '',
    });

    useEffect(() => {
        const fetchPerson = async () => {
            const currentPersonnel = await fetchById(id || user.id);
            setFormData(currentPersonnel);
        };
        fetchPerson();
    }, [id, fetchById]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePerson(id || user.id, formData);
        console.log(id);
        
        if (id === undefined) {
            navigate('/profile');
        }else{
            navigate('/dashboard/personnel');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-4">ฟอร์มการแก้ไขบุคลากร</h2>
            <form className="bg-base-200 p-6 rounded-lg shadow-md" >
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
                        <span className="label-text">รูปภาพ</span>
                    </label>
                    <input
                        type="text"
                        name="ImageUrl"
                        value={formData.ImageUrl}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่ URL รูปภาพ"
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">คำนำหน้า</span>
                    </label>
                    <select
                        name="prefix"
                        value={formData.prefix}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                    >
                        <option value="">เลือกคำนำหน้า</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                    </select>
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
                    <button onClick={handleSubmit} className="btn btn-primary">อัปเดตบุคลากร</button>
                </div>
            </form>
        </div>
    );
}

export default EditPersonnelPage;
