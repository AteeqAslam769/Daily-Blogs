import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import Loader from './Loader/Loader';

function RTE({ name, label, control, defaultValue }) {
    const [loading, setLoading] = useState(true); // Track editor load state

    useEffect(() => {
        // Set a timeout in case onInit doesn't fire as expected
        const timer = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            {loading ? ( // Display loader if loading
                <Loader />
            ) : (
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey='lqcc6v4l371sj36t1cj96n7m80vchvnsentdypj03omozo65'
                            initialValue={defaultValue}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                            onEditorChange={onChange}
                            onInit={() => setLoading(false)} // Fallback if Editor initializes correctly
                        />
                    )}
                />
            )}
        </div>
    );
}

export default RTE;
