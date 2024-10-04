import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigUpDash, Share2, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import FadeIn from "./FadeIn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserProfileIcon from "./ui/UserProfileIcon";
import ProjectDetailedViewSkeleton from "./ui/ProjectDetailedViewSkeleton";
import useAuth from "@/utils/auth";
import DonationModal from "./DonationModal";
import { WalletContext } from "@/context/WalletContext";

const networkLogos = {
  Ethereum:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkj3dStbrL3JvOAo7Sn5VEoxIRFsLx-ft4WXZUOpl9d9HmvpTaNxpOXgLe9fECnYLp83Q&usqp=CAU",
  Bitcoin: "https://bitcoin.org/img/icons/opengraph.png?1646858405",
  Polygon:
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Polygon_logo.svg",
  bsc: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Binance_Logo.png",
  Solana:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ZBYV7re0bpottvNraonxfjv9qGpMh_23hw&s",
  Cardano:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9a411426-3711-47d4-9c1a-dcf72973ddfc/dfiw6f1-d8d49d24-ae93-4a4e-b69b-5d652635faeb.png/v1/fill/w_1280,h_1280/cardano_ada_logo_by_saphyl_dfiw6f1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzlhNDExNDI2LTM3MTEtNDdkNC05YzFhLWRjZjcyOTczZGRmY1wvZGZpdzZmMS1kOGQ0OWQyNC1hZTkzLTRhNGUtYjY5Yi01ZDY1MjYzNWZhZWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.bfvaZGUJUg19yFvUsRQlX_ppldirqvTMA4FPLFXOobU",
  Avalanche:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3r4bnOojhpFMtgvwU7lbNf_5HovNtHbdCOr7PkC9v9lJYW6uKKvyKcFhRD1C6UUNkqW4&usqp=CAU",
  Polkadot: "https://polkadot.network/favicon.ico",
  Tezos: "https://tezostaquito.io/images/tez_logo.png",
  Chainlink: "https://chainlinklabs.com/images/chainlink_logo.png",
};

