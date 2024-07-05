import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { updatedProfile } from "@/libs/api/call/profile";
import { getProfileAsync } from "@/store/async/auth";
import { getThreadAsync } from "@/store/async/thread";
import { getMyProfileAsync } from "@/store/async/profile";
import { FiEdit } from "react-icons/fi";
import HashLoader from "react-spinners/HashLoader";

const Modal_EditProfile: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const profile = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state: RootState) => state.profile);

  console.log("ini lpading", loading);

  const [updateProfile, setUpdateProfile] = useState<{
    username: string;
    fullname: string;
    bio: string;
    avatar: File | null | string;
    cover: File | null | string;
  }>({
    username: profile?.user.username || "",
    fullname: profile?.user.fullname || "",
    bio: profile?.bio || "",
    avatar: null,
    cover: null,
  });

  const [imageCoverPreview, setImageCoverPreview] = useState<
    string | undefined
  >();
  console.log(imageCoverPreview);
  const [imageAvatarPreview, setImageAvatarPreview] = useState<
    string | undefined
  >();

  const handleEdit = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();

      await updatedProfile(updateProfile);

      setUpdateProfile(updateProfile);
      await dispatch(getThreadAsync());
      await dispatch(getProfileAsync());
      await dispatch(getMyProfileAsync());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageAvatarPreview(imageUrl);
    }
    setUpdateProfile({
      ...updateProfile,
      avatar: file || profile?.avatar || null,
    });
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageCoverPreview(imageUrl);
    }
    setUpdateProfile({
      ...updateProfile,
      cover: file || profile?.cover || null,
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        border="1px solid white"
        borderRadius="20px"
        color="white"
        height={"32px"}
        fontSize="14px"
        _hover={{ color: "gray" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent bg="#424242" borderRadius={"12px"} width={"80%"}>
          <ModalHeader color="white" padding={{ base: "16px", md: "24px" }}>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody
            padding={{ base: "0px 16px 16px 16px", md: "0px 24px 24px 24px" }}
          >
            <Box position="relative">
              <FormControl>
                <FormLabel position={"relative"} margin={0}>
                  <Image
                    src={
                      profile?.cover
                        ? profile?.cover
                        : "https://images.unsplash.com/photo-1545431781-3e1b506e9a37?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    objectFit={"cover"}
                    borderRadius="12px"
                    height={{ base: "100px", md: "120px" }}
                    width="100%"
                    cursor={"pointer"}
                  />
                  <Flex
                    position="absolute"
                    top={12}
                    right={44}
                    gap={2}
                    display={{ base: "none", md: "flex" }}
                  >
                    <FiEdit size={28} color="#00a013" cursor={"pointer"} />
                    <Text
                      fontWeight={"bold"}
                      fontSize="20px"
                      cursor={"pointer"}
                    >
                      Edit Cover
                    </Text>
                  </Flex>
                </FormLabel>
                <Input
                  accept="image/*"
                  type="file"
                  color="white"
                  style={{ display: "none" }}
                  placeholder="Your image..."
                  name="image"
                  onChange={handleCover}
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <Avatar
                    src={
                      imageAvatarPreview ? imageAvatarPreview : profile?.avatar
                    }
                    position="absolute"
                    top={-12}
                    left={8}
                    width={"72px"}
                    height={"72px"}
                    border="4px solid #424242"
                    cursor={"pointer"}
                  />
                  <Flex
                    position="absolute"
                    top={-6}
                    left={14}
                    gap={2}
                    display={{ base: "none", md: "block" }}
                  >
                    <FiEdit size={24} color="#00a013" cursor={"pointer"} />
                  </Flex>
                </FormLabel>
                <Input
                  accept="image/*"
                  type="file"
                  color="white"
                  style={{ display: "none" }}
                  placeholder="Your image..."
                  name="image"
                  onChange={handleAvatar}
                />
              </FormControl>
            </Box>
            <FormControl marginTop="42px">
              <Box
                border="1px solid gray"
                borderRadius="8px"
                padding="0 12px"
                marginBottom="8px"
              >
                <Text
                  color="gray"
                  fontSize="14px"
                  marginTop="8px"
                  marginBottom={"-8px"}
                >
                  Name
                </Text>
                <Input
                  ref={initialRef}
                  fontWeight={"semibold"}
                  fontSize={"18px"}
                  padding="0"
                  color="white"
                  border="none"
                  focusBorderColor={"transparent"}
                  value={updateProfile.fullname}
                  onChange={(e) => {
                    setUpdateProfile({
                      ...updateProfile,
                      fullname: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box
                border="1px solid gray"
                borderRadius="8px"
                padding="0 12px"
                marginBottom="8px"
              >
                <Text
                  color="gray"
                  fontSize="14px"
                  marginTop="8px"
                  marginBottom={"-8px"}
                >
                  Username
                </Text>
                <Input
                  id="username"
                  ref={initialRef}
                  fontWeight={"semibold"}
                  fontSize={"18px"}
                  padding="0"
                  color="white"
                  border="none"
                  focusBorderColor={"transparent"}
                  value={updateProfile.username}
                  onChange={(e) => {
                    setUpdateProfile({
                      ...updateProfile,
                      username: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box
                border="1px solid gray"
                borderRadius="8px"
                padding="0 12px"
                marginBottom="8px"
              >
                <Text color="gray" fontSize="14px" marginTop="8px">
                  Bio
                </Text>
                <Textarea
                  ref={initialRef}
                  resize="none"
                  fontWeight={"semibold"}
                  fontSize={"18px"}
                  padding="0"
                  color="white"
                  border="none"
                  focusBorderColor={"transparent"}
                  value={updateProfile.bio}
                  onChange={(e) => {
                    setUpdateProfile({
                      ...updateProfile,
                      bio: e.target.value,
                    });
                  }}
                />
              </Box>
            </FormControl>
            <FormControl
              mt={4}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <Button
                bg="#00a013"
                borderRadius="30px"
                color="white"
                _hover={{ bg: "#028311" }}
                onClick={handleEdit}
              >
                {loading ? (
                  <HashLoader color={"#fff"} loading={loading} size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modal_EditProfile;
