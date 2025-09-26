
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Typography, Box, TextField, Button, Paper, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import GrievanceHistory from '../components/GrievanceHistory';
import { Toaster, toast } from 'react-hot-toast';

const GrievanceDetails = () => {
  const { id } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchGrievance = async () => {
      const docRef = doc(db, 'grievances', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGrievance({ id: docSnap.id, ...docSnap.data() });
        setNewStatus(docSnap.data().status);
      }
    };
    fetchGrievance();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const grievanceRef = doc(db, 'grievances', id);

    const newHistoryEntry = {
        notes,
        status: newStatus,
        timestamp: new Date()
    }

    try {
        await updateDoc(grievanceRef, {
            status: newStatus,
            history: arrayUnion(newHistoryEntry)
        });
        setGrievance(prev => ({...prev, status: newStatus, history: [...prev.history, newHistoryEntry]}));
        toast.success('Grievance updated successfully');
    } catch (error) {
        toast.error('Error updating grievance');
        console.error("Error updating document: ", error);
    }

  };

  if (!grievance) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
        <Toaster />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grievance Details
        </Typography>
        <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">Category: {grievance.category}</Typography>
            <Typography>Description: {grievance.description}</Typography>
            <Typography>Status: {grievance.status}</Typography>
            <Typography>Submitted: {new Date(grievance.submittedAt.seconds * 1000).toLocaleString()}</Typography>
            {grievance.fileUrl && <a href={grievance.fileUrl} target="_blank" rel="noopener noreferrer">View Attachment</a>}
        </Paper>
        <GrievanceHistory history={grievance.history} />

        <Box component="form" onSubmit={handleUpdate} sx={{ mt: 4 }}>
            <Typography variant="h6">Update Grievance</Typography>
            <FormControl fullWidth sx={{my: 2}}>
              <InputLabel>Status</InputLabel>
                <Select
                    value={newStatus}
                    label="Status"
                    onChange={(e) => setNewStatus(e.target.value)}
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Notes"
                multiline
                rows={4}
                fullWidth
                value={notes}
                onChange={e => setNotes(e.target.value)}
                sx={{my: 2}}
            />
            <Button type="submit" variant="contained">Update</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default GrievanceDetails;
