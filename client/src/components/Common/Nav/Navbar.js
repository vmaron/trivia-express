import React from 'react'
import Burger from './Burger';
import {Box, Flex, Text} from "rebass";
import {useThemeUI} from 'theme-ui';

const Navbar = () => {
  const context = useThemeUI();
  const {theme} = context;

  return (
    <Flex
      style={{padding: '0 20px'}}
      height='75px'
      color={theme.colors.header}
      bg={theme.colors.headerBkg}
      alignItems='center'>
      <Text p={2} fontWeight='bold'>Trivia Express</Text>
      <Box mx='auto'/>
      <Burger/>
    </Flex>
  )
}

export default Navbar;
