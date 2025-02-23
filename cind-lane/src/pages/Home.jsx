import cindLaneLogo from '/cind_lane_logo.png';
import fancyTriangle from '/fancy_triangle.png';
import NavigateButton from '../components/NavigateButton';


function Home() {
    return (
        <div className="h-full flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-4xl min-h-[80vh] flex flex-row items-center justify-center p-8 rounded-lg shadow-lg bg-background">
                <div className="w-1/2 flex flex-col items-center text-center">
                <img src={cindLaneLogo} 
                    alt="CindLane Logo" 
                    className="w-full max-w-[50%] h-auto" 
                        style={{ imageRendering: "pixelated" }} />
                    
                    <h1 className="text-4xl font-bold text-primary mt-6">
                        Get insights on your Pokemon Unite Team
                    </h1>
                    <h2 className="text-2xl text-primary mt-4">
                        100% automatically and free
                    </h2>
                </div>

                <div className="w-1/2 flex justify-center items-center relative">
                    <img src={fancyTriangle} alt="Fancy Triangle" className="absolute top-0 left-0 rotate-0 w-8" />
                    <img src={fancyTriangle} alt="Fancy Triangle" className="absolute top-0 right-0 rotate-90 w-8" />
                    <img src={fancyTriangle} alt="Fancy Triangle" className="absolute bottom-0 left-0 rotate-180 w-8" />
                    <img src={fancyTriangle} alt="Fancy Triangle" className="absolute bottom-0 right-0 -rotate-90 w-8" />

                    <NavigateButton to="/draft" text="Get Started" />
                </div>

            </div>
        </div>
    );
}

export default Home;
