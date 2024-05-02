import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PageDashboard, PageOrder, PageProduct, PageSetting, PageUser } from '../../pages';
import { ROUTES } from '../../constants/Router';

const MainContent = () => {
    return (
        <>
            <Switch>
                <Route exact={ROUTES.DASHBOARD.exact} path={ROUTES.DASHBOARD.path}>
                    <PageDashboard />
                </Route>
                <Route exact={ROUTES.PRODUCT.exact} path={ROUTES.PRODUCT.path}>
                    <PageProduct />
                </Route>
                <Route exact={ROUTES.ORDER.exact} path={ROUTES.ORDER.path}>
                    <PageOrder />
                </Route>
                <Route exact={ROUTES.USER.exact} path={ROUTES.USER.path}>
                    <PageUser />
                </Route>
                <Route exact={ROUTES.SETTING.exact} path={ROUTES.SETTING.path}>
                    <PageSetting />
                </Route>
            </Switch>
        </>
    );
};

export default MainContent;
