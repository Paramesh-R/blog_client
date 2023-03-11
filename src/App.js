import './App.css';
import { Route, Routes } from 'react-router-dom'

// Import Pages
import Layout from './component/Layout';
import IndexPage from './pages/IndexPage'
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPostPage from "./pages/ViewPostPage";
import MyPostPage from './pages/MyPostPage'
import { UserContextProvider } from './UserContext';
import TestPage from './pages/TestPage';



function App() {
  return (
    <>

      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<IndexPage />} />
            <Route path={"/test"} element={<TestPage />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/view/:id"} element={<ViewPostPage />} />
            <Route path={"/edit/:id"} element={<EditPost />} />
            <Route path={"/mypost"} element={<MyPostPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
          </Route>

        </Routes>
      </UserContextProvider>
    </>

  );
}

export default App;
// Default React Code