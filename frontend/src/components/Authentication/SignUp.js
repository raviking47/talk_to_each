import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
// import { blue } from "@material-ui/core/colors";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassWord] = useState();
  const [Pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
   


  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    setLoading(true);
    console.log(pics.type);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(typeof pics);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "talkapp");
      data.append("cloud_name", "kingravi");
      fetch("https://api.cloudinary.com/v1_1/kingravi/image/upload/", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please  Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Password did't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
         "/app/user",
        { name, email, password },
        config
      );
      toast({
        title: "User Register",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo',JSON.stringify(data))
      setLoading(false)
      history('/chat')
    } catch (error) {
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

  return (
    <>
      <VStack spacing="5px" color={"white"}>
        <FormControl id="first-name" isRequired>
          <FormLabel borderColor={"#45A29E"}> Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
              type={show ? "text" : "password"}
              placeholder="Enter Your PassWord"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              h="2.75em"
              colorScheme="pink"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputGroup>
        </FormControl>
        <FormControl id="first-name" isRequired>
          <FormLabel borderColor={"#45A29E"}> Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your PassWord"
              onChange={(e) => setConfirmPassWord(e.target.value)}
            />
            <Button
              colorScheme="pink"
              h="2.75em"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputGroup>
        </FormControl>

        <FormControl id="first-name" isRequired>
          <FormLabel borderColor={"#45A29E"}> Upload Your picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.value)}
          />
        </FormControl>
        <Button
          bg="rgb(170, 250, 240)"
          color={"darkblue"}
          width={"100%"}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
}
