import React from 'react'
import {object} from 'prop-types';
import Burger from './Burger';
import {Box, Flex, Text} from "rebass";

const Navbar = ({theme}) => {
  return (
    <Flex
      style={{padding: '0 20px'}}
      height='75px'
      color={theme.colors.header}
      bg={theme.colors.headerBkg}
      alignItems='center'>
      <Text p={2} fontWeight='bold'>Trivia Express</Text>
      <Box mx='auto'/>
      <Burger theme={theme}/>
    </Flex>
  )
}

Navbar.propTypes = {
  theme: object.isRequired
}

export default Navbar;
