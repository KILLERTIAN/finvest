import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';
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


const AppearanceSection = ({
  sectionRef,
  formData,
  handleChange,
  scrollToSection,
  themes,
  fonts,
}) => {
  return (
    <section ref={sectionRef} id="appearance-section" className="scroll-mt-40 min-h-screen text-white">
      <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
        <h2 className="text-3xl md:text-4xl text-left font-semibold mb-6 md:mb-10 text-white">Appearance</h2>
        <div className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-white">Theme</Label>
            <Select value={formData.theme} onValueChange={value => handleChange({ target: { name: 'theme', value } })}>
              <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent text-white placeholder:text-gray-100">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme, index) => (
                  <SelectItem key={index} value={theme} className="text-white">
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Selection */}
          <div className="space-y-2">
            <Label htmlFor="font" className="text-white">Font</Label>
            <Select value={formData.font} onValueChange={value => handleChange({ target: { name: 'font', value } })}>
              <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent text-white placeholder:text-gray-100">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font, index) => (
                  <SelectItem key={index} value={font} className="text-white">
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label htmlFor="color" className="text-white">Primary Color</Label>
            <Input
              id="color"
              name="color"
              type="color"
              value={formData.color}
              onChange={handleChange}
              className="h-20 w-20 rounded-lg border-0 focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Navigation to Next Section */}
      <a
        href="#notification-section"
        className="relative flex w-[80px] text-center items-center p-2 pl-4 rounded-full transition-colors text-md text-white bg-[#2FB574] hover:bg-[#26925e]"
        onClick={() => {
          scrollToSection('notification');
        }}
      >
        Next
        <ChevronRight className="h-5 w-5" />
      </a>
    </section>
  );
};

export default AppearanceSection;
