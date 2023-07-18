import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box,Text } from '@chakra-ui/react';
import SingleChat from './SingleChat';

export default function ChatBox({fetchAgain,setFetchAgain}) {
  const {selectedChat} = ChatState();
  return (
    <>
    <Box
    display={{base:selectedChat?'flex':'none',md:'flex'}}
    alignItems={'center'}
    flexDir={'column'}
    p={3}
    bg="#0d0220"
    w={{base:"100%",md:"68%"}}
    fontFamily={"Comic Neue"}
    borderRadius={"lg"}
    borderWidth={'2px'}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>

    </>
  )
}
