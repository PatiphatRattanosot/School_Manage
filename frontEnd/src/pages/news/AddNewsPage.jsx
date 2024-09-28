import React, { useState } from 'react';
import { useNewsContext } from '../../context/NewsContext';
import { useNavigate } from 'react-router-dom';

function AddNewsPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        newsImage: '',
        newsType: ''
    });
    
    const { addNews } = useNewsContext(); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        addNews(formData); 
        navigate("/"); 
    };

    return (
        <div className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-4">ฟอร์มการสร้างข่าวสารใหม่</h2>
            <form className="bg-base-200 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">หัวเรื่อง</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่หัวเรื่องข่าว"
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
                        placeholder="กรุณาใส่รายละเอียดข่าว"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">ที่อยู่ URL ของภาพ</span>
                    </label>
                    <input
                        type="text"
                        name="newsImage"
                        value={formData.newsImage}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="กรุณาใส่ URL ของภาพข่าว"
                        required
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">ประเภทข่าว</span>
                    </label>
                    <select
                        name="newsType"
                        value={formData.newsType}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    >
                        <option value="">กรุณาเลือกประเภทข่าว</option>
                        <option value="แนะนำ">แนะนำ</option>
                        <option value="ผลงานอาจารย์">ผลงานอาจารย์</option>
                        <option value="ผลงานนักศึกษา">ผลงานนักศึกษา</option>
                        <option value="ทั่วไป">ทั่วไป</option>
                    </select>
                </div>

                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary">เพิ่มข่าวสาร</button>
                </div>
            </form>
        </div>
    );
}

export default AddNewsPage;
