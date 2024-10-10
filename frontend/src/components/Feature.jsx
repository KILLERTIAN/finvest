import { Button } from "./ui/button";
import FadeIn from "./FadeIn";
function Feature() {
    return (
        <FadeIn direction="up" delay={0.3} fullWidth>
            <div className="relative flex flex-col items-center justify-center w-full bg-[#05140D]  py-10 md:pb-20 pb-10">
                {/* <img className="w-full" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721199945/rojx9gpeydszeflftzss.png" alt="Background" /> */}
                <FadeIn direction="up" delay={0.2} fullWidth>
                <img className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-auto z-[1] bg-[#05140D]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721199945/rojx9gpeydszeflftzss.png" alt="Background" />

                </FadeIn>

                <div className=" flex flex-col lg:flex-row z-[5] items-center justify-between rounded-[40px] overflow-hidden bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-lg p-10 pb-0 pr-0 lg:px-20 lg:p-10 xl:py-28 mt-10 lg:mt-40 w-[90%]">
                    <div className=" relative flex flex-col items-start justify-center  lg:max-w-[50%] z-10 pr-4">
                        <img className="m-0" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721199942/taavtz4rowx8ovojuw2z.png" alt="Service Icon" />
                        <FadeIn direction="up" delay={0.3} >
                            <h2 className="md:text-5xl text-3xl text-white font-semibold py-3 text-left">
                                Our Best Services <br /> For Your Convenience
                            </h2>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.4} fullWidth>
                            <h3 className="md:text-xl text-sm text-white py-4 md:w-full">
                            The dashboard offers an accessible snapshot of your blockchain transactions, delivering actionable insights and detailed analytics for effective management of donations and investments.
                            </h3>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.5}>
                            <Button variant="ghost" size="lg" className="p-0">
                                <img src="https://res.cloudinary.com/djoebsejh/image/upload/v1721199946/s6cztam6qulciejmeidq.png" alt="Button Icon" />
                            </Button>
                        </FadeIn>

                    </div>
                    <img className="lg:absolute md:bottom-0 md:right-0 z-0 lg:w-[50%] w-full overflow-hidden " src="https://res.cloudinary.com/djoebsejh/image/upload/v1721199940/tms6tsyw5ecluubtfblq.svg" alt="Decoration" />

                </div>

            </div>
        </FadeIn>

    );
}

export default Feature;
