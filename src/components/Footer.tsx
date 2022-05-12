import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  border-top: 1px solid lightgrey;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <nav>검색</nav>
      <nav>즐겨찾기</nav>
      {/* <NavLink to={''}>즐겨찾기</NavLink> */}
    </FooterContainer>
  );
}
