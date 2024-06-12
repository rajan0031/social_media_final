import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';



const CreateBlogEditor = () => {


    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        placeholder: "Start typing",
    }


    const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission here
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">What's going in your mind?</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                    Post Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter post title"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">
                    Post Content
                </label>
                {/* <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    rows="5"
                    placeholder="Enter post content"
                /> */}

                {/* using the jodit editor handleRemoveMemberFromGroup */}

                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)}
                    config={config}
                />



            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                    Post Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select a category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                </select>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Post
                </button>
                <button
                    type="reset"
                    className="ml-4 bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Reset
                </button>
            </div>
        </form>
    );
};

export default CreateBlogEditor;
