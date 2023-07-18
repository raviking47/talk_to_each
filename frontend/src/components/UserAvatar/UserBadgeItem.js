import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function UserBadgeItem({ user, handleFuction }) {
  return (
    <>
      <Box
        px={2}
        py={1}
        borderRadius={"lg"}
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        bg="blue"
        color={"white"}
        cursor={"pointer"}
        onClick={handleFuction}
      >
        {user.name}
        <CloseIcon pl={1} />
      </Box>
    </>
  );
}
