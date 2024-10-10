// ProfileSection.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronRight } from 'lucide-react'; // Adjust if necessary

const ProfileSection = ({ formData, handleChange, handleImageChange, handleCategoryChange, handleCategoryChange1, scrollToSection, userType, investorCategory, donationCategory, categories1, sectionRef }) => {
    return (
        <section ref={sectionRef} id="profile-section" className="scroll-mt-40 lg:scroll-mt-24 min-h-screen text-white">
            <div className="text-3xl md:text-4xl font-bold pb-4 md:pb-8">Let's set your profile</div>
            <div className="relative mb-6 flex flex-row items-center">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                />
                <div className="h-24 w-24 md:h-32 md:w-32 bg-[#1A3A2C] border-4 border-[#2C5440] rounded-full flex items-center justify-center overflow-hidden">
                    {formData.image ? (
                        <img src={formData.image} alt="Profile" className="object-cover h-full w-full" />
                    ) : (
                        <p className="text-gray-400 md:text-2xl text-md text-center font-semibold">Upload Image</p>
                    )}
                </div>
                <div className="text-xl md:text-2xl pl-5">Click to upload</div>
            </div>
            <div className="space-y-4">
                <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 focus:outline-none text-xl text-white placeholder:text-gray-100"
                    placeholder="Username"
                />
                <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                    placeholder="A brief description about you"
                />
                <Input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                    placeholder="Your contact info"
                />
                {userType === 'investor' ? (
                    <Select value={formData.category} onValueChange={handleCategoryChange} required>
                        <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2">
                            <SelectValue placeholder="Donor Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {investorCategory.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <>
                        <Select value={formData.category} onValueChange={handleCategoryChange} required>
                            <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2">
                                <SelectValue placeholder="Donee type" />
                            </SelectTrigger>
                            <SelectContent>
                                {donationCategory.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Textarea
                            id="motive"
                            name="motive"
                            placeholder="Why are you looking for funding?"
                            value={formData.motive}
                            onChange={handleChange}
                            className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2 placeholder:text-gray-100"
                            required
                        />
                    </>
                )}
                <Select
                    value={formData.category1}
                    onValueChange={handleCategoryChange1}
                    placeholder="Country"
                    className="w-full bg-transparent focus:ring-0 text-white px-2 py-2 placeholder:text-gray-100"
                    style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                    onFocus={(e) => e.target.style.boxShadow = 'none'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                >
                    <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories1.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <a
                    href="#account-section"
                    className={`relative flex w-[80px] text-center items-center p-2 pl-4 rounded-full transition-colors text-md text-white bg-[#2FB574] hover:bg-[#26925e]`}
                    onClick={() => {
                        scrollToSection('account');
                    }}
                >
                    Next
                    <ChevronRight className="h-5 w-5" />
                </a>
            </div>
        </section>
    );
};

export default ProfileSection;
