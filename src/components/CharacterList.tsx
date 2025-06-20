import { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CharacterPagination from "./Pagination";
import { changePageRoute } from "../routes";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

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

  // Define columns for react-table
  const columns = useMemo<ColumnDef<Character>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Details",
        cell: ({ row }) => (
          <Button
            variant="outlined"
            onClick={() =>
              navigate({ to: `/character/description/${row.original.id}` })
            }
          >
            View
          </Button>
        ),
      },
    ],
    [navigate]
  );

  // Setup react-table instance
  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return data && data.results ? (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 2, mb: 2, maxWidth: "fit-content" }}
      >
        <TableHead>
          <TableRow>
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))
              )}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
      <CharacterPagination
        totalPages={data.info?.count || 0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  ) : null;
}

export default CharacterList;
