import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img2 from "../assets/slider/zoom/2.png";
import img3 from "../assets/slider/zoom/3.png";
import img4 from "../assets/slider/zoom/4.png";

const HomePageAnimation = () => {
    const swiperImages = [img2, img3, img4];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % swiperImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full md:min-h-[35rem] h-40 overflow-hidden rounded-lg">
            <AnimatePresence>
                <motion.img
                    key={activeIndex}
                    src={swiperImages[activeIndex]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute w-full h-full object-cover"
                    alt={`Slide ${activeIndex + 1}`}
                />
            </AnimatePresence>
        </div>
    );
};

export default HomePageAnimation;
