import React from "react";
import { User, Settings, LifeBuoy, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserProfileIcon = () => {
  const navigate = useNavigate();

  // Fetch user data from localStorage
  const data = JSON.parse(localStorage.getItem('user')) || {};
  
  // Ensure data.user exists before accessing name
  const username = data?.user?.name || "Guest";
  const baseURL = "https://laughing-trout-p6pwxp7wx5qf6qv6-5173.app.github.dev" || "https://finvest.dev.vercel.app/"; // Use hosted URL if available

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken'); // Or wherever you store the refresh token

      const response = await fetch(`${baseURL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }), // Send refresh token in request body
      });

      // if (!response.ok) {
      //   throw new Error('Logout failed');
      // }

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');

      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
   const handleSupportClick = () => {
    navigate("/settings", { state: { scrollTo: "support" } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full h-10 w-10 bg-[#10251C] text-white hover:bg-[#2FB574] transition-colors"
        >
          <User className="h-7 w-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#10251C] border border-gray-700 text-white rounded-md shadow-lg"
      >
        <DropdownMenuLabel className="text-gray-400">
          {username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-600" />
        <DropdownMenuItem>
          <Link
            to="/settings"
            className="flex items-center gap-2 text-white hover:text-[#2FB574]"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            href="#support-section"
            className="relative flex w-full gap-2 text-white hover:text-[#2FB574]"
            onClick={handleSupportClick}
          >
            <LifeBuoy className="h-4 w-4" />
            Support
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-gray-600" />
        <DropdownMenuItem
          className="flex items-center gap-2 text-white hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileIcon;
