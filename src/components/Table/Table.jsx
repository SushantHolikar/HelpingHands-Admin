import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useEffect } from "react";
import { useState } from "react";


// function createData(name, trackingId, date, status, Email) {
//   return { name, trackingId, date, status, Email };
// }

// const rows = [
//   createData("Childern Safety", 18908415224, "2 March 2022", "Approved" ,"childrensafety@gmail.com" ),
//   createData("Turkey Ewarthquake", 189051568424, "2 March 2022", "Pending","turkeyearthquake@gmail.com" ),
//   createData("Malnutrition", 18908448424, "2 March 2022", "Approved","malnutrition@gmail.com"),
//   createData("XYZ", 18908479921, "2 March 2022", "Rejected","xyz@gmail.com"),
// ];

export default function BasicTable() {


const makeStyle = (verified) => {
  if (verified === "2") {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',

    }
  }
  else if (verified === "1") {
    return {
      background: '#fcffa4',
      color: '#ffc40c',
    }
  }
  else {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
}
const host = "https://helpinghands-backend.onrender.com"
  const [rows, setRows] = useState(null)
  const fillRows = (user) => {
    setRows(user)
  }

  useEffect(() => {
    // localhost:5000/api/auth/getuser
    const getUserProfile = async () => {
      const response = await fetch(`${host}/api/auth/getuserforhome`, {
        method: 'GET'
      });

      const json = await response.json();
      // fillRows(json)
      setRows(json)
      console.log(json)
      // setUser(json)    
    }
    getUserProfile();

    // console.log("side",user);

  }, [])
  var random = 1


  return (
      <div className="Table">
      <h3>Recent SignUps</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>NGO</TableCell>
              <TableCell align="left">NGO ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {rows && rows.map((row) => (
              <TableRow
                key={random++}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {random}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.NgoID}</TableCell>
                <TableCell align="left">{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell>
                <span className="status" style={makeStyle(row.adminVerified)}>{row.adminVerified === "1" ? "Pending" : row.adminVerified === "2" ? "Approved" : "Rejected"}</span>
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
