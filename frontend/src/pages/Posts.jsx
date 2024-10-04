import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeartIcon, Share2, Search, MessageCircle, Send, PlusCircle, ArrowBigUpDash, ArrowBigDownDash } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import UserProfileIcon from '@/components/ui/UserProfileIcon';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostsPageSkeleton from '@/components/ui/PostsPageSkeleton';  // Import the skeleton component

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [userLikes, setUserLikes] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const urls = [
            'https://finvest-backend.onrender.com/posts',
            'http://localhost:8000/posts',
        ];

        const fetchPosts = async () => {
            try {
                const data = await fetchPostData(urls);
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch post data from all sources:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const fetchPostData = async (urls) => {
        for (const url of urls) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.error(`Failed to fetch from ${url}`, error);
            }
        }
        throw new Error('All fetch attempts failed.');
    };

    const handleLike = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, likes: userLikes[postId] ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );

        setUserLikes((prevUserLikes) => ({
            ...prevUserLikes,
            [postId]: !prevUserLikes[postId],
        }));
    };

    return (
        <div className="flex min-h-screen w-full bg-[#05140D] ">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between gap-4 h-16 px-4 bg-[#05140D] border-b border-gray-700">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full md:px-3 z-[5] line-clamp-1">
                            Posts
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-300" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-[#05140D] text-white placeholder-gray-300 pl-8 md:w-[200px] lg:w-[336px] border border-gray-600"
                            />
                        </div>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.1}>
                        <Link to="/posts/new-post">
                            <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574]">
                                <PlusCircle className="h-5 w-5" />
                                New Post
                            </Button>
                        </Link>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon />
                    </FadeIn>
                </header>

                {/* Display Skeleton while loading */}
                {loading ? (
                    <PostsPageSkeleton />
                ) : (
                    <FadeIn direction="up" delay={0.2} fullWidth>
                        <div className="p-4 md:p-10 grid grid-cols-1 gap-6 w-full">
                            {posts.map((post) => (
                                <Card key={post.id} className="bg-[#13261F] text-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row w-full border-0">
                                    <div className="flex-1 p-4">
                                        <img src={post.image} alt={post.description} className="w-full h-96 object-cover rounded-lg" />
                                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                                            <Avatar>
                                                <AvatarImage src={post.avatar} alt={post.name} />
                                                <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-lg font-semibold">{post.name}</p>
                                                <p className="text-sm text-gray-400">{format(new Date(post.date), 'MMMM dd, yyyy')}</p>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 flex-grow">
                                            <p>{post.description}</p>
                                        </CardContent>
                                        <CardFooter className="flex lg:flex-row flex-col gap-6 md:gap-4  justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    className={`flex items-center gap-1 mb-0 ${userLikes[post.id] ? 'text-red-500 animate-heart' : 'text-gray-400'}`}
                                                    onClick={() => handleLike(post.id)}
                                                >
                                                    <HeartIcon
                                                        className="w-5 h-5"
                                                        fill={userLikes[post.id] ? '#ff4d4f' : 'none'}
                                                        stroke={userLikes[post.id] ? '#ff4d4f' : 'currentColor'}
                                                    />
                                                    {post.likes}
                                                </Button>

                                                <Button variant="ghost" className="flex items-center gap-1 text-gray-400 mb-0">
                                                    <Share2 className="w-5 h-5" />
                                                    {post.shares}
                                                </Button>
                                                <Button variant="ghost" className="flex items-center gap-1 text-gray-400 mb-0">
                                                    <MessageCircle className="w-5 h-5" />
                                                    {post.comments.length}
                                                </Button>
                                            </div>
                                            <div className="flex flex-row gap-4 items-center justify-center">
                                                <Button
                                                    className="px-4 py-2 bg-[#2FB574] hover:bg-[#0c2f1f] text-white rounded-md transition-colors duration-300"
                                                >
                                                    <ArrowBigUpDash className="h-5 w-5 mr-2" />
                                                    Upvote
                                                </Button>
                                                <Button
                                                    className="px-4 py-2 bg-[#0c2f1f] hover:bg-[#0c2f1f] text-white rounded-md transition-colors duration-300"
                                                >
                                                    <ArrowBigDownDash className="h-5 w-5 mr-2" />
                                                    Downvote
                                                </Button>
                                                {/* <Button className="bg-[#2FB574] text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                                    Invest
                                                </Button> */}
                                            </div>
                                        </CardFooter>
                                    </div>
                                    <div className="flex-2 p-4 pt-2 bg-[#13261F] md:border-l border-t md:border-t-0 border-gray-600">
                                        <div className="flex flex-col w-full h-full justify-between">
                                            <div className="">
                                                {post.comments.map((comment) => (
                                                    <div key={comment.id} className="flex items-start gap-2 mt-2 p-2">
                                                        <Avatar>
                                                            <AvatarImage src={comment.avatar} alt={comment.name} />
                                                            <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-[0.8em] font-semibold text-white">{comment.name}</p>
                                                            <p className="text-sm text-gray-400">{comment.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="relative mt-4 flex flex-row bottom-0 items-center justify-evenly gap-2">
                                                <Input
                                                    placeholder="Write a comment..."
                                                    className="rounded-lg bg-[#05140D] text-white placeholder-gray-400 pl-4 pr-12 py-2 border-0"
                                                />
                                                <Button className="bg-[#2FB574] text-white py-1 px-4 rounded-lg">
                                                    <Send className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    );
}

export default PostsPage;
