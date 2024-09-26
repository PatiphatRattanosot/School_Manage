import React from 'react'

function Card({ id, des, title, type, img }) {
    return (
        <div className="card bg-base-100 shadow-xl w-96 h-96">
            <figure className="h-48">
                <img src={img} alt={title} className="object-cover w-full h-full" />
            </figure>
            <div className="card-body h-48 flex flex-col justify-between">
                <p className="flex-grow overflow-hidden overflow-ellipsis">{des}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{type}</div>
                </div>
            </div>
        </div>


    )
}

export default Card
