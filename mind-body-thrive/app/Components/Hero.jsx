export default function Hero() {
    return (
      <div className="flex  justify-space-between bg-gray-100 p-20">
        <div className="mb-6 pr-5">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-teal-600">MindBodyThrive</span>
          </h1>
          <h2 className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover a space dedicated to your holistic well-being! At Mind Body Thrive, we believe in the power of nurturing both your physical and mental health. Our platform connects you with a community that shares your passion for personal growth and wellness.
          </h2>
        </div>
       
        <div className="mt-6">
        <img
          src="mind-body-thrive/public/images/kike-vega-F2qh3yjz6Jk-unsplash.jpg"
          alt="meditation"
          className="max-w-3xl rounded-lg shadow-lg"
        />
        </div>
      </div>
    );
  }
  