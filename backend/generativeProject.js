import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const systemInstruction = fs.readFileSync('./systemInstructionsProject.txt', 'utf-8');

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemInstruction,
});

const generationConfig = {
    temperature: 0.3,
    topP: 0.90,
    topK: 64,
    maxOutputTokens: 4000,
};

/**
 * Function to generate content based on user input
 * @param {string} prompt - The user-provided prompt
 * @returns {string} - The generated response from the AI
 */
export async function generateProjectContent(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
              {
                role: "user",
                parts: [
                  {text: "GENRATE ME a random project contnet"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Bringing Joy to Senior Citizens Through Music Therapy\",\n  \"description\": \"This project aims to provide music therapy sessions to senior citizens living in assisted living facilities. Music has been proven to have a positive impact on cognitive function, emotional well-being, and social interaction. Our team of certified music therapists will work with residents to create personalized music experiences, fostering a sense of community and joy. We believe that music can help seniors feel more connected, engaged, and fulfilled.\",\n  \"amountNeeded\": \"5000\",\n  \"minDonation\": \"10\",\n  \"category\": \"Community Development\",\n  \"milestones\": [\n    {\n      \"title\": \"Purchase Music Therapy Equipment\",\n      \"description\": \"Acquire instruments, sound systems, and other necessary equipment to facilitate music therapy sessions.\",\n      \"completionDate\": \"2024-03-15\",\n      \"amountRequired\": \"2000\"\n    },\n    {\n      \"title\": \"Recruit and Train Music Therapists\",\n      \"description\": \"Hire and train qualified music therapists to provide personalized sessions to residents.\",\n      \"completionDate\": \"2024-04-30\",\n      \"amountRequired\": \"1500\"\n    },\n    {\n      \"title\": \"Implement Music Therapy Program\",\n      \"description\": \"Begin regular music therapy sessions at the assisted living facilities, engaging residents in a variety of musical activities.\",\n      \"completionDate\": \"2024-05-15\",\n      \"amountRequired\": \"1500\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "i run a startup in which i sell statinary items but now i want to open my own company and produce my own statnary product , need funding for this startup , i need some manufacturing place so i can manfacture my own good and control the good qualtily and prices , write me the project contnetn for this statup "},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Elevating Quality: Launching Our Own Stationery Manufacturing\",\n  \"description\": \"We're a passionate team with a proven track record in the stationery industry, currently operating a successful retail business. Now, we're taking the next bold step: establishing our own manufacturing facility to control quality, innovation, and pricing. This will allow us to offer premium stationery products at competitive prices, directly benefiting both our customers and our business. Our vision is to create a sustainable and ethical manufacturing process, ensuring high-quality products while minimizing our environmental impact. We're seeking funding to secure a dedicated manufacturing space, purchase state-of-the-art equipment, and build a skilled team to bring our vision to life.\",\n  \"amountNeeded\": \"50000\",\n  \"minDonation\": \"25\",\n  \"category\": \"Manufacturing & Production\",\n  \"milestones\": [\n    {\n      \"title\": \"Secure Manufacturing Facility\",\n      \"description\": \"Identify and lease a suitable manufacturing space equipped with essential utilities and infrastructure.\",\n      \"completionDate\": \"2024-06-30\",\n      \"amountRequired\": \"20000\"\n    },\n    {\n      \"title\": \"Purchase Manufacturing Equipment\",\n      \"description\": \"Invest in high-quality machinery and tools necessary for efficient and precise production of our stationery products.\",\n      \"completionDate\": \"2024-08-31\",\n      \"amountRequired\": \"15000\"\n    },\n    {\n      \"title\": \"Develop and Implement Quality Control System\",\n      \"description\": \"Establish rigorous quality control procedures to ensure consistent product quality and meet industry standards.\",\n      \"completionDate\": \"2024-10-31\",\n      \"amountRequired\": \"10000\"\n    },\n    {\n      \"title\": \"Recruit and Train Production Team\",\n      \"description\": \"Build a skilled and dedicated team of production professionals to operate the manufacturing facility efficiently.\",\n      \"completionDate\": \"2024-12-31\",\n      \"amountRequired\": \"5000\"\n    }\n  ]\n}\n"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "our platform name is docplus , we want to connet all hostpitals data over the world and help all the citizens , doctors and hospitals conect online . we store all the information in the online format , stores all the patients records and test data in the database so it won't be lost .\nwe want to upscale our platform and promote it all over the world and build the application for this project as well , we might need around 2 million for this project help me write content for this project "},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"DocPlus: Connecting Healthcare Globally for a Healthier World\",\n  \"description\": \"DocPlus is revolutionizing healthcare by creating a global, secure, and accessible platform that connects patients, doctors, and hospitals worldwide. We're building a future where medical records are seamlessly shared, information is readily available, and healthcare decisions are empowered by data. Our platform digitizes patient records, test results, and medical history, ensuring data integrity and preventing loss. We're committed to fostering a collaborative healthcare ecosystem that empowers individuals to take control of their health and facilitates better communication between medical professionals. This funding will enable us to scale our platform globally, develop cutting-edge applications, and empower millions to access better healthcare.\",\n  \"amountNeeded\": \"2000000\",\n  \"minDonation\": \"50\",\n  \"category\": \"Healthcare & Technology\",\n  \"milestones\": [\n    {\n      \"title\": \"Platform Expansion and Global Reach\",\n      \"description\": \"Expand DocPlus's infrastructure to accommodate a global user base, ensuring scalability and seamless integration with healthcare systems worldwide.\",\n      \"completionDate\": \"2024-12-31\",\n      \"amountRequired\": \"800000\"\n    },\n    {\n      \"title\": \"Development of Mobile and Web Applications\",\n      \"description\": \"Develop user-friendly mobile and web applications for patients, doctors, and hospitals, providing intuitive access to DocPlus's features and functionalities.\",\n      \"completionDate\": \"2025-06-30\",\n      \"amountRequired\": \"600000\"\n    },\n    {\n      \"title\": \"Data Security and Privacy Enhancements\",\n      \"description\": \"Implement robust security measures and privacy protocols to safeguard sensitive medical data, ensuring compliance with international regulations.\",\n      \"completionDate\": \"2025-12-31\",\n      \"amountRequired\": \"400000\"\n    },\n    {\n      \"title\": \"Marketing and Outreach Campaign\",\n      \"description\": \"Launch a comprehensive marketing and outreach campaign to raise awareness about DocPlus and its benefits, targeting healthcare professionals and the general public.\",\n      \"completionDate\": \"2026-06-30\",\n      \"amountRequired\": \"200000\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "some random project data"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Bringing the Magic of Storytelling to Underserved Communities\",\n  \"description\": \"We believe that every child deserves to experience the joy and power of storytelling. This project aims to establish a mobile storytelling library that will travel to underserved communities, providing access to a diverse collection of books, interactive storytelling sessions, and creative writing workshops. Our goal is to ignite a love for reading, foster imagination, and empower children through the transformative power of stories.\",\n  \"amountNeeded\": \"15000\",\n  \"minDonation\": \"5\",\n  \"category\": \"Education & Community Development\",\n  \"milestones\": [\n    {\n      \"title\": \"Purchase a Mobile Library Vehicle\",\n      \"description\": \"Acquire a reliable and spacious vehicle that can be converted into a mobile library, complete with shelving, seating, and lighting.\",\n      \"completionDate\": \"2024-04-30\",\n      \"amountRequired\": \"8000\"\n    },\n    {\n      \"title\": \"Curate a Diverse Book Collection\",\n      \"description\": \"Assemble a wide range of engaging and age-appropriate books, representing diverse cultures and perspectives.\",\n      \"completionDate\": \"2024-06-30\",\n      \"amountRequired\": \"3000\"\n    },\n    {\n      \"title\": \"Train Storytelling Volunteers\",\n      \"description\": \"Recruit and train passionate volunteers to lead interactive storytelling sessions and creative writing workshops.\",\n      \"completionDate\": \"2024-08-31\",\n      \"amountRequired\": \"2000\"\n    },\n    {\n      \"title\": \"Launch Mobile Library Program\",\n      \"description\": \"Begin regular visits to underserved communities, providing access to books, storytelling sessions, and creative writing opportunities.\",\n      \"completionDate\": \"2024-10-31\",\n      \"amountRequired\": \"2000\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "our charity need to take care of kids we waant food ,shelter books and other kids necity ans requesting for charity , write me a project for this "},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Nurturing Hope: Providing Essential Care for Children in Need\",\n  \"description\": \"Our charity is dedicated to providing a safe and nurturing environment for children facing challenging circumstances. We believe every child deserves access to basic necessities like food, shelter, education, and essential care. Our mission is to create a haven where children can thrive, receive support, and build a brighter future. We are seeking funding to provide nutritious meals, secure safe housing, offer educational resources, and ensure access to healthcare and clothing for children in need. Your generous contribution will directly impact the lives of vulnerable children, giving them the opportunity to flourish and reach their full potential.\",\n  \"amountNeeded\": \"25000\",\n  \"minDonation\": \"10\",\n  \"category\": \"Children's Welfare & Charity\",\n  \"milestones\": [\n    {\n      \"title\": \"Secure Safe and Comfortable Housing\",\n      \"description\": \"Provide a safe and comfortable living environment for children in need, ensuring access to clean and adequate housing.\",\n      \"completionDate\": \"2024-05-31\",\n      \"amountRequired\": \"10000\"\n    },\n    {\n      \"title\": \"Establish a Nutritious Meal Program\",\n      \"description\": \"Implement a program to provide regular, nutritious meals to children, ensuring their physical well-being and growth.\",\n      \"completionDate\": \"2024-07-31\",\n      \"amountRequired\": \"5000\"\n    },\n    {\n      \"title\": \"Provide Educational Resources and Support\",\n      \"description\": \"Offer access to books, learning materials, and educational support programs to foster children's academic development.\",\n      \"completionDate\": \"2024-09-30\",\n      \"amountRequired\": \"5000\"\n    },\n    {\n      \"title\": \"Ensure Access to Healthcare and Clothing\",\n      \"description\": \"Provide regular healthcare checkups, essential clothing, and other necessities to meet children's basic needs.\",\n      \"completionDate\": \"2024-11-30\",\n      \"amountRequired\": \"5000\"\n    }\n  ]\n}\n"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "genrate random project data"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Reviving the Art of Hand-Crafted Ceramics\",\n  \"description\": \"This project aims to revitalize the traditional art of hand-crafted ceramics by establishing a community pottery studio. We'll offer workshops, classes, and open studio time for individuals of all skill levels to learn and explore the beauty of clay. Our goal is to foster creativity, connect people through shared experiences, and preserve this valuable art form for future generations. We're seeking funding to purchase essential equipment, materials, and tools to create a welcoming and inspiring space for ceramic enthusiasts.\",\n  \"amountNeeded\": \"10000\",\n  \"minDonation\": \"20\",\n  \"category\": \"Arts & Crafts\",\n  \"milestones\": [\n    {\n      \"title\": \"Secure Studio Space\",\n      \"description\": \"Find and lease a suitable space for the pottery studio, equipped with adequate ventilation and utilities.\",\n      \"completionDate\": \"2024-06-30\",\n      \"amountRequired\": \"4000\"\n    },\n    {\n      \"title\": \"Purchase Essential Equipment\",\n      \"description\": \"Invest in a pottery wheel, kiln, and other essential equipment for ceramic production.\",\n      \"completionDate\": \"2024-08-31\",\n      \"amountRequired\": \"3000\"\n    },\n    {\n      \"title\": \"Stock Studio with Materials\",\n      \"description\": \"Acquire a variety of clays, glazes, and tools to support a diverse range of ceramic projects.\",\n      \"completionDate\": \"2024-10-31\",\n      \"amountRequired\": \"2000\"\n    },\n    {\n      \"title\": \"Launch Workshops and Classes\",\n      \"description\": \"Begin offering introductory and advanced workshops and classes for individuals of all skill levels.\",\n      \"completionDate\": \"2024-12-31\",\n      \"amountRequired\": \"1000\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "genrate me arandom project data"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Bringing Sustainable Food to School Cafeterias\",\n  \"description\": \"We're on a mission to make school lunches healthier and more sustainable. Our project aims to partner with local farms and food producers to provide fresh, locally-sourced ingredients to school cafeterias. By supporting local agriculture and reducing food miles, we'll create a more sustainable food system while offering students nutritious and delicious meals. We're seeking funding to establish partnerships, develop menus, and implement this program in schools across our community.\",\n  \"amountNeeded\": \"20000\",\n  \"minDonation\": \"15\",\n  \"category\": \"Food & Sustainability\",\n  \"milestones\": [\n    {\n      \"title\": \"Establish Partnerships with Local Farms\",\n      \"description\": \"Identify and partner with local farms and food producers committed to sustainable practices.\",\n      \"completionDate\": \"2024-05-31\",\n      \"amountRequired\": \"5000\"\n    },\n    {\n      \"title\": \"Develop Nutritious and Sustainable Menus\",\n      \"description\": \"Create seasonal menus featuring fresh, locally-sourced ingredients that meet nutritional guidelines.\",\n      \"completionDate\": \"2024-07-31\",\n      \"amountRequired\": \"5000\"\n    },\n    {\n      \"title\": \"Pilot Program in Select Schools\",\n      \"description\": \"Implement the program in a few pilot schools to test and refine the process and gather feedback.\",\n      \"completionDate\": \"2024-09-30\",\n      \"amountRequired\": \"5000\"\n    },\n    {\n      \"title\": \"Expand Program to Additional Schools\",\n      \"description\": \"Based on the pilot program's success, expand the program to additional schools in the community.\",\n      \"completionDate\": \"2024-11-30\",\n      \"amountRequired\": \"5000\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "genrate me random project data"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "{\n  \"title\": \"Empowering Youth Through Urban Gardening\",\n  \"description\": \"This project aims to create a vibrant urban garden space where young people can learn about sustainable agriculture, healthy eating, and environmental stewardship. We'll offer hands-on workshops, gardening classes, and community events, empowering youth to become active participants in their community and advocate for a greener future. We're seeking funding to purchase gardening tools, seeds, and materials to transform a vacant lot into a thriving urban oasis.\",\n  \"amountNeeded\": \"8000\",\n  \"minDonation\": \"10\",\n  \"category\": \"Community Development & Education\",\n  \"milestones\": [\n    {\n      \"title\": \"Secure Urban Garden Space\",\n      \"description\": \"Identify and secure a suitable vacant lot or unused space within the community for the urban garden.\",\n      \"completionDate\": \"2024-04-30\",\n      \"amountRequired\": \"2000\"\n    },\n    {\n      \"title\": \"Purchase Gardening Tools and Materials\",\n      \"description\": \"Acquire essential tools, seeds, soil, and other materials needed to establish and maintain the urban garden.\",\n      \"completionDate\": \"2024-06-30\",\n      \"amountRequired\": \"3000\"\n    },\n    {\n      \"title\": \"Develop Educational Programs and Workshops\",\n      \"description\": \"Create engaging educational programs and workshops for youth, covering topics like sustainable gardening, healthy eating, and environmental awareness.\",\n      \"completionDate\": \"2024-08-31\",\n      \"amountRequired\": \"2000\"\n    },\n    {\n      \"title\": \"Launch Community Garden Events\",\n      \"description\": \"Organize community events and workshops to engage youth and the wider community in the urban garden project.\",\n      \"completionDate\": \"2024-10-31\",\n      \"amountRequired\": \"1000\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "genrate me a post about a calamity in haryana. we needs around 10k urgently, genrate me data in json"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "\n{\n  \"title\": \"Urgent Help Needed: Calamity Strikes Haryana\",\n  \"description\": \"A devastating calamity has struck Haryana, leaving families in dire need of assistance. Homes have been destroyed, livelihoods lost, and countless people are struggling to survive. We are urgently seeking donations to provide immediate relief, including food, shelter, medical supplies, and essential necessities. Every contribution, no matter how small, will make a difference in the lives of those affected. Please donate generously and help us bring hope to those in need.\",\n  \"amountNeeded\": \"10000\",\n  \"minDonation\": \"5\",\n  \"category\": \"Disaster Relief & Humanitarian Aid\",\n  \"milestones\": [\n    {\n      \"title\": \"Provide Immediate Relief Supplies\",\n      \"description\": \"Distribute food, water, blankets, and other essential items to affected families.\",\n      \"completionDate\": \"2024-03-15\",\n      \"amountRequired\": \"5000\"\n    },\n    {\n      \"title\": \"Support Medical Needs\",\n      \"description\": \"Provide medical supplies, first aid kits, and access to healthcare for injured individuals.\",\n      \"completionDate\": \"2024-03-22\",\n      \"amountRequired\": \"3000\"\n    },\n    {\n      \"title\": \"Temporary Shelter and Housing Assistance\",\n      \"description\": \"Secure temporary shelter and provide assistance with rebuilding homes for those who lost their homes.\",\n      \"completionDate\": \"2024-03-29\",\n      \"amountRequired\": \"2000\"\n    }\n  ]\n}"},
                ],
              },
              {
                role: "user",
                parts: [
                  {text: "genrate me a post about our hospital , we want to buy some , beds and some eye related equipments and we need around 20 thousand rupees"},
                ],
              },
              {
                role: "model",
                parts: [
                  {text: "\n{\n  \"title\": \"Help Us Provide Better Care: Equipping Our Hospital for Healing\",\n  \"description\": \"Our hospital is dedicated to providing quality healthcare to our community, but we need your help to upgrade our facilities. We are raising funds to purchase essential medical equipment, including new beds for our patients and specialized instruments for eye care. These upgrades will allow us to provide more comfortable and effective treatment, ensuring the well-being of those who rely on our services. Every contribution, big or small, will make a difference in the lives of our patients. Please join us in our mission to provide exceptional healthcare by donating today.\",\n  \"amountNeeded\": \"20000\",\n  \"minDonation\": \"10\",\n  \"category\": \"Healthcare & Medical Equipment\",\n  \"milestones\": [\n    {\n      \"title\": \"Purchase New Hospital Beds\",\n      \"description\": \"Acquire comfortable and durable beds to provide a better experience for our patients during their stay.\",\n      \"completionDate\": \"2024-04-15\",\n      \"amountRequired\": \"10000\"\n    },\n    {\n      \"title\": \"Invest in Eye Care Equipment\",\n      \"description\": \"Purchase specialized instruments and tools to enhance our eye care services and provide more accurate diagnoses and treatments.\",\n      \"completionDate\": \"2024-05-15\",\n      \"amountRequired\": \"10000\"\n    }\n  ]\n}\n"},
                ],
              },
            ],
            
        });

        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content");
    }
}
