import { useLoaderData } from "@tanstack/react-router";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
};

function CharacterDetail() {
  const data = useLoaderData({
    from: "/character/description/$id",
  }) as Character;

  return (
    <Paper sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={data.image}
          alt={data.name}
          style={{ width: 200, borderRadius: 8, marginBottom: 16 }}
        />
        <Typography variant="h5" gutterBottom>
          {data.name}
        </Typography>
        <Typography>Status: {data.status}</Typography>
        <Typography>Species: {data.species}</Typography>
        <Typography>Gender: {data.gender}</Typography>
        <Typography>Origin: {data.origin?.name}</Typography>
        <Typography>Location: {data.location?.name}</Typography>
      </Box>
    </Paper>
  );
}

export default CharacterDetail;
