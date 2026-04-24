import { Navigate, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BrowsePage from './pages/BrowsePage';
import CampusFeedPage from './pages/CampusFeedPage';
import CreateListingPage from './pages/CreateListingPage';
import ListingDetailPage from './pages/ListingDetailPage';
import MessagesPage from './pages/MessagesPage';
import MyListingsPage from './pages/MyListingsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import StudentProfilePage from './pages/StudentProfilePage';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <div className="app-shell">
      <Banner />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/listing/:listingId" element={<ListingDetailPage />} />
          <Route path="/campus-feed" element={<CampusFeedPage />} />
          <Route path="/profile/:userId" element={<StudentProfilePage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
