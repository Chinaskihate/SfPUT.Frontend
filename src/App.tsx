import React, {FC, ReactElement} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import AuthProvider from "./auth/auth-provider";
import userManager, {
  loadUser,
    signinRedirect,
    signoutRedirect
} from "./auth/user-service";
import SigninOidc from "./auth/SigninOidc";
import SignoutOidc from "./auth/SignoutOidc";
import TagList from "./components/tags/TagList";
import Sidebar from "./components/sidebar/Sidebar";
import CreatePost from "./pages/CreatePost";
import CreateTag from "./pages/CreateTag";
import Search from "./pages/Search";
import Published from "./pages/Published";
import CreateSection from "./pages/CreateSection";
import Liked from "./pages/Liked";
import Profile from "./pages/Profile";
import {useModal} from "./hooks/useModal";
import {Modal} from "./hoc/modal";

const App: FC<{}> = (): ReactElement => {
  const {isShown, toggle}= useModal();
  loadUser();
  return (
    <div className="App">
      <button onClick={() => signinRedirect()}>Login</button>
      <button onClick={() => signoutRedirect()}>Logout</button>
      <button onClick={toggle}>Open modal</button>
      <AuthProvider userManager={userManager}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="signout-oidc" element={<SignoutOidc/>}/>
            <Route path="signin-oidc" element={<SigninOidc/>}/>
            <Route path='/profile' element={<Profile />} />
            <Route path='/liked' element={<Liked />} />
            <Route path='/published' element={<Published />} />
            <Route path='/search' element={<Search />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/create-tag' element={<CreateTag />} />
            <Route path='/create-section' element={<CreateSection />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Modal isShown={isShown} hide={toggle} modalContent={<p>Cont</p>} headerText={"head"}/>
    </div>
  );
}

export default App;
