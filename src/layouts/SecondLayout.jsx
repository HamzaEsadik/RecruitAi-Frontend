import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

const SecondLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SecondLayout;