import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutBasic.scss";

export default function LayoutBasic({ routes }){
    const { Content, Footer } = Layout;
    console.log(routes);

    return (    
        <Layout>
            <h2>Menu...</h2>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>mailto: agutierrez.pers@gmail.com</Footer>
            </Layout>
        </Layout>
    );
}

function LoadRoutes({ routes }){
    return (
        <Switch>
            {routes.map((route,index) => (
                <Route
                    key = {index}
                    path = {route.path}
                    exact = {route.exact}
                    component = {route.component}
                />
            ))}
        </Switch>
    );
}