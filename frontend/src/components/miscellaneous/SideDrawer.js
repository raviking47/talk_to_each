import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  Input,
  DrawerBody,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {  BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import {Spinner} from "@chakra-ui/react"

export default function SideDrawer() {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();
 
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/app/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
      console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: `Failed to Load the Search Results ${error}`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/app/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };



 
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="#0d0220"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={"5px"}
        // borderRadius={'15px'}
      >
        <Tooltip lable="Search user To Chat" hasArrow placeholder="bottom-end">
          <Button colorScheme="pink" onClick={onOpen}>
            <i class="fa  fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Comic Neue"}>
          Talk To Each
        </Text>
        <Menu>
          <MenuButton p={2}>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
          <MenuButton
            colorScheme="pink"
            variant={"outline"}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Avatar
              size="sm"
              cursor={"pointer"}
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList bg="#050325" color="white">
            <ProfileModel user={user}>
              <MenuItem bg="#050325">My Profile</MenuItem>
            </ProfileModel>
            <MenuDivider p={1} />
            <MenuItem bg="#050325" onClick={logoutHandler}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} bg="black">
        <DrawerOverlay />
        <DrawerContent bg={"#050325"} color={"White"}>
          <DrawerHeader borderBottomWidth="2px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={4}>
              <Input
                focusBorderColor="pink.400"
                placeholder="Search by Name and Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                colorScheme="pink"
                variant={"solid"}
                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFuction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" dislplay="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
