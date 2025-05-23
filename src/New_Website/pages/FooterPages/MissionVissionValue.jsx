import React, { useState } from "react";
import banner from "../../../assets/images/mvv.png";
import {
  FaBullseye,
  FaEye,
  FaHandshake,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Section = ({ title, icon: Icon, children, noMargin }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${noMargin ? "" : "mb-4"} bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-red-500 hover:bg-red-600 text-white font-semibold text-base md:text-lg"
      >
        <div className="flex items-center gap-3">
          <Icon className="text-white text-lg md:text-xl" />
          <span>{title}</span>
        </div>
        {open ? (
          <FaChevronUp className="text-white text-sm md:text-base" />
        ) : (
          <FaChevronDown className="text-white text-sm md:text-base" />
        )}
      </button>

      {open && (
        <div className="px-4 md:px-6 py-4 bg-indigo-50 text-sm md:text-base animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

const MissionVisionValues = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 mt-16 md:mt-20 pb-10">
      {/* Banner */}
      <div
        className="h-[200px] md:h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${banner})` }}
      >
       
      </div>

      <div className=" mt-8 md:mt-12 px-4 sm:px-6">
        <Section title="Our Mission" icon={FaBullseye}>
          <p className="mb-2 font-semibold">Our mission is to shape your today.</p>
          <blockquote className="border-l-4 border-red-500 pl-4 text-gray-700 space-y-2">
            <p>Our mission is to uncover the latest insights for our users by embedding the best in class products and people in our ecommerce services. Our goal is to amplify our user’s growth by making India independent.</p>
            <p>We aim at making our Indian youth realize the power of money and business and make them more self-reliant.</p>
            <p>We here at Aetheric Dynamics work with a simple rule of earn and grow. Our basic approach is to provide the direct selling market a new way of work.</p>
          </blockquote>
        </Section>

        <Section title="Our Vision" icon={FaEye}>
          <p className="mb-2 font-semibold">Our vision is to build your tomorrow.</p>
          <blockquote className="border-l-4 border-red-500 pl-4 text-gray-700 space-y-2">
            <p>We aim to empower the leaders of today and tomorrow with indispensable management, forward thinking, and robust insights to achieve people’s individual goals.</p>
            <p>We strive to become a steering partner and a contributor in our user’s ecosystem by transforming fashion into mission-critical insights and delivering results that endure.</p>
            <p>We aim at working today for a better tomorrow.</p>
          </blockquote>
        </Section>

        <Section title="Our Values" icon={FaHandshake} noMargin>
          <p className="mb-2 font-semibold">Our values are to stand with you today and tomorrow.</p>
          <blockquote className="border-l-4 border-red-500 pl-4 text-gray-700 mb-4 space-y-2">
            <p>We at Aetheric Dynamics are guided by principles that uphold our growth and passion in pursuit of our user’s strategic priorities. Our values endorse and sustain our commitment to deliver the highest and unmatchable quality products with good business opportunity to our users.</p>
            <p>Safety and equality among the people of Aetheric Dynamics is our core value.</p>
            <p>We live by four powerful guiding principles that shape our way to deliver happiness among Aetheric Dynamics Community:</p>
          </blockquote>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
            <li>We treat people with respect and compassion.</li>
            <li>We embrace diversity, equity and inclusion.</li>
            <li>We encourage collaboration and teamwork.</li>
            <li>We expect support and excellence.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

export default MissionVisionValues;
