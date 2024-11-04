import React, { useEffect, useState } from 'react';
import { PostCard, Container, Loader } from '../components';
import { blogOperations } from '../appwrite/config';

function AllPosts() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        blogOperations.getBlogs().then((posts) => {
            if (posts) setPost(posts.documents);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (posts.length !== 0) {
        return (
            <div className="w-full px-2 bg-gray-200">
                <Container>
                    <div className="flex flex-wrap -mx-2">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="w-full text-center">
                <Container>
                    <div className="flex flex-wrap w-full py-60">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Oops, no Blog available right now
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default AllPosts;
