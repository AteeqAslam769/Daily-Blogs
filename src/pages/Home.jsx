import React, { useState, useEffect } from 'react';
import { blogOperations } from '../appwrite/config';
import { Container, Loader, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function Home() {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.userData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            blogOperations.getBlogs([Query.equal('userId', user?.$id)]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            }).finally(() => setLoading(false));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="w-full py-60 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else if (user && posts.length !== 0) {
        return loading ? <Loader /> : (
            <div className="w-full py-6 px-2">
                <Container>
                    <div className="flex flex-wrap -mx-2">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    } else if (user && posts.length === 0) {
        return (
            loading ? <Loader /> : <div className="w-full text-center">
                <Container>
                    <div className="flex flex-wrap w-full py-60">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Create your own Blogs to see here
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;
