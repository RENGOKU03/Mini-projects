import  { useState } from "react";

const TabsComponent = ({ tabsContent = [] }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  function handleTabClick(getIndex) {
    setCurrentTabIndex(getIndex);
  }

  return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 drop-shadow-lg animate-fade-in-down">
          Dynamic Tabs
        </h1>

        <div className="w-full max-w-2xl bg-gray-800 bg-opacity-70 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-700 animate-fade-in-up">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 border-b border-gray-700 pb-4">
            {tabsContent.map((tabItem, index) => (
                <button
                    key={tabItem.label}
                    onClick={() => handleTabClick(index)}
                    className={`
                px-5 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold 
                transition-all duration-300 transform 
                ${
                        currentTabIndex === index
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
              `}
                >
                  {tabItem.label}
                </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 bg-gray-700 bg-opacity-50 rounded-xl transition-all duration-500 ease-in-out transform scale-98 opacity-0 animate-content-fade-in">
            {tabsContent[currentTabIndex] && (
                <div className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                  {tabsContent[currentTabIndex].content}
                </div>
            )}
          </div>
        </div>

        <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes contentFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-content-fade-in { animation: contentFadeIn 0.5s ease-out forwards; }
      `}</style>
      </div>
  );
};

const Tabs = () => {
  const tabs = [
    {
      label: "About Us",
      content: (
          <div>
            <p className="mb-2">We are a leading provider of innovative solutions dedicated to enhancing user experience and driving technological advancement.</p>
            <p>Our team comprises passionate experts committed to delivering excellence in every project. We believe in creativity, collaboration, and continuous improvement.</p>
          </div>
      ),
    },
    {
      label: "Our Services",
      content: (
          <div>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold text-blue-300">Web Development:</span> Crafting responsive and high-performance web applications.</li>
              <li><span className="font-semibold text-pink-300">Mobile App Design:</span> Creating intuitive and engaging mobile experiences for iOS and Android.</li>
              <li><span className="font-semibold text-green-300">UI/UX Consulting:</span> Designing user-centric interfaces for optimal usability and aesthetic appeal.</li>
              <li><span className="font-semibold text-yellow-300">Cloud Solutions:</span> Implementing scalable and secure cloud infrastructure.</li>
            </ul>
          </div>
      ),
    },
    {
      label: "Contact Us",
      content: (
          <div>
            <p className="mb-2">Have a question or want to work with us? Feel free to reach out!</p>
            <p className="mb-1"><span className="font-semibold">Email:</span> info@example.com</p>
            <p className="mb-1"><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
            <p><span className="font-semibold">Address:</span> 123 Innovation Drive, Tech City, TX 78701</p>
          </div>
      ),
    },
    {
      label: "Our Team",
      content: (
          <div>
            <p className="mb-2">Meet the dedicated individuals who make our vision a reality.</p>
            <p className="text-gray-300">John Doe - CEO</p>
            <p className="text-gray-300">Jane Smith - Lead Developer</p>
            <p className="text-gray-300">Mike Johnson - UI/UX Specialist</p>
          </div>
      ),
    },
  ];

  return <TabsComponent tabsContent={tabs} />;
};

export default Tabs;