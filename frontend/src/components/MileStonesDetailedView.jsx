"use client";
import { ethers } from 'ethers';
import { getContract } from '@/utils/blockchainUtils';
import { WalletContext } from '@/context/WalletContext';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import FadeIn from './FadeIn';
import { ChevronRight, ArrowBigUpDash, ArrowBigDownDash } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfileIcon from './ui/UserProfileIcon';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Label, Sector } from 'recharts';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GenAILoader } from '@/components/GenAILoader';

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

const MilestoneDetailedView = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [displayType, setDisplayType] = useState('upvote'); // 'upvote' or 'downvote'
  const [votedMilestones, setVotedMilestones] = useState({}); // Track user votes
  const { walletAddress, connectWallet, signer } = useContext(WalletContext);
  useEffect(() => {

    const urls = [
      `https://finvest-backend.onrender.com/project/${projectId}`,
      `http://localhost:8000/project/${projectId}`,
      '/projects.json'
    ];

    // Fetch project data
    const fetchData = async () => {
      try {
        const data = await fetchProjectData(urls);
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project data from all sources:', error);
      }
    };
    fetchData();
    // // Fetch community feedback
    // fetch('/feedback.json')
    //   .then(response => response.json())
    //   .then(data => setFeedback(data))
    //   .catch(error => console.error('Error fetching feedback:', error));

    // Retrieve voted milestones from local storage
    const storedVotes = JSON.parse(localStorage.getItem('votedMilestones')) || {};
    setVotedMilestones(storedVotes);
  }, [projectId]);

  
  const handleWithdraw = async () => {
        // setLoading(true);
        // setError(null);
        if (!walletAddress || !signer) {
          await connectWallet();
      }
        console.log("Withdrawing Funds...")

        try {
            const contract = await getContract(signer);
            const transaction = await contract.withdraw(projectId);
            const receipt = await transaction.wait();
            alert('Withdrawal successful!');
        } catch (err) {
            console.error("Withdrawal error:", err);
            setError('Failed to withdraw funds. Please try again.');
        } 
      }
  const handleVote = (index, type) => {
    setProject(prevProject => {
      const updatedMilestones = [...prevProject.milestones];
      const currentVote = votedMilestones[index];

      if (type === 'upvote') {
        if (currentVote === 'upvote') return prevProject; // Already upvoted, no change
        if (currentVote === 'downvote') {
          updatedMilestones[index].downvotes -= 1; // Remove previous downvote
        }
        updatedMilestones[index].upvotes = (updatedMilestones[index].upvotes || 0) + 1;
      } else if (type === 'downvote') {
        if (currentVote === 'downvote') return prevProject; // Already downvoted, no change
        if (currentVote === 'upvote') {
          updatedMilestones[index].upvotes -= 1; // Remove previous upvote
        }
        updatedMilestones[index].downvotes = (updatedMilestones[index].downvotes || 0) + 1;
      }

      // Update local storage
      const updatedVotedMilestones = { ...votedMilestones, [index]: type };
      localStorage.setItem('votedMilestones', JSON.stringify(updatedVotedMilestones));
      setVotedMilestones(updatedVotedMilestones);

      return { ...prevProject, milestones: updatedMilestones };
    });
  };

  const calculateProgress = (milestones, totalRaised) => {
    return milestones.map(milestone => {
      const amountAllocated = Math.min(totalRaised, parseFloat(milestone.amountRequired.replace('$', '').replace(',', '')));
      totalRaised -= amountAllocated;
      return {
        ...milestone,
        amountRaised: amountAllocated,
      };
    });
  };

  const handleFeedbackSubmit = () => {
    const updatedFeedback = [...feedback, { user: "Anonymous", feedback: newFeedback }];
    setFeedback(updatedFeedback);
    setNewFeedback('');
  };

  if (!project) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[#05140D]">
        <GenAILoader />
      </div>
    );
  }

  const milestonesWithProgress = calculateProgress(project.milestones, parseFloat(project.amountRaised.replace('$', '').replace(',', '')));

  const chartData = (milestone) => {
    const totalVotes = (milestone.upvotes || 0) + (milestone.downvotes || 0);
    const positivePercentage = totalVotes === 0 ? 50 : ((milestone.upvotes || 0) / totalVotes) * 100;
    const negativePercentage = totalVotes === 0 ? 50 : ((milestone.downvotes || 0) / totalVotes) * 100;

    if (displayType === 'downvote') {
      return [
        { name: 'Positive', value: positivePercentage, fill: '#0c2f1f' }, 
        { name: 'Negative', value: negativePercentage, fill: '#2FB574' },
      ];
    } else {
      return [
        { name: 'Positive', value: negativePercentage, fill: '#0c2f1f' }, 
        { name: 'Negative', value: positivePercentage, fill: '#2FB574' },
      ];
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#05140D]">
      <main className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-700">
          <Sidebar />
          <FadeIn direction="down" delay={0} fullWidth>
            <h1 className="text-2xl md:text-4xl font-semibold text-left text-white w-full px-2 md:px-3 line-clamp-1">
              {project.title}
            </h1>
          </FadeIn>
          <FadeIn direction="down" delay={0}>
            <Link to="/projects">
              <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4">
                View Projects
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <UserProfileIcon />
          </FadeIn>
        </header>

        <div className="bg-[#05140D] rounded-xl shadow-lg p-6">
          {milestonesWithProgress.map((milestone, index) => (
            <div key={index} className="p-6 bg-[#2C5440] rounded-lg shadow mb-6 flex flex-col md:flex-row">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">{milestone.title}</h2>
                <p className="mt-2 text-gray-300">{milestone.description}</p>
                <p className="mt-2 text-gray-300">Completion Date: {milestone.completionDate}</p>
                <p className="mt-2 text-gray-300">Amount Required: {milestone.amountRequired}</p>
                <Button variant="outline" className="px-4 py-2 bg-[#0c2f1f] hover:bg-[#0c2f1f] border-0 mt-4 text-white rounded-md transition-colors duration-300 mr-4" onClick={handleWithdraw}>
                  Withdraw
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 flex flex-col items-center mt-4 sm:mt-0 sm:ml-4">
                <div className="w-full flex items-center justify-center text-white">
                  <h2 className="text-xl font-semibold text-white pb-4 pr-4">Voting</h2>
                  <PieChart width={150} height={150}>
                    <Pie
                      data={chartData(milestone)}
                      dataKey="value"
                      outerRadius={60}
                      innerRadius={40}
                      fill="#FFFFF"
                      stroke={false}
                      activeIndex={0}
                      activeShape={({ outerRadius = 0, ...props }) => (
                        <g>
                          <Sector {...props} outerRadius={outerRadius + 1} />
                          <Sector
                            {...props}
                            outerRadius={outerRadius + 10}
                            innerRadius={outerRadius + 5}
                          />
                        </g>
                      )}
                    >
                      {chartData(milestone).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                      <Label
                        value={`${(displayType === 'downvote' ? chartData(milestone)[0].value : chartData(milestone)[1].value).toFixed(1)}%`}
                        position="center"
                        className="text-lg font-bold text-white"
                      />
                    </Pie>
                  </PieChart>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Button
                    onClick={() => handleVote(index, 'upvote')}
                    className={`px-4 py-2 bg-[#2FB574] hover:bg-[#0c2f1f] text-white rounded-md transition-colors duration-300 ${votedMilestones[index] === 'upvote' ? 'bg-[#0c2f1f]' : ''
                      }`}
                    disabled={votedMilestones[index] === 'upvote'}
                  >
                    <ArrowBigUpDash className="h-5 w-5 mr-2" />
                    Upvote {milestone.upvotes || 0}
                  </Button>
                  <Button
                    onClick={() => handleVote(index, 'downvote')}
                    className={`px-4 py-2 bg-[#0c2f1f] hover:bg-[#0c2f1f] text-white rounded-md transition-colors duration-300 ${votedMilestones[index] === 'downvote' ? 'bg-[#0c2f1f]' : ''
                      }`}
                    disabled={votedMilestones[index] === 'downvote'}
                  >
                    <ArrowBigDownDash className="h-5 w-5 mr-2" />
                    Downvote {milestone.downvotes || 0}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#1A3A2C] rounded-xl shadow-lg p-6 m-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Community Feedback</h2>
          <div className="space-y-4">
            {feedback.map((fb, index) => (
              <div key={index} className="p-4 bg-[#2C5440] rounded-lg shadow-sm">
                <p className="text-white font-semibold">{fb.user}</p>
                <p className="text-gray-300 mt-1">{fb.feedback}</p>
              </div>
            ))}
            <div className="p-4 bg-[#2C5440] rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-white mb-2">Leave your feedback</h3>
              <textarea
                value={newFeedback}
                onChange={e => setNewFeedback(e.target.value)}
                rows="4"
                className="w-full p-2 border border-[#2FB574] rounded-md bg-[#1A3A2C] text-white placeholder-gray-500"
                placeholder="Write your feedback here..."
              ></textarea>
              <button
                onClick={handleFeedbackSubmit}
                className="mt-2 px-4 py-2 bg-[#2FB574] text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default MilestoneDetailedView;
