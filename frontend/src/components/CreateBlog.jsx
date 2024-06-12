import { useState, useEffect } from 'react';
import axios from 'axios';
import { addBlogRoutes } from '../../utils/apiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef, useMemo } from 'react';

import JoditEditor from 'jodit-react';


function CreateBlog() {
    const location = useLocation();
    const message = location.state?.message;

    const [createBlogEditorTool, setCreateBlogEditorTool] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    // console.log(message);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [imageUrl, setImageURL] = useState('');
    const [featured, setFeatured] = useState(false);

    const editor = useRef(null);


    // redirect to register page if user is not register in the database

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await localStorage.getItem("blog-user");

                console.log(userDetails);
                if (!userDetails) {
                    navigate("/register");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userDetails = await JSON.parse(localStorage.getItem('blog-user'));

            if (!userDetails) {
                navigate("/register");
            } else {
                const response = await axios.post(`${addBlogRoutes}/:${userDetails._id}`, {
                    id: userDetails._id,
                    title: title,
                    author: author,
                    date: date,
                    category: category,
                    content: content,
                    tags: tags,
                    imageUrl: imageUrl,
                    featured: featured,
                });

                if (response.data.status === false) {
                    toast.error(`${response.data.message}`);
                } else if (response.data.status === true) {
                    toast.success(`${response.data.message}`);
                    navigate("/myblogs");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleTagChange = (tag) => {
        const updatedTags = [...tags];
        const tagIndex = updatedTags.indexOf(tag);

        if (tagIndex === -1) {
            updatedTags.push(tag);
        } else {
            updatedTags.splice(tagIndex, 1);
        }

        setTags(updatedTags);
    };

    const tagOptions = [
        'Technology',
        'Sports',
        'Current Affairs',
        'World Wide',
        'Plants',
        'Animals',
        'Health',
        'Food',
        'Travel',
        'Fashion',
        'Science',
    ];






    const handleBlogEditorTool = () => {
        navigate("/createblogeditor");
    };


    return (
        <>

            <div className="m-10">
                <div className="text-center">
                    <button onClick={handleBlogEditorTool} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Open Editor Tool
                    </button>
                </div>
            </div>

            {/* <h1>{message}</h1> */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-8 border rounded-md shadow-lg bg-white mb-8">
                <h2 className="text-2xl font-semibold mb-4">Create a New Blog</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter blog title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Enter author name"
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="default" defaultValue disabled>
                            Select one
                        </option>
                        <option value="technology">Technology</option>
                        <option value="sports">Sports</option>
                        <option value="current affairs">Current Affairs</option>
                        <option value="world wide">World Wide</option>
                        <option value="plants">Plants</option>
                        <option value="animals">Animals</option>
                        <option value="health">Health</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="fashion">Fashion</option>
                        <option value="science">Science</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                        Content
                    </label>
                    {/* <textarea
                        id="content"
                        name="content"
                        placeholder="Enter blog content"
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    ></textarea> */}

                    {/* using the jodit editor handleRemoveMemberFromGroup
                     */}

                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                    />

                </div>

                {/* tags starts */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Tags</label>
                    <div className="flex flex-wrap">
                        {tagOptions.map((tag) => (
                            <label key={tag} className="inline-flex items-center mr-4 mb-2">
                                <input
                                    type="checkbox"
                                    value={tag}
                                    checked={tags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span className="ml-2">{tag}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* tags end */}

                <div className="mb-4">
                    <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageURL"
                        name="imageURL"
                        placeholder="Enter image URL"
                        onChange={(e) => setImageURL(e.target.value)}
                        className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="featured" className="flex items-center">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={featured}
                            onChange={() => setFeatured(!featured)}
                            className="mr-2"
                        />
                        <span className="text-gray-700 font-bold">Featured</span>
                    </label>
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                    Submit
                </button>
            </form>
            <ToastContainer />
        </>
    );
}

export default CreateBlog;
