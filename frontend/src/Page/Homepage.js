import React, { useEffect } from "react";
import {
  Box,
  Tab,
  Tabs,
  Container,
  Text,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import {useNavigate} from "react-router-dom"


export default function Homepage() {
const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(!userInfo){
      navigate('/')
    } 
  }, [navigate]);

  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={"#0d0220"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="3xl"
          borderWidth="2px"
          borderColor="#45A29E"
          shadow='4px 4px 4px 4px'
        >
          <Text fontSize={"3xl"} fontFamily="Comic Neue" textAlign={"center"}>
            Talk To Each
          </Text>
        </Box>
        <Box
          bg={"#0d0220"}
          w="100%"
          p={4}
          borderRadius={"3xl"}
          borderWidth="2px"
          borderColor="#45A29E"
          shadow='4px 4px 4px 4px'

        >
          <Tabs fontFamily={'Comic Neue'} variant="soft-rounded" colorScheme="blue">
            <TabList mb="1em">
              <Tab width={"50%"} color={"white"}>
                Login
              </Tab>
              <Tab width={"50%"} color={"white"}>
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
}
