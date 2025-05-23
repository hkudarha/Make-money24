import React from 'react';
import aboutsUsBanner from "../../../assets/images/aboutUsBanner.png";
import whywe from "../../../assets/images/whywe.jpg";
import about from "../../../assets/images/about.jpg";
import goal from "../../../assets/images/goal.avif";
import mission from "../../../assets/images/mission.jpg";
import vission from "../../../assets/images/vission.jpg";

const AboutUs = () => {
    return (
        <div className="font-sans">
            {/* Banner Section */}
            <div className="w-full h-[400px] md:h-[700px] relative">
                <img
                    src={aboutsUsBanner}
                    alt="About Us Banner"
                    className="w-full h-full object-cover rounded-b-3xl shadow-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-b-3xl">
                    <h1 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg">
                        About Us
                    </h1>
                </div>
            </div>

            {/* Why We Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-12 py-12 md:py-20 bg-[#f9f9f9]">
                <div className="animate-fadeInLeft">
                    <img
                        src={whywe}
                        alt="Why Choose Us"
                        className="rounded-tl-3xl rounded-br-3xl shadow-xl w-full transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="space-y-6 animate-fadeInRight">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Us?</h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        At <span className="font-semibold text-black">Aetheric Dynamics Marketing Private Limited</span>, fashion is not just about what you wear—it's a bold statement of your personality and style. We bring you the best of trends and timeless fashion, with a handpicked collection that resonates with elegance and uniqueness.
                    </p>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        Our team is passionate about quality and detail. Whether you're dressing for a casual outing or a special occasion, we ensure you find the perfect look. We’re here to inspire confidence through fashion—because you deserve to feel amazing every day.
                    </p>
                </div>
            </section>

            {/* About Us Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-12 py-12 md:py-20 bg-white">
                <div className="space-y-6 animate-fadeInRight order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        <span className="font-semibold text-black">Aetheric Dynamics Marketing Private Limited</span> is a leading name in the fashion industry.
                    </p>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        Specializing in online shopping for fashion wear, our journey began with a passion for fashion and a desire to bring high-quality, stylish apparel to fashion enthusiasts worldwide. We’ve built a reputation for excellence by combining cutting-edge technology with unparalleled customer service to create a seamless and enjoyable shopping experience. Our diverse product range includes everything from chic everyday wear to elegant evening attire, ensuring that you find the perfect outfit for any occasion.
                    </p>
                </div>

                <div className="animate-fadeInLeft order-1 md:order-2">
                    <img
                        src={about}
                        alt="About Company"
                        className="rounded-tl-3xl rounded-br-3xl shadow-xl w-full transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </section>
              <section className="bg-gray-50 py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Vision Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <img src={vission} alt="Our Vision" className="w-full h-48 object-cover" />
          <div className="p-6 space-y-3">
            <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We envision a world where fashion is inclusive, sustainable, and accessible—setting new industry standards with innovation, integrity, and impact.
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <img src={mission} alt="Our Mission" className="w-full h-48 object-cover" />
          <div className="p-6 space-y-3">
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To revolutionize fashion by delivering affordable, stylish, and sustainable clothing that empowers individuals to express themselves confidently.
            </p>          
          </div>
        </div>

        {/* Future Goals Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <img src={goal} alt="Future Goals" className="w-full h-52 object-cover" />
          <div className="p-6 space-y-3">
            <h3 className="text-2xl font-bold text-gray-800">Future Goals</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              From expanding eco-lines to AI-driven shopping, we're focused on global growth, ethical fashion, and empowering communities through innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default AboutUs;
