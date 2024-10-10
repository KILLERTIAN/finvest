import React from 'react';
import { Label } from '@/components/ui/label'; // Adjust import paths as necessary
import { Textarea } from '@/components/ui/textarea'; // Assuming you have a Textarea component
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust import paths as necessary

const faqs = [
    {
        question: "How can I reset my password?",
        answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email address.",
    },
    {
        question: "How can I contact support?",
        answer: "You can contact support by filling out the form below or by sending an email to support@example.com.",
    },
    {
        question: "What are the support hours?",
        answer: "Our support team is available from Monday to Friday, 9 AM to 6 PM (GMT).",
    },
    {
        question: "How do I update my account information?",
        answer: "To update your account information, log in to your account, go to the 'Settings' page, and update your details under the 'Profile' section.",
    },
    {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account by going to the 'Settings' page and selecting the 'Delete Account' option. Please note that this action is irreversible.",
    },
    {
        question: "How do I report a bug or issue?",
        answer: "To report a bug or issue, go to the 'Support' section and fill out the 'Report a Bug' form. Our team will look into it and get back to you as soon as possible.",
    },
    {
        question: "How can I change my notification settings?",
        answer: "To change your notification settings, log in to your account, go to the 'Settings' page, and update your preferences under the 'Notifications' section.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit/debit cards, PayPal, and cryptocurrency. For more details, visit our 'Payment Methods' page.",
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes, we take your privacy and security seriously. We use advanced encryption and security measures to protect your personal information.",
    },
    {
        question: "How can I track my project's progress?",
        answer: "You can track your project's progress by logging in to your account and navigating to the 'My Projects' section. Here, you'll find detailed information and updates on your project's status.",
    },
];

const SupportAndFAQ = ({ formData, handleInputChange, handleSubmit, sectionRef }) => {
    return (
        <section ref={sectionRef} id="support-section" className="scroll-mt-28 min-h-screen text-white">
            <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-left mb-6 md:mb-10 text-white">Support</h2>
                <div className="space-y-6">

                    {/* Message Us */}
                    <div className="space-y-4">
                        <Label htmlFor="supportMessage" className="text-white">Message Us</Label>
                        <Textarea
                            id="supportMessage"
                            name="supportMessage"
                            value={formData.supportMessage}
                            onChange={handleInputChange}
                            placeholder="Describe your issue or question"
                            required
                            className="bg-[#05140D] text-white placeholder-gray-500 border border-[#2C5440] rounded-lg p-3"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button onClick={handleSubmit} className="bg-[#2FB574] text-white py-2 rounded-md hover:bg-[#26925e]">
                        Submit
                    </Button>

                    {/* FAQ Section */}
                    <div className="mt-10">
                        <h3 className="text-xl md:text-2xl font-semibold text-left mb-6 md:mb-8 text-white">Frequently Asked Questions</h3>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#2C5440] mb-2">
                                    <AccordionTrigger
                                        className="text-sm md:text-md py-4 px-6 font-semibold text-white bg-[#2C5440] rounded-md hover:bg-[#26925e] transition-colors duration-300"
                                    >
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent
                                        className="text-base p-6 text-white bg-[#05140D] rounded-md"
                                    >
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportAndFAQ;
