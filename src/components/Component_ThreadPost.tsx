import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  createThreadAsync,
} from "@/store/async/thread";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import {
  TbCircleDashedNumber1,
  TbCircleDashedNumber2,
  TbCircleDashedNumber3,
  TbCircleDashedNumber4,
} from "react-icons/tb";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";

interface IThreadPostProps {
  threadId?: number;
  isComment: boolean;
  callback?: () => void;
}

const Component_ThreadPost: React.FC<IThreadPostProps> = ({
  threadId,
  callback,
}) => {
  const profile = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { loading } = useAppSelector(
    (state: RootState) => state.thread
  );

  const [formInput, setFormInput] = useState<{
    content: string;
    threadId?: number;
    image: FileList | null;
  }>({
    content: "",
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        .then(() => {
          setFormInput({
            ...formInput,
            [name]: fileList,
          });
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    } else {
      setFormInput({
        ...formInput,
        [name]: value,
      });
    }
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (threadId) {
        formInput.threadId = threadId;
      }

      const action = await dispatch(createThreadAsync(formInput));
      if (action.meta.requestStatus === "fulfilled") {
        toast.success("Posted successfully!");
      } else {
        toast.error("Failed to post. Please try again.");
      }

      if (callback) {
        callback();
      }
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      if (threadId) {
        await queryClient.invalidateQueries({ queryKey: ["thread", threadId, "replies"] });
        await queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
      }

      setFormInput({
        ...formInput,
        content: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to post. Please try again.");
    }
  };

  const removeImage = () => {
    setFormInput({
      content: "",
      image: null,
    });
  };

  const height = useBreakpointValue({ base: "36px", md: "40px", lg: "42px" });
  const width = useBreakpointValue({ base: "36px", md: "40px", lg: "42px" });
  const marginRight = useBreakpointValue({
    base: "12px",
    md: "16px",
    lg: "20px",
  });

  return (
    <>
      <Flex
        alignItems={"center"}
        width={"100%"}
        ml={{ base: "-1px", lg: "0px" }}
      >
        <Avatar
          src={profile?.avatar ? profile?.avatar : ""}
          objectFit={"cover"}
          borderRadius={"50%"}
          style={{ height, width, marginRight }}
        />
        <form
          onSubmit={handlePost}
          encType="multipart/form-data"
          style={{
            display: "flex",
            width: "100%",
            height: "36px",
            alignItems: "center",
          }}
        >
          <FormControl>
            <Input
              padding="0"
              color="white"
              autoComplete="off"
              placeholder="Type here..."
              resize={"none"}
              name="content"
              height={"20px"}
              fontSize={{ base: "14px", md: "16px" }}
              border="none"
              focusBorderColor={"transparent"}
              value={formInput.content}
              onChange={handleChange}
            />
          </FormControl>
          <Flex alignItems="center">
            <FormControl>
              <FormLabel color="white" mt={2}>
                {formInput.image ? (
                  <Box display={"flex"} gap={"2"} alignItems={"center"}>
                    {formInput.image?.length === 1 && (
                      <TbCircleDashedNumber1
                        style={{
                          cursor: "none",
                          color: "#00a013",
                          fontSize: "28px",
                        }}
                      />
                    )}
                    {formInput.image?.length === 2 && (
                      <TbCircleDashedNumber2
                        style={{
                          cursor: "none",
                          color: "#00a013",
                          fontSize: "28px",
                        }}
                      />
                    )}
                    {formInput.image?.length === 3 && (
                      <TbCircleDashedNumber3
                        style={{
                          cursor: "none",
                          color: "#00a013",
                          fontSize: "28px",
                        }}
                      />
                    )}
                    {formInput.image?.length === 4 && (
                      <TbCircleDashedNumber4
                        style={{
                          cursor: "none",
                          color: "#00a013",
                          fontSize: "28px",
                        }}
                      />
                    )}
                    <FaRegTrashAlt
                      onClick={removeImage}
                      style={{
                        cursor: "pointer",
                        color: "#00a013",
                        fontSize: "24px",
                      }}
                    />
                  </Box>
                ) : (
                  <RiImageAddLine
                    style={{
                      cursor: "pointer",
                      color: "#00a013",
                      fontSize: "28px",
                    }}
                  />
                )}
              </FormLabel>
              <Input
                accept="image/*"
                type="file"
                multiple
                max={4}
                height={"10px"}
                color="white"
                style={{ display: "none" }}
                placeholder="Your image..."
                name="image"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                type="submit"
                bg="#00a013"
                borderRadius="30px"
                width={"100%"}
                color="white"
                size={{ base: "sm", md: "md" }}
                _hover={{ bg: "#028311" }}
                isDisabled={loading}
              >
                {loading ? (
                  <HashLoader color={"#fff"} loading={loading} size={24} />
                ) : (
                  "Post Now"
                )}
              </Button>
            </FormControl>
          </Flex>
        </form>
        <ToastContainer position="bottom-right" />
      </Flex>
    </>
  );
};

export default Component_ThreadPost;
