import cindLaneLogo from '/cind_lane_logo.png';

function Home() {
    return (
        <div className="h-full flex items-center justify-center overflow-hidden">
            <div className="w-1/2 flex flex-col items-center justify-center h-full bg-gray-200 p-8">
                <div className="w-full flex flex-col items-center text-center">
                    <img src={cindLaneLogo} alt="CindLane Logo" className="max-w-[50%] h-auto" />
                    <h1 className='text-4xl font-bold text-primary mt-4'>
                        Get insights on your Pokemon Unite Team
                    </h1>
                    <h2 className='text-2xl text-primary mt-2'>
                        100% automatically and free
                    </h2>
                </div>
            </div>

            <div className="w-1/2 flex justify-center">
                <img src={cindLaneLogo} alt="CindLane Logo" className="max-w-[50%] h-auto" />
            </div>
        </div>
    );
}

export default Home;
