import React from 'react'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import Home from './pages/Home';
import CreateBlog from './components/CreateBlog';
import Layout from './components/Layout';
import YourBlogPosts from './pages/YourBlogPosts';
import ViewBlogInDetails from './pages/ViewBlogInDetails';
import ViewBlogsByTags from
  './pages/ViewBlogsByTags';
import AllUsersProfile from './pages/AllUsersProfile';
import EditBlog from './pages/EditBlog';
import UserProfile from './pages/UserProfile';
import DirectMessage from './pages/DirectMessage';
import ErrorPage from './components/ErrorPage';
import Followers from './pages/followers/Followers';
import Following from './pages/following/Following';
import SearchResults from './components/searchResults/SearchResults';
import UserRecentMessagesContacts from './components/UserRecentMessagesContacts/UserRecentMessagesContacts';
import VideoCall from './components/VideoCall/VideoCall';
import VideoCallRoom from './components/VideoCall/VideoCallRoom';
import GroupChatRoom from './components/GroupChatRoom/GroupChatRoom';
import GroupsListAll from './pages/GroupsListAll/GroupsListAll';
import GroupInformation from './pages/GroupInformation/GroupInformation';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import UsersSavedPosts from './pages/UsersSavedPosts/UsersSavedPosts';
import AllBlogsPosts from './components/AllBlogsPosts/AllBlogsPosts';
import CreateBlogEditor from './components/CreateBlogEditor/CreateBlogEditor';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/myblogs" element={<YourBlogPosts />} />

            <Route path="/blogdetails" element={<ViewBlogInDetails />} />

            <Route path='/tag/:tag' element={<ViewBlogsByTags />} />

            <Route path='/edit' element={<EditBlog />} />
            <Route path='/userprofile' element={<UserProfile />} />
            {/* /:username */}

            <Route path='/allusersprofiles' element={<AllUsersProfile />} />

            <Route path='/directmessage' element={<DirectMessage />} />

            <Route path='/followers' element={<Followers />} />
            <Route path='/followings' element={<Following />} />
            <Route path='/searchresults' element={<SearchResults />} />
            <Route path='/userrecentmessages' element={<UserRecentMessagesContacts />} />
            <Route path='/videocall' element={<VideoCall />} />
            <Route path='/videocallroom' element={<VideoCallRoom />} />
            <Route path='/groupchatroom' element={<GroupChatRoom />} />
            <Route path='/myallgroups' element={<GroupsListAll />} />
            <Route path='/groupinformation' element={<GroupInformation />} />
            <Route path='/profilesettings' element={<ProfileSettings />} />
            <Route path='/mysavedposts' element={<UsersSavedPosts />} />
            <Route path='/allblogsposts' element={<AllBlogsPosts />} />
            <Route path='/createblogeditor' element={<CreateBlogEditor />} />



            <Route path='*' element={<ErrorPage />} />

            {/* the invalid routes in the websiite */}
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  )
}

export default App
