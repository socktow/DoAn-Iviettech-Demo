/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from 'react';
import { Switch, Route, useParams, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/index';
import Footer from './components/Footer';
import './sass/_layout.scss';
import { AdminPage } from './pages';
import { ROUTES } from './constants/Router';
import { actGetProfile } from './redux/actions/authAction';
import { UpOutlined } from '@ant-design/icons';
import AdminLoginPage from './pages/AdminPage/AdminLoginPage';
import PrivateRoute from './components/AdminPage/PrivateRoute';
import { Spin } from 'antd';

const HomePage = React.lazy(() => import('./pages/UserPage/HomePage'));
const ProductPage = React.lazy(() => import('./pages/UserPage/ProductPage'));
const ProductDetail = React.lazy(() => import('./pages/UserPage/ProductDetail'));
const ProfilePage = React.lazy(() => import('./pages/UserPage/ProfilePage'));
const CartDetail = React.lazy(() => import('./pages/UserPage/CartDetail'));
const OrderedPage = React.lazy(() => import('./pages/UserPage/OrderedPage'));
const CheckOutPage = React.lazy(() => import('./pages/UserPage/CheckOutPage'));
const ChangeProfilePage = React.lazy(() => import('./pages/UserPage/ChangeProfilePage'));

function App() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();
    const { isLoggIn } = useSelector((state) => state.auth);
    const [showGoToTop, setShowGoToTop] = React.useState(false);
    const accessToken = JSON.parse(localStorage.getItem('accessToken')) || null;
    const isAdmin = Boolean(localStorage.getItem('admin_loggedIn'));

    React.useEffect(() => {
        if (accessToken) {
            dispatch(actGetProfile(accessToken));
        } else if (isAdmin) {
            dispatch(actGetProfile(isAdmin));
        }
    }, [dispatch]);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClickGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="App" style={{ position: 'relative', overflowX: 'hidden' }}>
            <Suspense fallback={<Spin tip="Loading..." className="spin-detail"></Spin>}>
                {!location.pathname.includes('/admin') && <Header />}
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/products">
                        <ProductPage />
                    </Route>
                    <Route path="/products/:id">
                        <ProductDetail />
                    </Route>
                    <Route path="/cart-detail">
                        <CartDetail />
                    </Route>
                    <Route path="/checkout">
                        <CheckOutPage />
                    </Route>
                    <Route path={ROUTES.LOGIN.path}>
                        <AdminLoginPage />
                    </Route>
                    <PrivateRoute path={ROUTES.DASHBOARD.path}>
                        <AdminPage />
                    </PrivateRoute>
                    {isLoggIn ? (
                        <>
                            <Route exact path="/profile">
                                <ProfilePage />
                            </Route>
                            <Route path="/profile/ordered">
                                <OrderedPage />
                            </Route>
                            <Route path="/profile/change-profile">
                                <ChangeProfilePage />
                            </Route>
                        </>
                    ) : (
                        <Redirect to="/"></Redirect>
                    )}
                </Switch>
                {showGoToTop && (
                    <button
                        style={{
                            position: 'fixed',
                            right: 50,
                            bottom: 20,
                            padding: 10,
                            backgroundColor: '#255c45',
                            border: 'none',
                            color: '#fff',
                            zIndex: 99,
                            borderRadius: '999px',
                        }}
                        onClick={() => handleClickGoToTop()}
                    >
                        <UpOutlined />
                    </button>
                )}
                {!location.pathname.includes('/admin') && <Footer />}
            </Suspense>
        </div>
    );
}

export default App;
