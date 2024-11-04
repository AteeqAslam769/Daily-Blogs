import React from 'react';
import { Link } from 'react-router-dom';
import { blogOperations } from '../appwrite/config';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="w-full p-4 flex flex-col h-full">
            <div className="bg-white shadow-md border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
                <div className="flex-grow">
                    <div className="flex justify-center overflow-hidden rounded-t-md">
                        <img
                            src={blogOperations.getFilePreview(featuredImage)}
                            alt={title}
                            className="w-full h-56 sm:h-60 md:h-72 lg:h-80 object-cover object-top"
                        />
                    </div>
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
