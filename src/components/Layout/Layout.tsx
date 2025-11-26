import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageContainer, MainContent, Container } from '../../theme/styled';
import Navbar from './Navbar';

interface LayoutProps {
  isAuthenticated?: boolean;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated = false, children }) => {
  return (
    <PageContainer>
      <Navbar isAuthenticated={isAuthenticated} />
      <MainContent>
        <Container>
          {children || <Outlet />}
        </Container>
      </MainContent>
    </PageContainer>
  );
};

export default Layout;