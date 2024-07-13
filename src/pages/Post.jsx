import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogOperations } from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            blogOperations.getBlog(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            }).finally(() => setLoading(false));
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        setLoading(true);
        blogOperations.deleteBlog(post.$id).then((status) => {
            if (status) {
                blogOperations.deleteFile(post.featuredImage).finally(() => setLoading(false));
                navigate("/");
            }
        });
    };

    return loading? (
        <Loader />
    ) : post ? (
        <div className="py-12">
            <Container>
                <div className="w-full flex flex-col items-center mb-8 relative shadow-md bg-white">
                    <div className="w-full h-[600px] flex justify-center items-center overflow-hidden mb-6">
                        {imageLoading && <Loader />}
                        <img
                            src={blogOperations.getFilePreview(post.featuredImage, 2000, 2000)}
                            alt={post.title}
                            className={`h-full object-cover ${imageLoading ? 'hidden' : 'block'}`}
                            onLoad={() => setImageLoading(false)}
                            onError={() => setImageLoading(false)}
                        />
                    </div>
                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-green-700 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition ease-in-out duration-200">
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                className="bg-red-700 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition ease-in-out duration-200" 
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
                </div>
                <div className="prose lg:prose-xl">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
