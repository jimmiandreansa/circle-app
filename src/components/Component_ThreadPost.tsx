import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  createThreadAsync,
  getThreadAsync,
  getThreadReplyAsync,
} from "@/store/async/thread";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import {
  TbCircleDashedNumber1,
  TbCircleDashedNumber2,
  TbCircleDashedNumber3,
  TbCircleDashedNumber4,
} from "react-icons/tb";
import HashLoader from "react-spinners/HashLoader";

interface IThreadPostProps {
  threadId?: number;
  isComment: boolean;
  callback?: () => void;
}

const Component_ThreadPost: React.FC<IThreadPostProps> = ({
  threadId,
  isComment,
  callback,
}) => {
  const profile = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const { errorMessage, loading } = useAppSelector(
    (state: RootState) => state.thread
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
        .then((results) => {
          console.log(results);
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

      await dispatch(createThreadAsync(formInput));

      if (callback) {
        await callback();
      }

      await dispatch(getThreadAsync());
      await dispatch(getThreadReplyAsync(threadId!));

      setFormInput({
        ...formInput,
        content: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = () => {
    setFormInput({
      content: "",
      image: null,
    });
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        width={"100%"}
      >
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
        <form
          onSubmit={handlePost}
          encType="multipart/form-data"
          style={{ display: "flex", width: "100%", alignItems: "center" }}
        >
          <FormControl>
            <Input
              padding="0"
              color="white"
              autoComplete="off"
              placeholder="Type here..."
              resize={"none"}
              name="content"
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
                width={"102px"}
                color="white"
                _hover={{ bg: "#028311" }}
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
      </Flex>
      {isComment ? null : (
        <Box>
          {visible ? (
            <Text ml={"60px"} mt={-1} fontSize={"14px"} color={"red"}>
              {errorMessage}
            </Text>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default Component_ThreadPost;
