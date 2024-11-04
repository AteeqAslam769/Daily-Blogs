import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { blogOperations } from '../appwrite/config';

import { Input, RTE, Select, Button, Loader } from './index';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function PostForm({ post }) {
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { getValues, setValue, watch, register, handleSubmit, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });
    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        setLoading(true)
        if (post) {
            const file = data.image[0] ? await blogOperations.uploadfile(data.image[0]) : null;
            if (file) {
                await blogOperations.deleteFile(post.featuredImage);
            }
            const dbPost = await blogOperations.editBlog(post.$id, { ...data, featuredImage: file?.$id });
            if (dbPost) {
                setLoading(false)
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await blogOperations.uploadfile(data.image[0]) : null;
            if (file) {
                const dbPost = await blogOperations.createBlog({ ...data,slug:data.slug.substring(0, 34), featuredImage: file?.$id, userId: userData.$id });
                setLoading(false)
                dbPost && navigate(`/post/${dbPost.$id}`);
            }
        }
        
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/\s/g, '-');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > MAX_FILE_SIZE) {
            setError(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB`);
            e.target.value = null; // Clear the file input
        } else {
            setError('');
        }
    };

    return (
        loading?<Loader/>:
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap pt-6 pb-10">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={handleFileChange}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={blogOperations.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" text={post ? "Update" : "Submit"} bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            
                {error&&<h1 className=' text-red-500'>{error}</h1>}
            </div>
        </form>
    )
}

export default PostForm;
