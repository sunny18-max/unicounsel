import styled, { createGlobalStyle } from 'styled-components';
import { theme, Theme } from './index';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    line-height: 1.5;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
  
  button, input, select, textarea {
    font-family: inherit;
  }
`;

// Layout Components
export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const Flex = styled.div<{ 
  direction?: 'row' | 'column';
  justify?: string;
  align?: string;
  gap?: keyof Theme['spacing'];
  wrap?: string;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};
  gap: ${({ gap = 'md', theme }) => theme.spacing[gap]};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
`;

export const Box = styled.div<{
  p?: keyof Theme['spacing'];
  px?: keyof Theme['spacing'];
  py?: keyof Theme['spacing'];
  m?: keyof Theme['spacing'];
  mx?: keyof Theme['spacing'];
  my?: keyof Theme['spacing'];
  width?: string;
  height?: string;
  bg?: keyof Theme['colors'] | string;
  borderRadius?: keyof Theme['borderRadius'];
  shadow?: keyof Theme['shadows'];
}>`
  padding: ${({ p, theme }) => p ? theme.spacing[p] : '0'};
  padding-left: ${({ px, theme }) => px ? theme.spacing[px] : '0'};
  padding-right: ${({ px, theme }) => px ? theme.spacing[px] : '0'};
  padding-top: ${({ py, theme }) => py ? theme.spacing[py] : '0'};
  padding-bottom: ${({ py, theme }) => py ? theme.spacing[py] : '0'};
  margin: ${({ m, theme }) => m ? theme.spacing[m] : '0'};
  margin-left: ${({ mx, theme }) => mx ? theme.spacing[mx] : '0'};
  margin-right: ${({ mx, theme }) => mx ? theme.spacing[mx] : '0'};
  margin-top: ${({ my, theme }) => my ? theme.spacing[my] : '0'};
  margin-bottom: ${({ my, theme }) => my ? theme.spacing[my] : '0'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  background-color: ${({ bg, theme }) => 
    bg && (theme.colors as any)[bg] ? (theme.colors as any)[bg] : bg || 'transparent'};
  border-radius: ${({ borderRadius = 'md', theme }) => theme.borderRadius[borderRadius]};
  box-shadow: ${({ shadow, theme }) => shadow ? theme.shadows[shadow] : 'none'};
`;

// Typography
export const Text = styled.p<{
  variant?: keyof Theme['typography'];
  color?: keyof Theme['colors'] | string;
  align?: 'left' | 'center' | 'right';
  weight?: number | string;
  lineHeight?: number | string;
}>`
  font-size: ${({ variant = 'body1', theme }) => 
    variant in theme.typography ? theme.typography[variant as keyof Theme['typography']] : variant};
  color: ${({ color = 'text.primary', theme }) => 
    color in theme.colors ? (theme.colors as any)[color] : color};
  text-align: ${({ align = 'left' }) => align};
  font-weight: ${({ weight = 'normal' }) => weight};
  line-height: ${({ lineHeight = 1.5 }) => lineHeight};
  margin: 0;
`;

export const Heading = styled(Text).attrs({ as: 'h1' })`
  font-weight: 700;
  line-height: 1.2;
`;

// Form Components
export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.body1};
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}40`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

export const Button = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  // Sizes
  ${({ size = 'md', theme }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.typography.caption};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.h5};
        `;
      default: // md
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.typography.body1};
        `;
    }
  }}
  
  // Variants
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          
          &:hover {
            background-color: ${theme.colors.secondary}cc;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover {
            background-color: ${theme.colors.primary}10;
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          
          &:hover {
            background-color: ${theme.colors.primary}10;
          }
        `;
      default: // primary
        return `
          background-color: ${theme.colors.primary};
          color: white;
          
          &:hover {
            background-color: ${theme.colors.primaryDark};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Card Component
export const Card = styled(Box)<{ hoverable?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  
  ${({ hoverable }) => hoverable && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }: { theme: Theme }) => theme.shadows.lg};
    }
  `}
`;

// Layout Components
export const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

// Navigation
export const Nav = styled.nav`
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Auth Forms
export const AuthForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

// Utility Classes
export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
