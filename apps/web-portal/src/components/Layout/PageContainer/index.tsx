import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function PageContainer({
  action,
  children,
}: {
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Box p="5" overflowY="auto" height="calc(100vh - 70px)">
      <HStack mb="2" justify="space-between">
        <Breadcrumb
          spacing="1"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Endereços</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {action}
      </HStack>

      {children}
    </Box>
  );
}
