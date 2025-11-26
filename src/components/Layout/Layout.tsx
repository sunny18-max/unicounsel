import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container } from '../../theme/styled';
import Navbar from './Navbar';

interface LayoutProps {
  isAuthenticated?: boolean;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated = false, children }) => {
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar isAuthenticated={isAuthenticated} />
      <Box 
        as="main" 
        flex={1} 
        py="xl"
        sx={{
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Container maxWidth="xl">
          {children || <Outlet />}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
