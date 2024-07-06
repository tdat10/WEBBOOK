import { Card, CardContent, CardHeader, Grid,Typography, Button } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link'
import TableUsers from './TableUsers'
import AddBoxIcon from '@mui/icons-material/AddBox';


const Order = () => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const resp = await fetch("http://127.0.0.1:8080/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (resp.ok) {
          const data = await resp.json();
          setUsers(data);
          const usersArray = data.data;

          const objectData = usersArray.reduce((acc, user) => {
            acc[user.id] = user; 
            
            return acc;
          },{})
          console.log("Fetch successful", objectData);
        } else {
          console.error("Fetch failed", resp.status, resp.statusText);
          alert("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users", error);
        alert("An error occurred while fetching users");
      }
    };

    fetchUser();
  }, []);

  return (
    <Grid container>
        
        <Grid item xs={12}> 
            <Card>
              <CardContent> 
                
              </CardContent>
              <TableUsers rows={users} />
            </Card>
        </Grid>
    </Grid> 
  )
}

export default Order