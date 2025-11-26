import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav, NavContainer, Flex, Button, Box, Avatar } from '../../theme/styled';

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  return (
    <Nav>
      <NavContainer>
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Box as="h1" fontSize="1.5rem" fontWeight={700} color="primary">
              UniCounsel
            </Box>
          </Link>
          
          {!isAuthPage && !isAuthenticated && (
            <Flex gap="md" align="center">
              <Button as={Link} to="/login" variant="outline" size="sm">
                Sign In
              </Button>
              <Button as={Link} to="/signup" size="sm">
                Get Started
              </Button>
            </Flex>
          )}

          {isAuthenticated && (
            <Flex gap="md" align="center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                size="sm"
              >
                Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                size="sm"
              >
                Logout
              </Button>
              <Avatar 
                src="/default-avatar.png" 
                alt="User" 
                size="sm"
                onClick={() => navigate('/profile')}
                style={{ cursor: 'pointer' }}
              />
            </Flex>
          )}
        </Flex>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
