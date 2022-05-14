import { FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 2px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding-top: 5px;
  background-color: white;

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
    align-items: center;
    justify-content: center;
    text-decoration-line: none;
    color: dimgray;
    font-size: 1.1rem;
  }

  .selected {
    background-color: aliceblue;
  }

  .bookmarkIcon,
  .searchIcon {
    margin: 0 5px;
  }

  .bookmarkIcon {
    color: orange;
  }

  .searchIcon {
    color: dimgrey;
  }
`;

export default function Footer() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <FooterContainer>
      <Link to="/" className={pathName === '/' ? 'selected' : ''}>
        <nav>
          <FiSearch className="searchIcon" color="dimgray" size="25" />
          <span>검색</span>
        </nav>
      </Link>
      <Link to="bookmark" className={pathName === '/bookmark' ? 'selected' : ''}>
        <nav>
          <FaStar className="bookmarkIcon" size="25" />
          <span>즐겨찾기</span>
        </nav>
      </Link>
    </FooterContainer>
  );
}
