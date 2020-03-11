import React from "react";
import {
  ThemeProvider,
  CSSReset,
  theme,
  Image,
  Stack,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  InputGroup,
  InputRightElement,
  Icon,
  Flex,
  Box,
  Tag,
  Text,
  IconButton,
  Progress,
  RadioGroup,
  AspectRatioBox
} from "@chakra-ui/core";

const Random = () => (
  <>
    {/* <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt={4}
    >
    </Flex> */}
    <Flex mt={100}>

    </Flex>
    {/* <Image
      size="100px"
      fallbackSrc="https://via.placeholder.com/150"
      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      width="100%"
      height="500px"
      minHeight="245px"
    /> */}
    <Flex
      justifyContent="space-between"
      alignItems="stretch"
      flexDirection="row"
    >
      <Flex justifyContent="flex-start">
        <Image height="100px" width="100px" />
      </Flex>
      <Flex>
        <IconButton aria-label="icon" icon="triangle-down" ml={1} mr={1} />
        <IconButton aria-label="icon" icon="copy" />
        <IconButton aria-label="icon" icon="triangle-up" ml={1} mr={1} />
      </Flex>
      <Flex>
      </Flex>
    </Flex>
  </>
);

export default Random;