const fetchProjectData = async (urls) => {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching project data from ${url}:`, error);
    }
  }
  throw new Error("All fetch attempts failed");
};

const ProjectDetailedView = ({ handleUpvote = () => {}, userUpvotes = {} }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { isLoggedIn, user } = useAuth();
  const { walletAddress } = useContext(WalletContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connectWallet } = useContext(WalletContext);

  const handleDonateClick = () => {
    if (!walletAddress) {
      // Connect wallet if not already connected
      connectWallet();
    }
    // Open donation modal
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    // Close the modal when Cancel button is clicked
    setIsModalOpen(false);
  };

  useEffect(() => {
    const urls = [
      `https://finvest-backend.onrender.com/project/${projectId}`,
      `http://localhost:8000/project/${projectId}`,
      // "/projects.json",
    ];

    const fetchData = async () => {
      try {
        const data = await fetchProjectData(urls);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project data from all sources:", error);
      }
    };

    fetchData();
  }, [projectId]);

  if (!project) {
    return <ProjectDetailedViewSkeleton />;
  }

  const contributions = project?.contributions || [];
  const totalPages = Math.ceil(contributions.length / itemsPerPage);
  const currentContributions = contributions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen w-full bg-[#05140D]">
      <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-800">
          <Sidebar />
          <FadeIn direction="down" delay={0} fullWidth>
            <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#FFFFFF] w-full px-4 md:px-3 z-[5] line-clamp-1">
              {project?.title}
            </h1>
          </FadeIn>
          <FadeIn direction="down" delay={0}>
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
          {isLoggedIn && (
            <FadeIn direction="left" delay={0.2}>
              <UserProfileIcon />
            </FadeIn>
          )}
        </header>
        <FadeIn direction="up" delay={0} fullWidth>
          <div className="w-full mx-auto p-5 gap-6 flex flex-col md:flex-row">
            {/* Flex-1 Container */}
            <div className="flex-1 bg-[#1A3A2C] rounded-xl shadow-lg p-8">
              <img
                src={project?.image || "default-image-url.jpg"}
                alt={project?.title || "No Title"}
                className="max-h-80 w-full object-cover rounded-lg"
              />
              <h1 className="text-3xl font-bold text-white mt-5">
                {project?.title}
              </h1>
              <div className="flex items-center mt-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={project?.avatar || "default-avatar-url.jpg"}
                    alt={project?.creator}
                  />
                  <AvatarFallback>{project?.creator.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="ml-2 text-sm font-medium text-gray-100">
                  {project?.creator}
                </p>
              </div>
              <p className="mt-4 text-gray-100">{project?.description}</p>
            </div>

            {/* Flex-2 Container */}
            <div className="flex-2 bg-[#1A3A2C] rounded-xl shadow-lg p-8 relative min-w-[30%]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start">
                  <p className="text-[#2FB574] font-semibold md:text-4xl text-3xl">
                    {project?.amountRaised}
                  </p>
                  <span className="bg-[#2FB574] text-white md:text-xs text-[10px] px-3 py-1 rounded-full mt-2">
                    Total Amount Raised
                  </span>
                </div>
                <p className="text-gray-100 font-medium text-xl">
                  {project?.contributors} contributors
                </p>
                <p className="text-[#2FB574] font-semibold md:text-3xl text-2xl">
                  Milestones
                </p>

                <div
                  className="absolute top-5 right-5 flex items-center justify-center  p-2 pr-3 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-[#05140D]"
                  onClick={() => handleUpvote(project?.id)}
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
              </div>

              <div className="relative my-4 md:mb-10 py-4">
                {/* Background bar */}
                <div className="absolute left-[8px] top-0 bottom-0 w-2 bg-green-100 rounded-full"></div>

                <Link
                  to={`/projects/${project?.id}/milestones`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="space-y-4 pl-[2px]">
                    {project?.milestones?.length ? (
                      project.milestones.map((milestone, index) => (
                        <Link
                          key={index}
                          to={`/projects/milestones/${project.id}`}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div
                            className={`h-5 w-5 z-[5] rounded-full ${index < project.milestones.length
                                ? "bg-green-300"
                                : "bg-green-300"
                              }`}
                          />
                          <p className="text-gray-100">{milestone.title}</p>
                        </Link>
                      ))
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-gray-500" />
                        <p className="text-gray-100">No milestones available</p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>

              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Button
                    className="bg-[#2FB574] text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    onClick={handleDonateClick}
                  >
                    Donate / Invest
                  </Button>
                  {isModalOpen && (
                    <DonationModal
                      isOpen={isModalOpen} // Pass isOpen prop
                      onClose={handleCancel} // Pass onClose handler
                      projectId={projectId} // Pass projectId
                    />
                  )}

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] border rounded-md py-2 px-4 transition-colors hover:bg-[#F5F5F5]"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="ml-2">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="flex-1 mt-8 p-5 bg-[#1A3A2C] rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white">
            Latest Contributions
          </h2>
          <Table className="mt-4">
            <TableHeader>
              <TableRow className="hover:bg-[#2C5440] transition-colors">
                <TableHead className="text-gray-100">Donor</TableHead>
                <TableHead className="text-gray-100">Donated at</TableHead>
                <TableHead className="text-gray-100">Network</TableHead>
                <TableHead className="text-gray-100">Amount</TableHead>
                <TableHead className="text-right text-gray-100">
                  USD Value
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentContributions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-100 py-4">
                    No contributions yet
                  </TableCell>
                </TableRow>
              ) : (
                currentContributions.map((contribution) => (
                  <TableRow key={contribution.id} className="hover:bg-[#2C5440] transition-colors">
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={contribution.avatar}
                          alt={contribution.donor}
                        />
                        <AvatarFallback>
                          {contribution?.donor
                            ? contribution.donor.charAt(0)
                            : "N/A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-100">{contribution.donor}</span>
                    </TableCell>
                    <TableCell className="text-gray-100">
                      {new Date(contribution.donatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2 text-gray-100">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            networkLogos[contribution.network] ||
                            "default-network-logo-url.jpg"
                          }
                          alt={contribution.network}
                        />
                        <AvatarFallback>
                          {contribution.network.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{contribution.network}</span>
                    </TableCell>
                    <TableCell className="text-gray-100">
                      {contribution.amount}
                    </TableCell>
                    <TableCell className="text-right text-gray-100">
                      ${contribution.usdValue}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>

          </Table>

          <div className="flex justify-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationPrevious
                  className="mr-2"
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </PaginationPrevious>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={
                        currentPage === index + 1
                          ? "bg-[#2FB574] text-white"
                          : "text-gray-100"
                      }
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext
                  className="ml-2"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(prevPage + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </PaginationNext>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailedView;
