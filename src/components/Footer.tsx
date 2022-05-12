import { FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding-top: 5px;
  /* border-top: 1px solid lightgrey; */

  nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
  }

  span {
    color: dimgray;
    font-size: 1.1rem;
  }

  .bookmarkIcon,
  .searchIcon {
    margin: 0 5px;
    width: 25px;
    height: 25px;
  }

  .bookmarkIcon {
    color: orange;
  }

  .searchIcon {
    color: dimgrey;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <nav>
        <FiSearch className="searchIcon" color="dimgray" size="s" />
        <span>검색</span>
      </nav>
      <nav>
        <FaStar className="bookmarkIcon" size="small" />
        <span>즐겨찾기</span>
      </nav>
      {/* <NavLink to={''}>즐겨찾기</NavLink> */}
    </FooterContainer>
  );
}
