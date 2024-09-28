import React from 'react';
import { useAuthContext } from '../context/AuthContext';
function Card({ id, des, title, type, img, onEdit, onDelete }) {
    const { user } = useAuthContext()
    return (
        <div className="card bg-base-100 shadow-xl w-96 h-96">
            <figure className="h-48">
                <img src={img} alt={title} className="object-cover w-full h-full" />
            </figure>
            <div className="card-body h-48 flex flex-col justify-between">
                <p className="flex-grow overflow-hidden overflow-ellipsis">{des}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">New</div>
                </div>
            </div>
            {user && (user.roles.includes("ROLE_TEACHER") || user.roles.includes("ROLE_ADMIN")) && (
                <div className="flex justify-between">
                    <button className="btn btn-primary mr-2" onClick={() => onEdit(id)}>
                        Edit
                    </button>
                    <button className="btn btn-secondary" onClick={() => onDelete(id)}>
                        Delete
                    </button>

                </div>
            )
            }


        </div>
    );
}

export default Card;
