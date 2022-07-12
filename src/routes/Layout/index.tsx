import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(23, 23, 30);
  font-family: 'Roboto Condensed', sans-serif;

  .app {
    padding-top: 10px;
    position: relative;
    box-sizing: border-box;
    width: 360px;
    height: 700px;
    border-radius: 30px;
    overflow: hidden;
    background-image: radial-gradient(
      circle 674px at 18.3% 77%,
      rgba(23, 23, 30, 1),
      rgba(44, 46, 59, 1)
    );
    border: 1px solid white;
  }
`;

const Layout = () => {
  return (
    <AppWrapper>
      <div className='app'>
        <Outlet />
        <Footer />
      </div>
    </AppWrapper>
  );
};

export default Layout;
