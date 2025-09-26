
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import GrievanceTable from '../components/GrievanceTable';
import { Container, Typography, Box } from '@mui/material';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'grievances'), (snapshot) => {
      const grievancesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGrievances(grievancesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grievance Dashboard
        </Typography>
        <GrievanceTable grievances={grievances} />
      </Box>
    </Container>
  );
};

export default Dashboard;
