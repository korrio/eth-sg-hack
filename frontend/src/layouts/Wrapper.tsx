import styled from 'styled-components';

const WrapperStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #f0effd47;
  backdrop-filter: blur(2px);
  z-index: -1;
  opacity: 0;
`;

const Wrapper = () => {
  return <WrapperStyle />;
};

export default Wrapper;
