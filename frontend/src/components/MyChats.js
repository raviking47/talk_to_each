import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../Config/ChatLogic";
import GroupChatModel from "./miscellaneous/GroupChatModel";
export default function MyChats({fetchAgine}) {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/app/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "error.",
        description: error.message,
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log(user);
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        bg="#0d0220"
        w={{ base: "100%", md: "31%" }}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "33px" }}
          fontFamily={"Comic Neue"}
          display={"flex"}
          w="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
         My Chats
         <GroupChatModel>
          <Button
            display="flex"
            colorScheme="pink"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chats
          </Button>
         </GroupChatModel>
        </Box>

        <Box
          display={"flex"}
          flexDir={"colume"}
          p={3}
          bg="#ff0a7d"
          width={"100%"}
          height={"100%"}
          borderRadius={"lg"}
          overflow={"hidden"}
        >
          {chats ? (
            <Stack overflowY={"scroll"}>
              {chats.map((chat) => (
                <Box
                  colorScheme="pick"
                  onClick={() => setSelectedChat(chat)}
                  cursor={"pointer"}
                  bg={selectedChat === chat ? "#910fdd" : "#0d0220"}
                  color={selectedChat === chat ? "white" : "white"}
                  px={9}
                  py={5}
                  borderRadius={"lg"}
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
}
