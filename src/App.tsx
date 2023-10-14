import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import PageLayout from './pages/PageLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <PageLayout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Route>
      {/* <Route path='/favorites' element={<Favorites />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/edit' element={<ProfileEdit />} />
      <Route path='/*' element={<NotFound />} />   */}
    </Routes>
  );
}

export default App;
