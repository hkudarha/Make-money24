import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainContent } from '../../constants/mainContent';
import { useSelector } from 'react-redux';
import { Routers } from '../../constants/Routes';
import { FaBars, FaCartPlus, FaSearch, FaTimes } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowRoundForward, IoMdHome } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const user = useSelector((state) => state.auth);
  const cartLength = user?.cartLength
  const isLoggedIn = user?.token;
  const userID = user?.user?.username
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      navigate("/user-dashboard");
    } else {
      navigate(Routers.Login);
    }
  };

  const categories = [
    {
      title: "Mens",
      img: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sub: [
        { name: "formal pant", },
        { name: "formal shirt" },
        { name: "denim" },
        { name: "chinos" },
        { name: "Casual shirt" },
        { name: "sweat shirt" },
        { name: "Tshirt" },
        { name: "Coller Tshirt" },
      ]
    },
    {
      title: "Womens",
      img: "https://images.unsplash.com/photo-1615233500570-c5d7576b4262?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sub: [
        { name: "formal pant", },
        { name: "formal shirt" },
        { name: "denim" },
        { name: "chinos" },
        { name: "kurti" },
        { name: "top" },
      ]
    },
    {
      title: "Accessories",
      img: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sub: [
        { name: "tie" },
        { name: "wallet" },
        { name: "Belts" },
        { name: "socks" },
      ]
    },


  ];

  return (
    <header
      className={`fixed top-0 left-0 flex items-center justify-between px-4 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="flex items-center gap-2">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden block">
          <FaBars className="text-lg text-gray-800" />
        </button>
        <Link to={"/"}>
          <img src={MainContent.logo1} alt="logo" className="w-[5rem]" />
        </Link>
      </div>

      <div className='hidden md:flex gap-10 items-center relative'>
        {categories.map((cat, idx) => (
          <div key={idx} className="relative group">
            <p className='cursor-pointer uppercase text-sm'>
              {cat.title}
            </p>
            <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md z-50 py-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {cat.sub.map((subCat, subIdx) => (
                <p
                  key={subIdx}
                  onClick={() => {
                    navigate(`/products?category=${encodeURIComponent(cat.title)}&subcategory=${encodeURIComponent(subCat.name)}`);
                  }}
                  className="px-4 py-2 capitalize hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  {subCat.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>


      <div className="flex items-center md:gap-4 gap-2">
      <Link to="/cart">
  <button className="p-2 rounded-full relative">
    <FaCartPlus className="text-lg" />
    {cartLength > 0 && (
      <div className="absolute -top-1 -right-1 rounded-full w-4 h-4 bg-red-500 flex items-center justify-center text-xs text-white">
        {cartLength}
      </div>
    )}
  </button>
</Link>

        <button
          onClick={handleAuthAction}
          className="text-white md:text-sm text-xs flex items-center gap-3 bg-bg-color px-3  md:px-4 py-2 rounded-md"
        >
          {isLoggedIn ? (
            <>
              Dashboard <IoMdHome className="md:text-2xl  text-lg" />
            </>
          ) : (
            <>
              Login <IoIosArrowRoundForward className="md:text-2xl  text-lg" />
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-[80%] max-w-xs h-full p-4 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-xl">
                  <FaTimes />
                </button>
              </div>

              <ul className="space-y-4">
                {categories.map((cat, catIndex) => (
                  <li key={catIndex}>
                    <div
                      onClick={() => {
                        setOpenCategory(openCategory === catIndex ? null : catIndex);
                        setOpenSubCategory(null); // reset subcategory when changing main
                      }}
                      className="font-normal text-gray-800 mb-1 flex justify-between items-center cursor-pointer transition-all duration-300"
                    >
                      <span>{cat.title}</span>
                      <span>{openCategory === catIndex ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                    </div>

                    <AnimatePresence>
                      {openCategory === catIndex && cat.sub && (
                        <motion.div
                          className="pl-3 space-y-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {cat.sub.map((subCat, subIndex) => (
                            <div key={subIndex}>
                              {subCat.items ? (
                                <>
                                  <div
                                    onClick={() =>
                                      setOpenSubCategory(
                                        openSubCategory === subIndex ? null : subIndex
                                      )
                                    }
                                    className="text-gray-700 font-normal cursor-pointer flex justify-between"
                                  >
                                    <span>{subCat.name}</span>
                                    <span>
                                      {openSubCategory === subIndex ? (
                                        <IoIosArrowUp />
                                      ) : (
                                        <IoIosArrowDown />
                                      )}
                                    </span>
                                  </div>

                                  <AnimatePresence>
                                    {openSubCategory === subIndex && (
                                      <motion.div
                                        className="pl-4 space-y-2"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {subCat.items.map((item, itemIndex) => (
                                          <div
                                            key={itemIndex}
                                            onClick={() => {
                                              navigate(
                                                `/shop?category=${encodeURIComponent(
                                                  cat.title
                                                )}&subcategory=${encodeURIComponent(
                                                  subCat.name
                                                )}&item=${encodeURIComponent(item)}`
                                              );
                                              setSidebarOpen(false);
                                            }}
                                            className="text-gray-600 text-sm cursor-pointer hover:text-black"
                                          >
                                            {item}
                                          </div>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </>
                              ) : (
                                <div
                                  onClick={() => {
                                    navigate(
                                      `/products?category=${encodeURIComponent(
                                        cat.title
                                      )}&subcategory=${encodeURIComponent(subCat.name)}`
                                    );
                                    setSidebarOpen(false);
                                  }}
                                  className="text-gray-700 font-normal cursor-pointer"
                                >
                                  {subCat.name}
                                </div>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
