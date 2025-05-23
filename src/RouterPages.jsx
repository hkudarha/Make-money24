import React, { useEffect } from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import { Routers } from "./constants/Routes";
import LandingPage from './Website/LandingPage';
import Layout from './layout/Layout';
import DashboardPage from './UserPanel/pages/Dashboard/DashboardPage';
import WalletPage from './UserPanel/pages/Wallet/WalletPage';
import PayoutPage from './UserPanel/pages/Payout/PayoutPage';
import E_pinPage from './UserPanel/pages/E-pin/E_pinPage';
import Login from './UserPanel/pages/Login/Login';
import ReferralMembers from './UserPanel/pages/ReferralMembers/ReferralMembers';
import ProductDetailsPage from './Website/ProductDetailsPage';
import ProtectedRoute from './utils/ProtectedRoute';
import ScrollToTop from './Component/ScrollToTop ';
import CartPage from './Website/CartPage';
import OrderHistory from './UserPanel/pages/OrderHistory/OrderHIstory';
import CheckoutPage from './Website/CheckoutPage';
import CouponPage from './UserPanel/pages/Coupon/CouponPage';
import CreateDistributor from './UserPanel/pages/CreateDistributor/CreateDistributor';
import MainLayout from './New_Website/layouts/MainLayout';
import HomePage from './New_Website/pages/HomePage';
import ProductDetailPage from './New_Website/pages/ProductDetailPage';
import NotFoundPage from './New_Website/pages/NotFoundPage';
import ProductsPage from './New_Website/pages/ProductsPage';
import ReturnRefundPolicy from './New_Website/pages/ReturnRefundPolicy';
import { getProfile } from './api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './Redux/Reducer/authReducer';
import ProfileForm from './UserPanel/pages/Profile/Profile';
import ForgotPassword from './UserPanel/pages/Password/ForgotPassword';
import ChangePassword from './UserPanel/pages/Password/ChangePassword';
import DownlineMembers from './UserPanel/pages/DownlineMembers/DownlineMembers';
import TermsAndCondition from './New_Website/pages/TermsAndCondition';
import PrivacyPolicy from './New_Website/pages/PrivacyPolicy';
import Transparency from './New_Website/pages/FooterPages/Transparency';
import Brand from './New_Website/pages/FooterPages/Brand';
import AboutUs from './New_Website/pages/FooterPages/AboutUs';
import BenefitPage from './New_Website/pages/FooterPages/BenefitPage';
import FAQPage from './New_Website/pages/FooterPages/FAQPage';
import MissionVisionValues from './New_Website/pages/FooterPages/MissionVissionValue';
import ContactUs from './New_Website/pages/FooterPages/ContactUs';
import BusinessPlans from './New_Website/pages/FooterPages/BusinessPlans';
import DistributorPromotion from './New_Website/pages/FooterPages/DistributorPromotion';
import CodeOfConduct from './New_Website/pages/FooterPages/CodeOfConduct';
import ChangePassword1 from './UserPanel/pages/Profile/ChangePassword1';
import IDCard from './UserPanel/pages/Profile/IDCard';
import News from './UserPanel/pages/News/News';
import Collection from './New_Website/pages/Collection';
import Invoice from './UserPanel/pages/Invoice/Invoice';
import PublicRoute from './utils/PublicRoute';
import E_pinList from './UserPanel/pages/E-pin/E_pinList';
import MQCList from './UserPanel/pages/Challenge/MQCList';
import DUCList from './UserPanel/pages/Challenge/DUCList';
import SupportForm from './UserPanel/pages/Support/SupportForm';
import SupportFormTable from './UserPanel/pages/Support/SupportFormTable';
import DownlineSaleList from './UserPanel/pages/DownlineMembers/DownlineSaleList';
import LicActivatation from './UserPanel/pages/LicActivatation/LicActivatation';
import Register from './UserPanel/pages/Register/Register';
const RouterPages = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getUserData = async () => {
            const data = await getProfile();
            if (data) {
                dispatch(loginSuccess({
                    token: data?.data?.token,
                    role: data?.data?.role,
                    user: data?.data?.data,
                    cartLength: data?.data?.data?.cartLength || 0

                }));
            }
        }
        getUserData()
    }, [])

    const user = useSelector((state) => state.auth);
    const userID = user?.user?.username

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route
                    element={
                        <PublicRoute>
                            <Outlet />
                        </PublicRoute>
                    }
                >
                    <Route path={Routers.Login} element={<Login />} />
                    <Route path={Routers.Register} element={<Register />} />
                    <Route path={Routers.forgotPassword} element={<ForgotPassword />} />
                    <Route path={Routers.ChangePassword} element={<ChangePassword />} />
                </Route>
                <Route path={Routers.webiste} element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductDetailPage />} />
                    <Route path="collections" element={<Collection />} />
                    <Route path={Routers.Cart} element={<CartPage />} />
                    <Route path={Routers.Checkout} element={<CheckoutPage />} />
                    <Route path={Routers.ReturnRefundPolicy} element={<ReturnRefundPolicy />} />
                    <Route path={Routers.TermsAndCondition} element={<TermsAndCondition />} />
                    <Route path={Routers.PrivacyPolicy} element={<PrivacyPolicy />} />
                    <Route path={Routers.Transparency} element={<Transparency />} />
                    <Route path={Routers.Brand} element={<Brand />} />
                    <Route path={Routers.benefitPage} element={<BenefitPage />} />
                    <Route path={Routers.aboutUs} element={<AboutUs />} />
                    <Route path={Routers.faq} element={<FAQPage />} />
                    <Route path={Routers.missionVissionValues} element={<MissionVisionValues />} />
                    <Route path={Routers.contact} element={<ContactUs />} />
                    <Route path={Routers.businessPlan} element={<BusinessPlans />} />
                    <Route path={Routers.distributorPromotion} element={<DistributorPromotion />} />
                    <Route path={Routers.codeConduct} element={<CodeOfConduct />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route
                    path={Routers.UserPanel}
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardPage />} />
                    <Route path={Routers.Wallet} element={<WalletPage />} />
                    <Route path={Routers.Payout} element={<PayoutPage />} />
                    <Route path={Routers.AddFund} element={<E_pinPage />} />
                    <Route path={Routers.FundHistory} element={<E_pinList />} />
                    <Route path={Routers.MQChallenge} element={<MQCList />} />
                    <Route path={Routers.DUChallenge} element={<DUCList />} />
                    <Route path={Routers.Support} element={<SupportForm />} />
                    <Route path={Routers.SupportList} element={<SupportFormTable />} />
                    <Route path={Routers.Member} element={<ReferralMembers />} />
                    <Route path={Routers.Downline} element={<DownlineMembers />} />
                    <Route path={Routers.DownlineSale} element={<DownlineSaleList />} />
                    <Route path={Routers.OrderHistory} element={<OrderHistory />} />
                    <Route path={Routers.Coupon} element={<CouponPage />} />
                    <Route path={Routers.CreateDistributor} element={<CreateDistributor />} />
                    <Route path={Routers.Profile} element={<ProfileForm />} />
                    <Route path={Routers.ResetPassword} element={<ChangePassword1 />} />
                    <Route path={Routers.IdCard} element={<IDCard />} />
                    <Route path={Routers.News} element={<News />} />
                    <Route path={Routers.Invoice} element={<Invoice />} />
                    <Route path={Routers.LicActivatation} element={<LicActivatation />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default RouterPages;
