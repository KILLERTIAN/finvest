import React from 'react';
import { Label } from '@/components/ui/label'; // Adjust import paths as necessary
import { Switch } from '@/components/ui/switch'; // Assuming you have a Switch component
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Link } from 'react-router-dom'; // If using React Router

const NotificationSection = ({ sectionRef, formData, handleChange }) => {
  return (
    <section ref={sectionRef} id="notification-section" className="scroll-mt-40 min-h-screen text-white">
      <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
        <h2 className="text-3xl md:text-4xl text-left font-semibold mb-6 md:mb-10 text-white">Notification</h2>
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-2">
            <Label htmlFor="emailNotifications" className="text-white">Email Notifications</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="emailNotifications"
                checked={formData.emailNotifications === "enable"}
                onChange={() => handleChange({ target: { name: 'emailNotifications', value: formData.emailNotifications === "enable" ? "disable" : "enable" } })}
                className="bg-[#2FB574] checked:bg-[#26925e]"
              />
              <Label htmlFor="emailNotifications" className="text-white">
                {formData.emailNotifications === "enable" ? "Enable" : "Disable"}
              </Label>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="space-y-2">
            <Label htmlFor="smsNotifications" className="text-white">SMS Notifications</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="smsNotifications"
                checked={formData.smsNotifications === "enable"}
                onChange={() => handleChange({ target: { name: 'smsNotifications', value: formData.smsNotifications === "enable" ? "disable" : "enable" } })}
                className="bg-[#2FB574] checked:bg-[#26925e]"
              />
              <Label htmlFor="smsNotifications" className="text-white">
                {formData.smsNotifications === "enable" ? "Enable" : "Disable"}
              </Label>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="space-y-2">
            <Label htmlFor="pushNotifications" className="text-white">Push Notifications</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="pushNotifications"
                checked={formData.pushNotifications === "enable"}
                onChange={() => handleChange({ target: { name: 'pushNotifications', value: formData.pushNotifications === "enable" ? "disable" : "enable" } })}
                className="bg-[#2FB574] checked:bg-[#26925e]"
              />
              <Label htmlFor="pushNotifications" className="text-white">
                {formData.pushNotifications === "enable" ? "Enable" : "Disable"}
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-start mt-10">
        <Link to="/dashboard">
          <Button variant="default" size="lg" type="submit" className="bg-[#2FB574] text-white hover:bg-[#2C5440]">
            Save Settings
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotificationSection;
