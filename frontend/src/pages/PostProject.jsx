import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";
import FadeIn from "@/components/FadeIn";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Send } from "lucide-react";
import UserProfileIcon from "@/components/ui/UserProfileIcon";
import { WalletContext } from "@/context/WalletContext";
import { createProjectOnBlockchain } from "@/utils/blockchainUtils";
import { ethers } from "ethers";
import { GenAILoader } from '@/components/GenAILoader';

function PostProject() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amountNeeded: "",
    minDonation: "",
    category: "",
    milestones: [
      { title: "", description: "", completionDate: "", amountRequired: "" },
      { title: "", description: "", completionDate: "", amountRequired: "" },
    ],
    image: null,
  });
  const [milestoneCount, setMilestoneCount] = useState(2);
  const { signer , connectWallet } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const categories = [
    "Art & Culture",
    "Community",
    "Economics & Infrastructure",
    "Education",
    "Environment & Energy",
    "Equality",
    "Finance",
    "Healthcare",
    "Nature",
    "NGO",
    "Charity",
    "Technology",
  ];

  const generateContent = async () => {
    setGenerating(true);
    const urls = [
      'https://finvest-bub4.onrender.com/generate-project-content',
      // 'http://localhost:8000/generate-project-content',
    ];

    const generateFromURL = async (url) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            promptData: {
              title: formData.title,
              description: formData.description,
              amountNeeded: formData.amountNeeded,
              minDonation: formData.minDonation,
              category: formData.category,
              milestones: formData.milestones,
            },
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
        if (typeof result.content === 'string') {
          let contentString = result.content;
          contentString = contentString.replace(/```json|```/g, '').trim();
          const parsedContent = JSON.parse(contentString.replace(/\\\"/g, '"'));
          console.log('Parsed content:', parsedContent);
          const generatedMilestones = Array.isArray(parsedContent.milestones) ? parsedContent.milestones : [];
          const newMilestoneCount = Math.max(generatedMilestones.length, 2);
          setFormData({
            ...formData,
            title: parsedContent.title,
            description: parsedContent.description,
            amountNeeded: parsedContent.amountNeeded,
            minDonation: parsedContent.minDonation,
            // category: parsedContent.category,
            milestones: Array.isArray(parsedContent.milestones) && parsedContent.milestones.length > 0 ? parsedContent.milestones : formData.milestones,
          });
          setMilestoneCount(newMilestoneCount);

        } else {
          console.error('Content is not a string:', result.content);
        }
      } catch (error) {
        console.error(`Attempt to generate content from ${url} failed.`, error);
      } finally {
        // setGenerating(false);
      }
    }

    setGenerating(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMilestoneChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index][name] = value;
    setFormData({ ...formData, milestones: updatedMilestones });
  };

  const handleMilestoneCountChange = (e) => {
    const count = parseInt(e.target.value, 10);

    // Preserve existing milestones
    const currentMilestones = formData.milestones;

    if (count > currentMilestones.length) {
      // Add empty milestones if the count is increased
      const newMilestones = [
        ...currentMilestones,
        ...Array(count - currentMilestones.length).fill({
          title: "",
          description: "",
          completionDate: "",
          amountRequired: "",
        }),
      ];
      setFormData({ ...formData, milestones: newMilestones });
    } else {
      // Truncate the array if the count is decreased
      const truncatedMilestones = currentMilestones.slice(0, count);
      setFormData({ ...formData, milestones: truncatedMilestones });
    }

    setMilestoneCount(count);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ethToUsdRate = 2410.28;
    console.log(signer);
    

    const amountInEth = formData.amountNeeded / ethToUsdRate;
    const amountInWei = ethers.utils.parseEther(amountInEth.toString());

    const blockchainMilestones = formData.milestones.map((milestone) => ({
      title: milestone.title,
      amountRequired: ethers.utils.parseEther((milestone.amountRequired / ethToUsdRate).toString()), // Convert USD to Wei
      recipient: '0xA5150981807ac926636be5713EF62A21DDC86f8C', // Placeholder, replace with actual recipient
      isCompleted: false,
    }));

    try {
      setLoading(true);
      console.log("Creating project on blockchain...")
      await connectWallet();
      if (!signer) {
        await connectWallet();
      }

      const transactionHash = await createProjectOnBlockchain(signer, amountInWei, blockchainMilestones);
      setLoading(false)
      console.log('Project created on blockchain with hash:', transactionHash);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("creator", storedUser?.user?.name); 
      data.append("avatar", storedUser?.user?.profileImage || ''); 
      data.append("image", formData.image);
      data.append("amountRaised", "$0"); 
      data.append("contributors", 0); 
      data.append("upvotes", 0); 
      data.append("minimumDonation", formData.minDonation);
      const backendMilestones = formData.milestones.map((milestone, index) => ({
        title: milestone.title,
        description: milestone.description,
        completionDate: milestone.completionDate,
        amountRequired: milestone.amountRequired, // Keep as USD value for the backend
        upvotes: 0, // Placeholder, replace with dynamic data if needed
        downvotes: 0, // Placeholder, replace with dynamic data if needed
      }));

      data.append('milestones', JSON.stringify(backendMilestones));
      //   data.append("milestones", JSON.stringify(formData.milestones));
      // data.append('blockchainHash', transactionHash); // Pass the blockchain transaction hash
      // http://localhost:8000/project/create
      // https://finvest-bub4.onrender.com/project/create
      //https://finvest-bub4.onrender.com

      const response = await fetch("http://localhost:8000/project/create", {
        method: "POST",
        body: data,
        headers: {},
      });

      const result = await response.json();
      console.log("Project created successfully on backend:", result);
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const milestoneProgress = formData.milestones.filter(
    (milestone) =>
      milestone.title &&
      milestone.description &&
      milestone.completionDate &&
      milestone.amountRequired
  ).length;

  const totalMilestones = milestoneCount;
  const progressPercentage =
    totalMilestones > 0 ? (milestoneProgress / totalMilestones) * 100 : 0;



  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-700">
          <Sidebar />
          <FadeIn direction="down" delay={0.2} fullWidth>
            <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-4 md:px-3 z-[5] line-clamp-1">
              New Project
            </h1>
          </FadeIn>
          <FadeIn direction="down" delay={0.2}>
            <Link to="/projects">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4"
              >
                View Projects
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <UserProfileIcon />
          </FadeIn>
        </header>
        <FadeIn direction="up" delay={0.2} fullWidth>
          <div className="p-10 flex flex-col w-full gap-10 items-center">
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
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Project"
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <p className="text-gray-100 text-2xl font-semibold">
                          Upload Image
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Project Name"
                      required
                      className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 focus:outline-none text-xl text-white placeholder:text-gray-100"
                    />

                    <div className="relative w-full">


                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Project Description"
                        required
                        className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                      />

                      <div
                        className="absolute top-0 right-0 group bg-[#05140D] rounded-full cursor-pointer"
                        onClick={generateContent}
                      >
                        <div className="p-2 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:w-auto group-hover:px-6 relative">
                          <img
                            src="https://res.cloudinary.com/djoebsejh/image/upload/v1726770404/hv6zuuvecriwco3tkdjf.png"
                            alt="Generate"
                            className="h-8 w-8"
                          />
                          <span className="ml-2 text-white hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Generate with AI
                          </span>
                        </div>
                      </div>
                    </div>

                    <Input
                      type="number"
                      name="amountNeeded"
                      value={formData.amountNeeded}
                      onChange={handleChange}
                      placeholder="Amount Needed (In $)"
                      required
                      className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                    />
                    <Input
                      type="number"
                      name="minDonation"
                      value={formData.minDonation}
                      onChange={handleChange}
                      placeholder="Minimum Amount (In $)"
                      required
                      className="w-full px-4 py-2 border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                    />

                    <Select
                      value={formData.category}
                      onValueChange={handleCategoryChange}
                      placeholder="Select Category"
                      className="w-full focus:ring-0 text-white px-2 py-2 bg-[#1A3A2C] placeholder:text-gray-100"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      onFocus={(e) => (e.target.style.boxShadow = "none")}
                      onBlur={(e) => (e.target.style.boxShadow = "none")}
                    >
                      <SelectTrigger className="w-full border-0 border-b border-gray-500 focus:ring-0 text-white px-2 py-2">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2C5440]">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                </div>

                <div className="flex-2 min-w-[35%]">
                  <div className="bg-[#1A3A2C] rounded-[30px] p-6 space-y-4 relative">
                    <label className="block text-gray-400">
                      Number of Milestones
                    </label>
                    <Input
                      type="number"
                      name="milestoneCount"
                      value={milestoneCount}
                      onChange={handleMilestoneCountChange}
                      className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                      min="2"
                    />
                    <div className="relative mt-6">
                      <div className="absolute left-2 top-0 bottom-0 w-2 bg-[#2C5440] rounded-full"></div>
                      <div
                        className="absolute left-2 top-0 bottom-0 w-2 bg-[#2FB574] rounded-full"
                        style={{ height: `${progressPercentage}%` }}
                      ></div>
                      {Array.from({ length: milestoneCount }).map(
                        (_, index) => (
                          <div key={index} className="flex flex-col space-y-2">
                            <div className="flex flex-row items-center gap-4 space-x-1">
                              <div
                                className={`ml-[1px] h-5 w-6 z-[5] rounded-full ${formData.milestones[index]?.title
                                  ? "bg-[#26925e]"
                                  : "bg-gray-300"
                                  }`}
                              />
                              <div className="flex flex-col w-full space-y-2 mb-4">
                                <Input
                                  type="text"
                                  name="title"
                                  value={formData.milestones[index]?.title || ""}
                                  onChange={(e) => handleMilestoneChange(e, index)}
                                  placeholder={`Milestone ${index + 1} Title`}
                                  className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                  required
                                />

                                <Textarea
                                  name="description"
                                  value={formData.milestones[index]?.description || ""}
                                  onChange={(e) => handleMilestoneChange(e, index)}
                                  placeholder={`Milestone ${index + 1} Description`}
                                  className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                  required
                                />
                                <Input
                                  type="date"
                                  name="completionDate"
                                  value={
                                    formData.milestones[index]
                                      ?.completionDate || ""
                                  }
                                  onChange={(e) =>
                                    handleMilestoneChange(e, index)
                                  }
                                  className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                  required
                                />

                                <Input
                                  type="number"
                                  name="amountRequired"
                                  value={formData.milestones[index]?.amountRequired || ""}
                                  onChange={(e) => handleMilestoneChange(e, index)}
                                  placeholder="Amount Required (In $)"
                                  className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                  required
                                />
                              </div>

                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {loading && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <GenAILoader />
                    </div>
                  )}
                  {generating && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <GenAILoader />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full mt-5 bg-[#2FB574] text-white py-2 rounded-[30px] hover:bg-[#26925e]"
                  >
                    Post Project
                    <Send className="h-5 w-5 mx-3" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
export default PostProject;
