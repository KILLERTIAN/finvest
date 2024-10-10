import FadeIn from './FadeIn';
import ShineBorder from "@/components/magicui/shine-border";

function Services() {
    return (
        <div className="relative flex flex-col items-center justify-center bg-[#05140D] w-full md:p-10 p-5 md:py-20 py-10">
            <img className="absolute left-0" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133537/lye4qxmyubg7wuj8exvt.svg" alt="" />
            <img className="absolute right-0" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133535/duitolguodf7th7fzzek.svg" alt="" />
            <FadeIn direction="up" delay={0.3} fullWidth>
                <h2 className="md:text-5xl text-3xl text-white font-semibold text-center py-3 z-10">
                    Our Best Services <br /> For Your Convenience
                </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} fullWidth>
                <h3 className="md:text-xl text-sm text-white text-center py-4 z-10 md:w-[50%]">
                    Our goal is to provide a secure, transparent, and efficient way for individuals and organizations to contribute to causes they care about. By recording every transaction on the blockchain, we ensure complete transparency, allowing donors and investors to track the use of their funds in real-time.
                </h3>
            </FadeIn>

            <img className="relative py-10" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721134750/q18zkrflfd1rca0loy2f.svg" alt="" />
            
            <div className="flex xl:flex-row flex-col items-center justify-center gap-[60px] py-10">
                {[
                    { title: "Guaranteed Safety", imgSrc: "https://res.cloudinary.com/djoebsejh/image/upload/v1721135409/kvyqt6yrr3rotoysioou.png", delay: 0.3, description: "With blockchain, all transactions are immutable and transparent, ensuring the highest level of security for your investments." },
                    { title: "All in One App", imgSrc: "https://res.cloudinary.com/djoebsejh/image/upload/v1721135412/hundmnkts9bfynfniadf.png", delay: 0.5, description: "Manage all your fundraising and investments in one place, with real-time tracking and easy access to detailed analytics." },
                    { title: "Easy to Use", imgSrc: "https://res.cloudinary.com/djoebsejh/image/upload/v1721135411/lp1e6eqbysx1iwld4fsl.png", delay: 0.7, description: "Our intuitive interface ensures that anyone can easily participate in fundraising or investing, regardless of their experience." },
                ].map((card, index) => (
                    <FadeIn key={index} direction="up" delay={card.delay} fullWidth>
                        <ShineBorder
                            className="relative flex flex-col items-start justify-center w-[320px] bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg p-6 shadow-lg overflow-hidden"
                            color={["#7DD8A4", "#05140D", "#C1F3D3"]}
                        >
                            <img className="bg-[#2FB574] rounded-[50px] h-[35px] w-[35px] p-2" src={card.imgSrc} alt="" />
                            <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">
                                {card.title}
                            </h3>
                            <h4 className="md:text-lg text-md text-white z-10">
                                {card.description}
                            </h4>
                        </ShineBorder>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}

export default Services;
