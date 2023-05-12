import Header from './components/Header';
import LoginPage from './components/LoginPage'
import Register from './components/Register';
import List from './components/List';
import HeroSection from "./components/HeroSection"
import HomeContent from "./components/HomeContent"
import Home from './components/Home'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom";
import Detail from "./components/Detail"
import SavingData from "./components/SavingData"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Home/>} />
      <Route path="/login" >
        <Route index element={<LoginPage/>} />
      </Route>

      <Route path="/register" >
        <Route index element={<Register/>} />
      </Route>

      <Route path="/list">
        <Route path=":userId"element={<List/>} />
        <Route path=":userId/:postId"element={<Detail/>} />
        <Route index element={<List/>} />
      </Route>

      <Route path="/infoSaving">
        <Route index path=":userId"  element={<SavingData/>}/>
      </Route>


    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
