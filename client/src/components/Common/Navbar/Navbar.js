import React from 'react'
import {string} from 'prop-types';
import {Box, Flex, Link as RebassLink, Text} from "rebass";
import {Link as RouterLink} from "react-router-dom";

const Navbar = ({theme}) => {
  return (
    <Flex
      px={2}
      color={theme.colors.header}
      bg={theme.colors.headerBkg}
      alignItems='center'>
      <Text p={2} fontWeight='bold'>Trivia Express</Text>
      <Box mx='auto'/>
      <RebassLink variant='nav' as={RouterLink} to="/">Flash Cards</RebassLink>
      <RebassLink variant='nav' as={RouterLink} to='/redux'>Redux Test</RebassLink>
    </Flex>
  );
};

Navbar.propTypes = {
  theme: string.isRequired
}

export default Navbar;
