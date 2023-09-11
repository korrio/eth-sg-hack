import styled from 'styled-components';

const NavMenuStyle = styled.div`
  height: 64px;
  background: white;
  border-bottom: 1px solid #dbe2e5;
  display: flex;
  z-index: 200;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 25px;
  @media screen and (min-width: 850px) {
    display: none;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

type NavMenuProps = {
  children: React.ReactNode;
};

const NavMenu = ({ children }: NavMenuProps) => {
  return (
    <div>
      <NavMenuStyle>
        <div>txvendor</div>
        <div className="px-4">{children}</div>
      </NavMenuStyle>
    </div>
  );
};

export default NavMenu;
