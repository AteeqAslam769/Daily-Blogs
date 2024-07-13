import React from 'react';
import { Link } from 'react-router-dom';
import { blogOperations } from '../appwrite/config';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-gray-100 shadow-md border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center overflow-hidden rounded-t-md">
                    <img
                        src={blogOperations.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover object-top"
                    />
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
