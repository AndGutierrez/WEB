import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

export default function LayoutBasic(props){
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    console.log(props);

    return (    
        <Layout>
            <h2>Menu Sider Basic</h2>
            <Layout>
                <Header>Header</Header>
                <Content>...Rutas...
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>mailto: agutierrez.pers@gmail.com</Footer>
            </Layout>
        </Layout>
    );
}

function LoadRoutes({ routes }){
    return routes.map((route,index) => (
        <Route
            key = {index}
            path = {route.path}
            exact = {route.exact}
            component = {route.component}
        />
    ));
}