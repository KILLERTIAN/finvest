import  { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Share2, ArrowBigUpDash } from "lucide-react";
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import Filter from '@/components/Filter';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserProfileIcon from '@/components/ui/UserProfileIcon';
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import '../App.css';
import useAuth from '@/utils/auth';

const fetchProjectData = async (urls) => {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching project data from ${url}:`, error);
        }
    }
    throw new Error('All fetch attempts failed');
};

function Projects() {
    const [projects, setProjects] = useState([]);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [userUpvotes, setUserUpvotes] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const { isLoggedIn, user } = useAuth();
    useEffect(() => {
        const urls = [
            'https://finvest-backend.onrender.com/project/getAllProjects',
            'http://localhost:8000/project/getAllProjects',
            // '/projects.json'
        ];
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');

        // Check if userData is not null or undefined
        if (userData) {
            try {
                const data = JSON.parse(userData);
                console.log('Parsed data:', data); // Debugging line
                // Access the nested user object and set the role
                setUserRole(data.user?.role); // Use optional chaining
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            console.log('No user data found in local storage');
        }

        const fetchData = async () => {
            try {
                const data = await fetchProjectData(urls);
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch project data from all sources:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleUpvote = (projectId) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === projectId
                    ? { ...project, upvotes: userUpvotes[projectId] ? project.upvotes - 1 : project.upvotes + 1 }
                    : project
            )
        );

        setUserUpvotes((prevUserUpvotes) => ({
            ...prevUserUpvotes,
            [projectId]: !prevUserUpvotes[projectId],
        }));
    };

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden bg-[#05140D] text-white">
            <div className="flex-1 sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden scrollbar-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-800">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.1} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-2 pl-4 md:px-3 z-[5]">Projects</h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.1}>
                        {
                            userRole === 'Organisation' && (
                                <Link to="/projects/post-project">
                            <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4">
                                <PlusCircle className="h-5 w-5" />
                                Post a Project
                            </Button>
                        </Link>
                            )
                        }
                    </FadeIn>
                    {
                        isLoggedIn && 
                        <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon />
                    </FadeIn>
                    }
                </header>


                <FadeIn direction="up" delay={0.2} fullWidth>
                    <Filter />
                </FadeIn>

                <FadeIn direction="up" delay={0.3} fullWidth className="overflow-hidden scrollbar-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-5 md:p-10 overflow-hidden scrollbar-hidden w-full">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonCard key={index} />
                            ))
                        ) : (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="relative h-[400px] w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer bg-[#10251C]"
                                    onMouseEnter={() => setHoveredProject(project.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                    onClick={() => handleProjectClick(project.id)}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 p-2 bg-[#1A3A2C] rounded-full shadow-md hover:bg-[#2FB574] transition-colors cursor-pointer">
                                        <Share2 className="h-4 w-4 text-white" />
                                    </div>
                                    <div
                                        className={`absolute inset-0 rounded-xl p-4 bg-gradient-to-t from-[#10251C] to-[#13261F] transition-transform duration-500 ease-in-out ${hoveredProject === project.id ? "translate-y-[15%]" : "translate-y-[30%]"
                                            }`}
                                    >
                                        <div
                                            className="absolute top-2 right-4 flex items-center justify-center p-2 bg-[#1A3A2C] rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpvote(project.id);
                                            }}
                                        >
                                            <ArrowBigUpDash
                                                className={`h-6 w-6 ${userUpvotes[project.id] ? "text-[#2FB574]" : "text-white"
                                                    } transition-colors`}
                                            />
                                            {project.upvotes > 0 && (
                                                <span className="ml-1 text-xs font-semibold text-white">
                                                    {project.upvotes}
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="xl:text-2xl text-xl font-bold sm:line-clamp-1 text-white">
                                            {project.title}
                                        </h2>
                                        <div className="flex items-center mt-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={project.avatar} alt={project.creator} />
                                                <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <p className="ml-2 text-sm font-medium text-white">
                                                {project.creator}
                                            </p>
                                        </div>
                                        <p className="mt-4 text-gray-300 sm:line-clamp-3 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="mt-4 flex justify-between">
                                            <p className="text-[#2FB574] font-semibold text-xl flex flex-col">
                                                {project.amountRaised}
                                                <span className="bg-[#2FB574] text-white text-[12px] px-3 py-0 mt-2 rounded-full line-clamp-1">
                                                    Total Amount Raised
                                                </span>
                                            </p>
                                            <p className="text-gray-300 font-medium text-sm">
                                                {project.contributors} contributors
                                            </p>
                                        </div>
                                        {hoveredProject === project.id && (
                                            <Button className="mt-4 w-full bg-[#2FB574] text-white py-2 rounded-md hover:bg-green-700">
                                                Donate / Invest
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </FadeIn>

            </div>
        </div>
    );
}

export default Projects;
