import FadeIn from "./FadeIn"

function Why() {
    return (
        <div className="flex flex-col items-center justify-center bg-[#05140D] w-full  md:p-10 p-5 md:py-20 py-10">
            <FadeIn direction="up" delay={0.2} fullWidth>
                <h2 className="md:text-5xl text-3xl text-white font-semibold text-center py-3 z-5 ">
                    These are why <br />you should use Finvest
                </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} fullWidth>
                <h3 className="md:text-xl text-sm text-white text-center py-4 z-5 md:w-[50%]">
                    Bridging Generosity with Cutting-Edge Transparency and Driving Accountability for Lasting Impact.
                </h3>
            </FadeIn>
            <FadeIn direction="up" delay={0.4} fullWidth>
                <img className="relative py-10" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721134750/q18zkrflfd1rca0loy2f.svg" alt="" />
            </FadeIn>

            <div className="flex xl:flex-row flex-col w-full items-center justify-center">
                {/* Left Side - Full Control & Minimal Risk */}
                <div className="flex flex-col items-center justify-center xl:border-r-2 border-slate-300">
                    <FadeIn direction="right" delay={0.3} fullWidth>
                        <div className="flex items-start justify-center flex-col xl:w-[500px] lg:w-[500px] md:w-[500px] w-[300px] md:p-10 p-0 py-10 pt-0 border-b-2 xl:border-b-1 border-slate-300">
                            <img className="md:h-[90px] md:w-[90px] h-[50px] w-[50px]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144151/xu3o3w3yllvmq3dpvhzs.png" alt="" />
                            <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">Full Control</h3>
                            <img src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144165/v6o5c2lt8snirw1deumc.png" alt="" />
                            <h4 className="md:text-3xl text-xl text-white font-extralight py-4">You have complete control over the invested money. From where it's used to how much is being used</h4>
                        </div>
                    </FadeIn>

                    <FadeIn direction="right" delay={0.3} fullWidth>
                        <div className="flex items-start justify-center flex-col xl:w-[500px] lg:w-[500px] md:w-[500px] w-[300px] md:p-10 py-10 border-b-2 xl:border-b-0 border-slate-300">
                            <img className="md:h-[90px] md:w-[90px] h-[50px] w-[50px]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144151/hmumo7sd71pg9n69gi4j.png" alt="" />
                            <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">Minimal Risk</h3>
                            <img src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144165/v6o5c2lt8snirw1deumc.png" alt="" />
                            <h4 className="md:text-3xl text-xl text-white font-extralight py-4">Whenever you find the investment a mistake you can dissolve contract and take back remaining money</h4>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Side - AI Auto-Fill & Transparency */}
                <div className="flex flex-col items-center justify-center xl:pt-20">
                    <FadeIn direction="left" delay={0.4} fullWidth>
                        <div className="flex items-start justify-center flex-col xl:w-[500px] lg:w-[500px] md:w-[500px] w-[300px] md:p-10 py-10 border-b-2 xl:border-b-1 border-slate-300">
                            <img className="md:h-[90px] md:w-[90px] h-[50px] w-[50px]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1728048432/Prescription_Testres/lqrctsvgxqxcen1tubfs.png" alt="" />
                            <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">AI Auto-Fill</h3>
                            <img src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144165/v6o5c2lt8snirw1deumc.png" alt="" />
                            <h4 className="md:text-3xl text-xl text-white font-extralight py-4">
                                Our AI engine intelligently auto-fills key fields for your project submissions and posts, minimizing manual effort.
                            </h4>
                        </div>
                    </FadeIn>

                    <FadeIn direction="left" delay={0.3} fullWidth>
                        <div className="flex items-start justify-center flex-col xl:w-[500px] lg:w-[500px] md:w-[500px] w-[300px] md:p-10 py-10">
                            <img className="md:h-[90px] md:w-[90px] h-[50px] w-[50px]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144152/f0izfofpl1ltfurfhw45.png" alt="" />
                            <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">Transparency</h3>
                            <img src="https://res.cloudinary.com/djoebsejh/image/upload/v1721144165/v6o5c2lt8snirw1deumc.png" alt="" />
                            <h4 className="md:text-3xl text-xl text-white font-extralight py-4">All transactions are completely transparent, and records can be accessed at any time.</h4>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}

export default Why;
