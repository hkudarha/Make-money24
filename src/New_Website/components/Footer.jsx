import { Link, Router } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Routers } from '../../constants/Routes';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-8 gap-5">
          <div className="space-y-2">
            <Link to="/" className="md:text-xl text-lg font-bold text-white">
              Aetheric Dynamics MKT Private Limited,
            </Link>
            {/* <p className="text-gray-400 mt-2">
              H. No.04 Chamapk Nagar ,
              Bhetapara , Near Bharat Pet,
              Beltola, GMC Kamrup,
              Pincode - 781028 , ASSAM INDIA
            </p> */}

            <p className='text-gray-400  text-sm md:text-base'>
              <span>Building No./Flat No.:</span> Dewas Naka<br />
              <span>Road/Street:</span> LASUDIYA MORI<br />
              <span>Locality/Sub Locality:</span> 88/2/2/4 SINGHAL COMPOUND<br />
              <span>City/Town/Village:</span> Indore<br />
              <span>District:</span> Indore<br />
              <span>State:</span> Madhya Pradesh<br />
              <span>PIN Code:</span> 452010
            </p>
            <p className="text-gray-400  text-sm md:text-base">
              CIN: U14101AS2024PTC026780 <br />
              GSTIN: 23ABBCA1033C1ZO <br />
              Mobile: +91-89649 69960 <br />
              Email: admcare9@gmail.com <br />
            </p>
            <div className="flex space-x-4 pt-2">
              {/* <a href="#" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                <Twitter size={20} />
              </a> */}
          <a
  href="https://www.instagram.com/aetheric_dynamics?igsh=ZDA5dmlxbnk2Ymlm"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white transition text-sm md:text-base"
>
  <Instagram size={20} />
</a>

              {/* <a href="#" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                <Youtube size={20} />
              </a> */}
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Corporate Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to={Routers.Brand} className="text-gray-400 hover:text-white transition text-sm md:text-base">

                  Our Brand
                </Link>
              </li>
              <li>
                <Link to={Routers.Transparency} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Transparency
                </Link>
              </li>
              <li>
                <a
                  href="/pdfs/adm ppt.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm md:text-base"
                >
                  Incentive Plan
                </a>
              </li>
              <li>
                <a
                  href="/pdfs/adm ppt.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm md:text-base"
                >
                  Rewards
                </a>
              </li>

              <li>
                <a
                  href="/pdfs/Certificates.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm md:text-base"
                >
                  Compliance Documents
                </a>
              </li>

              <li>
                <Link to={Routers.benefitPage} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Benefits of working
                </Link>
              </li>
              <li>
                <Link to={Routers.aboutUs} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={Routers.faq} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={Routers.missionVissionValues} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Mission, Vision & Values
                </Link>
              </li>
              <li>
                <Link to={Routers.contact} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Events
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white"> Company Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link to={Routers.businessPlan} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Business Plan
                </Link>
              </li>
              <li>
                <Link to={Routers.ReturnRefundPolicy} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to={Routers.TermsAndCondition} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to={Routers.PrivacyPolicy} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={Routers.distributorPromotion} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Promotion of Distributor
                </Link>
              </li>
              <li>
                <Link to={Routers.codeConduct} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Aetheric Dynamics Mkt Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
