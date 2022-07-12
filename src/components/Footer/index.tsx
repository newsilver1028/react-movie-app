import { FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  background-color: transparent;

  nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    align-items: center;
    padding: 0 20px;
    cursor: pointer;
  }

  a {
    display: flex;
    flex-flow: row wrap;
    width: 50%;
    justify-content: center;
  }

  .selected {
    .bookmarkIcon,
    .searchIcon {
      color: white;
    }
  }

  .bookmarkIcon,
  .searchIcon {
    color: #6a6a73;
    margin: 0 5px;
  }
`;

const Footer = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <FooterContainer>
      <Link to='/' className={pathName === '/' ? 'selected' : ''}>
        <nav>
          <FiSearch className='searchIcon' size='25' />
        </nav>
      </Link>
      <Link to='bookmark' className={pathName === '/bookmark' ? 'selected' : ''}>
        <nav>
          <FaStar className='bookmarkIcon' size='25' />
        </nav>
      </Link>
    </FooterContainer>
  );
};

export default Footer;
