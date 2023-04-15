import Header from './components/Header';
import LoginPage from './components/LoginPage';
import List from './components/List';
import HeroSection from "./components/HeroSection"
import HomeContent from "./components/HomeContent"
import Home from './components/Home'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Home/>} />
      <Route path="/login" >
        <Route index element={<LoginPage/>} />
      </Route>

      <Route path="/list">
        <Route path=":userId"element={<List/>} />
        <Route index element={<List/>} />
      </Route>
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
