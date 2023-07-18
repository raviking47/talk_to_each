import React from "react";
// import { ChatState } from "../../Context/ChatProvider";
import { Box, Avatar,Text } from "@chakra-ui/react";

export default function UserListItem({ user,handleFuction}) {
//   const { user } = ChatState();
  return (
    <>
      <Box
      fontFamily={'comic neue'}
      fontsize='x1'
        onClick={handleFuction}
        cursor="pointer"
        bg=" #47409e"
        color="white"
        _hover={{
          background: "#8d0877",
          color: "whitw",
        }}
        w="100%"
        display="flex"
        alignItem="Center"
        px={3}
        py={2}
        mb={1}
        borderRadius="10px"
        width="110%"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}
        />
        <Box>
            <Text >{user.name}</Text>
            <Text fontsize="x3">
                <b>Email:</b>
                {user.email}
            </Text>
     </Box>
      </Box>
    </>
  );
}
