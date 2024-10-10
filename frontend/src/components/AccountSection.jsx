import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react'; // Ensure you have this icon library installed

const AccountSection = ({ sectionRef, formData, handleChange, connectWallet, scrollToSection }) => {
  return (
    <section ref={sectionRef} id="account-section" className="scroll-mt-40 lg:scroll-mt-28 min-h-screen text-white">
      <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-left mb-6 md:mb-10 text-white">Account</h2>
        <div className="space-y-6">
          {/* Connect Wallet */}
          <div className="space-y-4">
            <div className="text-xl md:text-2xl font-semibold">Connect Wallet</div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={connectWallet}
                className="flex items-center justify-center bg-black hover:bg-stone-700 rounded-md p-4 transition ease-in-out w-32 text-center text-white"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/768px-MetaMask_Fox.svg.png"
                  alt="MetaMask"
                  className="h-8 w-8 mr-2"
                />
                <span className="hidden md:inline">MetaMask</span>
              </Button>
              <Button
                className="flex items-center justify-center bg-[#f5f6fc] hover:bg-[#dfe8ff] rounded-md p-4 transition ease-in-out w-32 md:w-36 text-center text-white"
              >
                <img
                  src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                  alt="WalletConnect"
                  className="h-8 w-8 mr-2"
                />
                <span className="hidden md:inline text-blue-400">WalletConnect</span>
              </Button>
              <Button
                className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-md p-4 transition ease-in-out w-32 text-center text-white"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYBPjqJ_GAeLOQD6fK4jm_CiOAdwVko_-fPVvptet2AIglUUB47h5EyEZs_nreE_xpZk&usqp=CAU"
                  alt="Coinbase"
                  className="h-8 w-8 mr-2 rounded-full"
                />
                <span className="hidden md:inline">Coinbase</span>
              </Button>
              <Button
                className="flex items-center justify-center bg-black hover:bg-black rounded-md p-4 transition ease-in-out w-32 text-center text-white"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPzg2XYOEViDrxbNnm_5XNLyGu8YAPhb0S9g&s"
                  alt="Trust Wallet"
                  className="h-8 w-8 mr-2"
                />
                <span className="hidden md:inline">Trust Wallet</span>
              </Button>
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-4">
            <div className="text-xl md:text-2xl font-semibold">
              Change Password <span className='text-sm text-gray-500'>(Not Compulsory)</span>
            </div>
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
              placeholder="Current Password"
            />
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
              placeholder="New Password"
            />
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
              placeholder="Confirm New Password"
            />
            <Button
              className="w-full bg-[#2FB574] text-white py-2 rounded-md hover:bg-[#26925e]"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
      <a
        href="#appearance-section"
        className="relative flex w-[80px] text-center items-center p-2 pl-4 rounded-full transition-colors text-md text-white bg-[#2FB574] hover:bg-[#26925e]"
        onClick={() => {
          scrollToSection('appearance');
        }}
      >
        Next
        <ChevronRight className="h-5 w-5" />
      </a>
    </section>
  );
};

export default AccountSection;
