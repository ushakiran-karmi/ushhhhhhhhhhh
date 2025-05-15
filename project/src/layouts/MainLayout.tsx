import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/navigation/MainNavbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <MainNavbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;