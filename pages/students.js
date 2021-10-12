import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from "@mui/material";

const queryClient = new QueryClient();

export default function Students() {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentsTable />
    </QueryClientProvider>
  );
}

function StudentsTable() {
  const [students, setStudents] = useState([]);
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    axios
      .get("http://localhost:5000/user/")
      .then((response) => setStudents(response.data))
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error fetching data...</h1>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
