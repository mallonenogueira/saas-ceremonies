import { Box, Button, ButtonGroup, HStack } from "@chakra-ui/react";

const getPages = ({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) => {
  const pages: Array<string | number> = [];

  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, 2);

    const startPage = Math.max(page + 1 - 2, 3);
    const endPage = Math.min(page + 1 + 2, totalPages - 2);

    if (startPage > 3) pages.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 2) pages.push("...");

    pages.push(totalPages - 1, totalPages);
  }

  return pages;
};

export interface PaginationProps {
  page: number;
  size: number;
  total: number;
  onChangePage: (page: number) => void;
}

export function Pagination({ page, size, total, onChangePage }: PaginationProps) {
  const totalPages = Math.ceil(total / size);

  const pages = getPages({ totalPages, page });

  return (
    <ButtonGroup
      display="flex"
      justifyContent="space-between"
      m="2"
      size="sm"
      colorScheme="gray"
      variant="ghost"
    >
      <Button
        isDisabled={page <= 0}
        onClick={() => onChangePage(page - 1)}
        fontSize="xs"
      >
        Anterior
      </Button>

      <HStack>
        {pages.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <Box key={index} px="2">
              ...
            </Box>
          ) : (
            <Button
              key={index}
              isDisabled={pageNumber === page + 1}
              onClick={() => onChangePage(Number(pageNumber) - 1)}
              fontSize="xs"
            >
              {pageNumber}
            </Button>
          )
        )}
      </HStack>

      <Button
        isDisabled={page + 1 >= totalPages}
        onClick={() => onChangePage(page + 1)}
        fontSize="xs"
      >
        Próxima
      </Button>
    </ButtonGroup>
  );
}
