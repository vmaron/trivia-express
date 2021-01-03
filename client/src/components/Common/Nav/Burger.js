import React, {useState} from "react";
import styled from 'styled-components';
import RightNav from './RightNav';
import {useWindowSize} from "../../../hooks/useWindowSize";
import {object} from "prop-types";


const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  right: 20px;
  z-index: 100;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #fff;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({open}) => open ? 0 : 1};
    }

    &:nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = ({theme}) => {
  const [open, setOpen] = useState(false);
  const [width] = useWindowSize();

  const mobileLayout = width <= 768;
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div/>
        <div/>
        <div/>
      </StyledBurger>
      <RightNav theme={theme} open={open} isMobile={mobileLayout} onLinkClick={() => setOpen(false)}/>
    </>
  )
}

Burger.propTypes = {
  theme: object.isRequired
}

export default Burger
