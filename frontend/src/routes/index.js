import Chat from "../pages/Chat";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SetAvatar from "../pages/SetAvatar";

//public routes
const publicRoutes = [
  { path: "/", component: LandingPage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/chat", component: Chat },
  { path: "/setAvatar", component: SetAvatar },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
