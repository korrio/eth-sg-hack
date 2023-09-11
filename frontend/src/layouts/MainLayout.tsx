import React from 'react';
import styled from 'styled-components';
import Aside from '@/layouts/Aside';
import Wrapper from '@/layouts/Wrapper';

const BodyContent = styled.div`
  background: white;
  //min-height: 100vh;
  position: relative;
  //width: 100%;
  margin-left: 250px;
  padding: 1rem;
`;

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Aside />
      {/* <Header /> */}
      <Wrapper />
      <BodyContent>{children}</BodyContent>
    </div>
  );
}
