import React, { useState } from "react";
import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();


  const handleClick = () => setShow(!show);


  const submitHandler = async() => {
    setLoading(true);
    if ( !email || !password ) {
      toast({
        title: "Pls Fill the all Block",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try{
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
         "/app/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo',JSON.stringify(data))
      setLoading(false)
      history('/chat')
    }catch(error){
      toast({
        title: "Error",
        description:error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
    }
  };
  return(
    <> <VStack spacing="5px" color={"white"}>
    <FormControl id="first-name" isRequired>
      <FormLabel borderColor={"#45A29E"}> Email</FormLabel>
      <Input
        placeholder="Enter Your Email "
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl id="first-name" isRequired>
      <FormLabel borderColor={"#45A29E"}> Password</FormLabel>
      <InputGroup>
      <Input
        type={show ?'text':"password"}
        placeholder="Enter Your PassWord"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="pink" h='2.75em' size='sm' onClick={handleClick}>{show ? 'Hide':'Show'}</Button>
      </InputGroup>
    </FormControl>
    
    <Button
       bg='rgb(175, 241, 230)'
       color={'darkblue'}
       width={'100%'}
       p='4px'
       onClick={submitHandler}
       isLoading={loading}>

         Login
    </Button>
    <Button
    variant={'solid'}
    colorScheme="pink"
    width="100%"
    onClick={()=>{
        setEmail('guest@examples.com')
        setPassword('123456789')
    }}>
     Get Guest USer Credentials
    </Button>
    
  </VStack>
    </>
  );
}
