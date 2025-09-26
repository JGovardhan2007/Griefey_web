
import { Typography, Box, Paper } from '@mui/material';

const GrievanceHistory = ({ history }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>History</Typography>
      {[...history].sort((a,b) => b.timestamp.seconds - a.timestamp.seconds).map((entry, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2">{new Date(entry.timestamp.seconds * 1000).toLocaleString()}</Typography>
          <Typography>Status: {entry.status}</Typography>
          <Typography>Notes: {entry.notes}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default GrievanceHistory;
