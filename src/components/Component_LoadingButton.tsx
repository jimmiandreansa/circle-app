import { Button, ButtonProps } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";

type Props = ButtonProps & {
  isLoading?: boolean;
  loadingText?: string;
};

export default function Component_LoadingButton({
  isLoading,
  loadingText,
  children,
  isDisabled,
  ...props
}: Props) {
  const disabled = Boolean(isDisabled) || Boolean(isLoading);

  return (
    <Button isDisabled={disabled} {...props}>
      {isLoading ? (
        loadingText ? (
          loadingText
        ) : (
          <HashLoader color="#fff" size={24} />
        )
      ) : (
        children
      )}
    </Button>
  );
}

