import { Pagination } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

function CharacterPagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const navigate = useNavigate();
  return (
    <Pagination
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        mb: 2,
      }}
      variant="outlined"
      count={totalPages}
      page={currentPage}
      color="primary"
      onChange={(_event, value) => {
        setCurrentPage(value);
        navigate({ to: `/character/page/${value}` });
      }}
    />
  );
}

export default CharacterPagination;
