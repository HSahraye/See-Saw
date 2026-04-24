import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Browse' },
  { to: '/campus-feed', label: 'Campus Feed' },
  { to: '/messages', label: 'Messages' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/my-listings', label: 'My Listings' },
  { to: '/profile/u1', label: 'Profile' },
  { to: '/admin', label: 'Admin' },
  { to: '/settings', label: 'Settings' },
];

function Navbar() {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <NavLink to="/" className="brand">
          See<span>Saw</span>
        </NavLink>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
