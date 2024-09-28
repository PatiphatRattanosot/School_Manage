import React, { useEffect, useState } from 'react';
import { useNewsContext } from '../../context/NewsContext';
import { useNavigate, useParams } from 'react-router-dom';

function EditNewsPage() {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        newsImage: '',
        newsType: ''
    });
    
    const { fetchNewsById, updateNews } = useNewsContext();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const newsData = await fetchNewsById(id);
            setFormData(newsData);
        };
        fetchData();
    }, [fetchNewsById, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        updateNews(id, formData);
        navigate("/");
    };

    return (
        <div className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold text-center mb-4">ฟอร์มการแก้ไขข่าวสาร</h2>
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
                        <span className="label-text">URL ของภาพ</span>
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
                    <button type="submit" className="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
                </div>
            </form>
        </div>
    );
}

export default EditNewsPage;
