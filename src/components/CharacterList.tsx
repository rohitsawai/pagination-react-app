import { Outlet, useLoaderData, useNavigate } from "@tanstack/react-router";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CharacterPagination from "./Pagination";
import { useState } from "react";
import { changePageRoute } from "../routes";

type Character = {
  id: number;
  name: string;
};

type Info = {
  count: number;
  pages?: number;
  next?: string;
  prev?: string;
  [key: string]: number | string | undefined;
};

type CharacterListData = {
  results: Character[];
  info: Info;
};

function CharacterList() {
  const { page: pageNumber } = changePageRoute.useParams();

  const [currentPage, setCurrentPage] = useState(
    pageNumber ? parseInt(pageNumber, 10) : 1
  );
  const data = useLoaderData({
    from: "/character/page/$page",
  }) as CharacterListData;
  const navigate = useNavigate();

  return data && data.results ? (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 2, mb: 2, maxWidth: "fit-content" }}
      >
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results.map((character) => (
              <TableRow key={character.id}>
                <TableCell>{character.id}</TableCell>
                <TableCell>{character.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate({ to: `/character/description/${character.id}` })
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </TableContainer>
      <CharacterPagination
        totalPages={(data && data.info?.count) || 0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  ) : null;
}

export default CharacterList;
