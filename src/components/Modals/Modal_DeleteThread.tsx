import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { deleteThread } from "@/libs/api/call/thread";
import { GoTrash } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@/store";
import { getMyProfileAsync } from "@/store/async/profile";
import { getMyThreadAsync } from "@/store/async/thread";
import HashLoader from "react-spinners/HashLoader";

interface IThreadPostProps {
  threadId?: number;
}

const Modal_DeleteThread: React.FC<IThreadPostProps> = ({ threadId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const profile = useAppSelector((state) => state.auth.user);

  const handleDeleteThread = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await deleteThread(Number(threadId));
      await dispatch(getMyProfileAsync());
      if (profile?.id) {
        await dispatch(getMyThreadAsync(profile?.id));
      }

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoTrash
        onClick={onOpen}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          cursor: "pointer",
        }}
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="#424242" borderRadius={"12px"}>
          <ModalHeader color="white">
            Are you sure to delete this thread?
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <Button
              type="submit"
              bg="#e11616"
              mr={3}
              width={"100%"}
              borderRadius="30px"
              color="white"
              _hover={{ bg: "#c51111" }}
              onClick={handleDeleteThread}
              isDisabled={loading}
            >
              {loading ? <HashLoader color="#fff" size={18} /> : "Delete now"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modal_DeleteThread;
