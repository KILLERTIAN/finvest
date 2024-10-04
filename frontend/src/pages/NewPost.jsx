import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Send } from 'lucide-react';
import UserProfileIcon from '@/components/ui/UserProfileIcon';
import { GenAILoader } from '@/components/GenAILoader'; // Assuming this is the loader component

function NewPost() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user')) || {}; // Fetch user data
    const [formData, setFormData] = useState({
        content: '',
        image: null,
    });
    const [generating, setGenerating] = useState(false);
    const [posting, setPosting] = useState(false); // New state for tracking post submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const generateContent = async () => {
        setGenerating(true);
        const urls = [
            'https://finvest-backend.onrender.com/generate-content',
            'http://localhost:8000/generate-content',
        ];

        const generateFromURL = async (url) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: formData.content,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error(`Error generating content from ${url}:`, error);
                throw error;
            }
        };

        for (let url of urls) {
            try {
                const result = await generateFromURL(url);
                setFormData({ ...formData, content: result.content });
                break;
            } catch (error) {
                console.error(`Attempt to generate content from ${url} failed.`);
            }
        }

        setGenerating(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true);

        const urls = [
            'https://finvest-backend.onrender.com/post/new-post',
            'http://localhost:8000/post/new-post',
        ];

        const data = new FormData();
        data.append('description', formData.content);
        data.append('image', formData.image);
        data.append('name', storedUser?.user?.name || 'Guest'); 
        data.append('avatar', storedUser?.user?.profileImage || ''); 

        const postToURL = async (url) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: data,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error(`Error creating post at ${url}:`, error);
                throw error;
            }
        };

        for (let url of urls) {
            try {
                const result = await postToURL(url);
                console.log('Post created successfully:', result);
                navigate('/posts');
                break;
            } catch (error) {
                console.error(`Attempt to create post at ${url} failed.`);
            }
        }

        setPosting(false);
    };

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-700">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-4 md:px-3 z-[5] line-clamp-1">
                            New Post
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}>
                        <Link to="/posts">
                            <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4">
                                View Posts
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon />
                    </FadeIn>
                </header>
                <FadeIn direction="up" delay={0.2} fullWidth>
                    <div className="p-10 flex flex-col w-full gap-10 items-center relative">
                        <form className="w-full space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="relative mb-6">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className="h-80 w-full bg-[#1A3A2C] rounded-[30px] flex items-center justify-center overflow-hidden">
                                            {formData.image ? (
                                                <img src={URL.createObjectURL(formData.image)} alt="Post" className="object-cover h-full w-full" />
                                            ) : (
                                                <p className="text-gray-100 text-2xl font-semibold">Upload Image</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative w-full">
                                        <Textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            placeholder="Post Content"
                                            required
                                            className="w-full min-h-[200px] border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100 relative"
                                        />
                                        <div
                                            className="absolute top-0 right-0 group bg-[#05140D] rounded-full cursor-pointer"
                                            onClick={generateContent}
                                        >
                                            <div className="p-2 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:w-auto group-hover:px-6 relative">
                                                <img
                                                    src="https://res.cloudinary.com/djoebsejh/image/upload/v1726770404/hv6zuuvecriwco3tkdjf.png"
                                                    alt="Genrate"
                                                    className="h-8 w-8"
                                                />
                                                <span className="ml-2 text-white hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                                    Generate with AI
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {generating && (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <GenAILoader />
                                </div>
                            )}
                            {posting && (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <GenAILoader />
                                </div>
                            )}
                            <Button 
                                type="submit" 
                                className="w-full mt-5 bg-[#2FB574] text-white py-2 rounded-[30px] hover:bg-[#26925e]" 
                                disabled={posting} // Disable button while posting
                            >
                                {posting ? "Publishing..." : "Publish Post"}
                                <Send className="h-5 w-5 mx-3" />
                            </Button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default NewPost;
