import cindLaneLogo from '/cind_lane_logo.png';
import fancyTriangle from '/fancy_triangle.png';
import NavigateButton from '../components/NavigateButton';


function Home() {
    return (
        <div className="h-full flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-4xl flex flex-row items-center justify-center p-8 rounded-lg shadow-lg bg-background">
                <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center text-center px-4">
                    <img 
                        src={cindLaneLogo} 
                        alt="CindLane Logo" 
                        className="w-3/4 max-w-[300px] h-auto" 
                        style={{ imageRendering: "pixelated" }} 
                    />
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mt-4 md:mt-6">
                        Get insights on your Pokémon Unite Team
                    </h1>
                    
                    <h2 className="text-xl md:text-2xl text-primary mt-3 md:mt-4">
                        100% automatically and free
                    </h2>
                </div>


                <div className="w-1/2 flex flex-col justify-center items-center relative">
                    <div className="flex justify-between w-full">
                        <img src={fancyTriangle} alt="Fancy Triangle" className="relative rotate-45 w-10" style={{ imageRendering: "sharp" }}/>
                        <img src={fancyTriangle} alt="Fancy Triangle" className="relative -rotate-45 w-10" style={{ imageRendering: "sharp" }}/>
                    </div>

                    {/* Navigation Button */}
                    <NavigateButton to="/draft" text="Get Started" className="relative z-10" />

                    <div className="flex justify-between w-full">
                        <img src={fancyTriangle} alt="Fancy Triangle" className="relative -rotate-[135deg] w-10" style={{ imageRendering: "sharp" }}/>
                        <img src={fancyTriangle} alt="Fancy Triangle" className="relative rotate-[45deg] w-10" style={{ imageRendering: "sharp" }}/>
                    </div>
                </div>




            </div>
        </div>
    );
}

export default Home;
