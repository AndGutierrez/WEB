// Layouts.
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages.
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";

// Pages.
import Contact from "../pages/Contact";
import Home from "../pages/Home";

// Others.
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                component: Error404,
            }
        ]
    }
];

export default routes;