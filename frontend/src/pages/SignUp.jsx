import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FadeIn from "@/components/FadeIn";
import '../App.css';


// const { name, email, password, country, role, profileImage } = req.body;
export function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '' 
    });

    const [selection, setSelection] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSelection = (option) => {
        setFormData({ ...formData, role: option });
        setSelection(option);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const endpoint =  'http://localhost:8000/signup';
            // http://localhost:8000/signup
            // 'https://finvest-backend.onrender.com/signup' ;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Signup successful', data);
            // Store tokens in local storage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

            navigate('/settings');
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full lg:grid lg:grid-cols-2 min-h-screen overflow-hidden">
            <FadeIn direction="right" delay={0.3} fullWidth>
                <div className="flex flex-col items-center justify-center bg-white relative min-h-[500px] lg:min-h-screen w-full p-8">
                    <img className="absolute right-0 top-0 md:w-auto z-[3]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721207935/cjk9icycengk9xcczm05.png" alt="" />
                    <img className="absolute left-0 bottom-0 z-0 w-auto" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133537/lye4qxmyubg7wuj8exvt.svg" alt="" />
                    <Link to="/" className="absolute top-0 left-0 flex flex-row items-center justify-center cursor-pointer p-5 z-[999]">
                        <FadeIn direction="right" delay={0.3}>
                            <img className="md:h-[50px] h-[30px] md:pr-2" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721187808/srktgdcijec0zqmlgvbh.png" alt="Logo" />
                            <h1 className="md:text-4xl text-3xl font-semibold text-[#1B7A57] cursor-pointer">Finvest</h1>
                        </FadeIn>
                    </Link>
                    <div className="h-auto relative text-center z-[5] max-w-md mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-[#1B7A57]">Join Us!</h1>
                        <p className="mt-4 text-md md:text-lg text-[#05140D]">SELECT YOUR ROLE</p>
                        <div className="mt-8 flex flex-col gap-4">
                            <Button
                                variant="outline"
                                className={`w-full border-[#1B7A57] text-[#1B7A57] py-2 rounded-md transition-transform transform ${selection === "Investor" ? "scale-105 border-[#0e3a26]" : "hover:scale-105"}`}
                                onClick={() => handleSelection("Investor")}
                            >
                                Investor
                                {selection === "Investor" && (
                                    <span className="ml-2 text-green-500">&#10003;</span>
                                )}
                            </Button>
                            
                            <Button
                                variant="outline"
                                className={`w-full border-[#1B7A57] text-[#1B7A57] py-2 rounded-md transition-transform transform ${selection === "Organisation" ? "scale-105 border-[#0e3a26]" : "hover:scale-105"}`}
                                onClick={() => handleSelection("Organisation")}
                            >
                                Organisation
                                {selection === "Organisation" && (
                                    <span className="ml-2 text-green-500">&#10003;</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {!selection && (
                <>
                    <FadeIn direction="up" delay={0.3} fullWidth className="flex items-center justify-center w-full bg-[#05140D] p-4 lg:p-0">
                        <img className="absolute overflow-hidden right-0 z-0" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133535/duitolguodf7th7fzzek.svg" alt="" />
                        <div className="relative mx-auto flex flex-col items-center justify-center w-full max-w-[90%] min-h-[500px] gap-3 z-10 animate-fade-in">
                            <h1 className="neon-mist md:text-7xl text-5xl text-white font-semibold text-center py-3 z-[5]">
                                Welcome to Finvest
                            </h1>
                            <FadeIn direction="up" delay={0.3} fullWidth>
                                <h3 className="text-3xl text-white text-center py-3 z-[5]">
                                    Choose an option to continue
                                </h3>
                            </FadeIn>
                            <FadeIn direction="up" delay={0.3} fullWidth>
                                <div className="text-center text-md text-[#E8F6F3]">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline text-[#1B7A57]">
                                        Login
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </FadeIn>
                    <img
                        className="absolute bottom-0 right-0 z-1 lg:w-[50%]"
                        src="https://res.cloudinary.com/djoebsejh/image/upload/v1721132768/re68ribffzls2bjx4khn.svg"
                        alt="Background End"
                    />
                </>
            )}

            {selection && (
                <>
                    <img
                        className="absolute bottom-0 right-0 z-1 lg:w-[50%]"
                        src="https://res.cloudinary.com/djoebsejh/image/upload/v1721132768/re68ribffzls2bjx4khn.svg"
                        alt="Background End"
                    />
                    <FadeIn direction="up" delay={0.3} fullWidth className="flex items-center justify-center bg-[#05140D] p-4 lg:p-0">
                        <img className="absolute overflow-hidden right-0 z-0" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133535/duitolguodf7th7fzzek.svg" alt="" />
                        <div className="relative mx-auto grid w-full max-w-[320px] sm:max-w-[500px] gap-6 z-10 animate-fade-in bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg my-10 lg:my-0 md:p-5 md:px-10 p-6 shadow-lg">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-4xl md:text-5xl font-bold py-2 text-white">Sign Up</h1>
                                <p className="text-md md:text-lg text-[#E8F6F3]">
                                    Enter your details below to create a new account
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName" className="text-white">Username</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-white">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-white">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="mt-4 bg-[#1B7A57] hover:bg-[#154d3d]">
                                    {loading ? 'Signing up...' : 'Sign Up'}
                                </Button>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </form>
                            <div className="text-center text-md text-[#E8F6F3] mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="underline text-[#1B7A57]">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </>
            )}
        </div>
    );
}
