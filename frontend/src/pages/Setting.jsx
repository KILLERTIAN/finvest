import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
import { WalletContext } from '@/context/WalletContext';
import Sidebar from '@/components/Sidebar';
// import WalletConnectButton from '@/components/WalletConnectButton';
import UserProfileIcon from '@/components/ui/UserProfileIcon';
import FadeIn from '@/components/FadeIn';
import ProfileSection from '@/components/ProfileSection';
import AccountSection from '@/components/AccountSection';
import AppearanceSection from '@/components/AppearanceSection';
import NotificationSection from '@/components/NotificationSection';
import SupportAndFAQ from '@/components/SupportAndFAQ';
// import { walletconnect } from 'web3modal/dist/providers/connectors';

export const Setting = () => {
    const navigate = useNavigate();
    const { connectWallet } = useContext(WalletContext);

    const [userType, setUserType] = useState('investor');
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        contact: '',
        category: '',
        category1: '',
        image: '',
        motive: '',
    });

    const [activeSection, setActiveSection] = useState('profile');

    const investorCategory = [
        "Individual", "Community", "Company"
    ];
    const donationCategory = [
        "Startup", "NGO", "Healthcare", "Education", "Environment", "Animal Welfare", "Arts & Culture", "Community Development"
    ];
    const categories1 = [
        "India", "United States", "United Kingdom", "Japan", "Denmark", "Finland", "Yemen", "Oman", "Qatar", "Zimbabwe", "Iran", "Russia", "Algeria", "Sweden", "Netherlands", "Australia", "France", "Poland", "New Zealand", "Germany", "Switzerland"
    ];
    const themes = [
        "Dark", "Light", "System"
    ]

    const fonts = [
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Oswald',
        'Source Sans Pro',
        'Raleway',
        'Poppins',
        'Merriweather',
        'Ubuntu',
        'Nunito',
        'PT Sans',
        'Lora',
        'Playfair Display',
        'Mukta',
    ];



    const sectionRefs = {
        profile: useRef(null),
        account: useRef(null),
        support: useRef(null),
        appearance: useRef(null),
        notification: useRef(null),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    const handleCategoryChange1 = (value) => {
        setFormData({ ...formData, category1: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/dashboard');
    };

    const scrollToSection = (section) => {
        const isSectionFilled = validateSection(section);
        if (isSectionFilled) {
            sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateSection = (section) => {
        switch (section) {
            case 'profile':
                return formData.username && formData.bio && formData.contact && formData.category1;
            case 'account':
                return true;
            case 'support':
                return true;
            case 'appearance':
                return true;
            case 'notification':
                return true;
            default:
                return false;
        }
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);



    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden">
            <div className="flex-1 sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden scrollbar-hidden bg-[#05140D]">
                <header className="fixed top-0 lg:pt-4 w-full sm:w-[calc(100%-56px)] z-30 flex items-center justify-between h-14 lg:h-20 px-4 bg-[#05140D] border-b border-gray-700">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.1} fullWidth className="justify-start">
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-2 pl-4 md:px-3 z-[5]">Settings</h1>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.1}>
                        <UserProfileIcon />
                    </FadeIn>
                </header>


                <div className="flex flex-col w-full mt-16 gap-10 items-center">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full lg:flex-row  lg:justify-evenly lg:gap-10">
                            <div className="flex-2 flex lg:min-w-[20%] flex-col bg-[#05140D] lg:pl-10 py-5 rounded-[30px]">
                                <nav className="fixed w-[200px] hidden lg:flex flex-col items-start justify-start gap-4 z-[1]">
                                    <a
                                        href="#profile-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'profile-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('profile');
                                        }}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#account-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'account-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('account');
                                        }}
                                    >
                                        Account
                                    </a>
                                    <a
                                        href="#appearance-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'appearance-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('appearance');
                                        }}
                                    >
                                        Appearance
                                    </a>
                                    <a
                                        href="#notification-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'notification-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('notification');
                                        }}
                                    >
                                        Notification
                                    </a>
                                    <a
                                        href="#support-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'support-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('support');
                                        }}
                                    >
                                        Support
                                    </a>
                                </nav>
                                {/* Navigation for smaller screens */}
                                <nav className="fixed top-12 md:w-[calc(100%-56px)] lg:hidden flex items-center justify-between bg-[#05140D] p-2 pt-4 shadow-md w-full z-[1]">
                                    <div className="flex justify-evenly w-full overflow-scroll scrollbar-hidden">
                                        <a
                                            href="#profile-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'profile-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('profile');
                                            }}
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="#account-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'account-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('account');
                                            }}
                                        >
                                            Account
                                        </a>
                                        <a
                                            href="#appearance-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'appearance-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('appearance');
                                            }}
                                        >
                                            Appearance
                                        </a>
                                        <a
                                            href="#notification-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'notification-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('notification');
                                            }}
                                        >
                                            Notification
                                        </a>
                                        <a
                                            href="#support-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'support-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('support');
                                            }}
                                        >
                                            Support
                                        </a>
                                    </div>
                                </nav>
                            </div>

                            <div className="flex-1 py-8 md:pr-10 px-10 rounded-[30px]">
                                <ProfileSection
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleImageChange={handleImageChange}
                                    handleCategoryChange={handleCategoryChange}
                                    handleCategoryChange1={handleCategoryChange1}
                                    scrollToSection={scrollToSection}
                                    userType={userType}
                                    investorCategory={investorCategory}
                                    donationCategory={donationCategory}
                                    categories1={categories1}
                                    sectionRef={sectionRefs.profile}
                                />
                                <AccountSection
                                    sectionRef={sectionRefs.account}
                                    formData={formData}
                                    handleChange={handleChange}
                                    connectWallet={connectWallet}
                                    scrollToSection={scrollToSection}
                                />
                                <AppearanceSection
                                    sectionRef={sectionRefs.appearance}
                                    formData={formData}
                                    handleChange={handleChange}
                                    scrollToSection={scrollToSection}
                                    themes={themes}
                                    fonts={fonts}
                                />
                                <NotificationSection
                                    sectionRef={sectionRefs.notification}
                                    formData={formData}
                                    handleChange={handleChange}
                                />
                                <SupportAndFAQ
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleSubmit={handleSubmit}
                                    sectionRef={sectionRefs.support}
                                />

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
