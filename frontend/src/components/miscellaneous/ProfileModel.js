import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function ProfileModel({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent bg=" #050325" color={'white'}>
          <ModalHeader
            fontSize={"40px"}
            fontFamily={"Comic Neue"}
            dislplay={"flex"}
            justifyContent='space-between'
            alignItems='center'
          >
           <center> {user.name}</center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display={'flex'}
          flexDirection={'column'}
          alignItems='center'
          justifyContent='space-between'
          
          >
            <Image borderRadius='full'boxSize={'150px'} src={user.pic} alt={user.name} />
          <Text p={'5px'} fontFamily={"Comic Neue"}>Email:{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
