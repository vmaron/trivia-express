import React from 'react';
import styled from 'styled-components';
import {Link as RebassLink} from "rebass";
import {Link as RouterLink} from "react-router-dom";
import {bool, func} from "prop-types";
import {useThemeUI} from "theme-ui";

const Nav = styled.div`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.mobileMenuBkg};
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    margin: 0;
    z-index: 99;
    transform: ${({open}) => open ? 'translateY(0)' : 'translateY(-100%)'};
    transition: ${({isMobile}) => isMobile ? 'transform .4s, opacity .4s' : ''};

    a {
      padding: 10px 0;
      font-size: 20px;
    }
  }
`;

const RightNav = ({open, isMobile, onLinkClick = f => f}) => {
  const context = useThemeUI()
  const {theme} = context;

  return (
    <Nav open={open} isMobile={isMobile} theme={theme}>
      <RebassLink variant='nav' as={RouterLink} to="/" onClick={() => onLinkClick()}>Flash Cards</RebassLink>
      <RebassLink variant='nav' as={RouterLink} to='/redux' onClick={() => onLinkClick()}>Redux Test</RebassLink>
      <RebassLink variant='nav' as={RouterLink} to="/" onClick={() => onLinkClick()}>Sign In</RebassLink>
      <RebassLink variant='nav' as={RouterLink} to="/" onClick={() => onLinkClick()}>Sign Up</RebassLink>
    </Nav>
  )
}

RightNav.propTypes = {
  open: bool.isRequired,
  isMobile: bool.isRequired,
  onLinkClick: func.isRequired
}

export default RightNav
