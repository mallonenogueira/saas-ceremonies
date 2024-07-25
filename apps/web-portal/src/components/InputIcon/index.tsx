import { Icon, useStyleConfig } from "@chakra-ui/react";
import { ElementType } from "react";

export function InputIcon({ icon }: { icon: ElementType }) {
  const styles = useStyleConfig("InputIcon");

  return <Icon as={icon} __css={styles} />;
}
