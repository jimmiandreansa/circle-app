import {
  Image,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Grid,
  GridItem,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ImageIcon from "../../assets/iconsSvg/ImageIcon";
import { createThread } from "@/libs/api/call/thread";
import { useAppSelector } from "@/store";
import { useAppDispatch } from "@/store";
import { getThreadAsync } from "@/store/async/thread";
import { IoAddCircleOutline } from "react-icons/io5";

interface IThreadPostProps {
  threadId?: number;
  callback?: () => void;
}

const Modal_PostThread: React.FC<IThreadPostProps> = ({
  threadId,
  callback,
}) => {
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const profile = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const [formInput, setFormInput] = useState<{
    content: string;
    threadId?: number;
    image: FileList | null;
  }>({
    content: "",
    image: null,
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const filePromises = fileList.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises)
        .then((results) => {
          setPreviewImages(results);
          setFormInput({
            ...formInput,
            [name]: fileList,
          });
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    } else {
      setPreviewImages([]);
      setFormInput({
        ...formInput,
        [name]: value,
      });
    }
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("berhasil post");
    e.preventDefault();
    try {
      if (threadId) {
        formInput.threadId = threadId;
      }

      await createThread(formInput);

      if (callback) {
        await callback();
      }

      await dispatch(getThreadAsync());

      if (onClose) {
        onClose();
      }
      setFormInput({
        ...formInput,
        content: "",
        image: null,
      });
      setPreviewImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLargeScreen ? (
        <Button
          borderRadius="30px"
          fontSize="18px"
          bg="#00a013"
          color="white"
          _hover={{ bg: "#028311" }}
          onClick={onOpen}
        >
          Create Post
        </Button>
      ) : (
        <IoAddCircleOutline
          fontSize="28px"
          color="white"
          onClick={onOpen}
          display={"flex"}
          fontWeight={"semibold"}
        />
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="#424242" borderRadius={"12px"}>
          <ModalHeader color="white">Create a Post</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <form onSubmit={handlePost} encType="multipart/form-data">
              <Flex mb={4}>
                <Avatar
                  src={profile?.avatar ? profile?.avatar : ""}
                  minWidth={"42px"}
                  maxWidth={"42px"}
                  minHeight={"42px"}
                  maxHeight={"42px"}
                  objectFit={"cover"}
                  borderRadius={"50%"}
                  marginRight={"20px"}
                />
                <FormControl>
                  <Input
                    ref={initialRef}
                    padding="0"
                    color="white"
                    placeholder="What is happening?!"
                    resize={"none"}
                    name="content"
                    border="none"
                    focusBorderColor={"transparent"}
                    autoComplete={"off"}
                    value={formInput.content}
                    onChange={handleChange}
                  />
                </FormControl>
              </Flex>

              <hr />

              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={4}
              >
                <FormControl width={0}>
                  <FormLabel color="white">
                    <ImageIcon style={{ cursor: "pointer" }} />
                  </FormLabel>
                  <Input
                    accept="image/*"
                    type="file"
                    color="white"
                    style={{ display: "none" }}
                    placeholder="Your image..."
                    name="image"
                    multiple
                    max={4}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  paddingX={6}
                  bg="#00a013"
                  borderRadius="30px"
                  color="white"
                  _hover={{ bg: "#028311" }}
                >
                  Post
                </Button>
              </Flex>
            </form>
            {previewImages.length > 0 && (
              <Flex mt={4}>
                <Grid gridTemplateColumns={"repeat(4, 1fr)"} gap={2}>
                  {previewImages?.map((img, index: number) => (
                    <GridItem key={index} h={"100%"}>
                      <Image
                        key={index}
                        rounded={"md"}
                        w={"full"}
                        h={"full"}
                        objectFit={"cover"}
                        src={img}
                        alt={"img"}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modal_PostThread;
