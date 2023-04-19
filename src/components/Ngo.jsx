import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table/Table.css";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const NgoPage = () => {

  function createData(name, trackingId, date, status, Email) {
    return { name, trackingId, date, status, Email };
  }

  


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


  // const [user,setUser]=useState(null)
  const host = "https://helpinghands-backend.onrender.com"
  const [rows, setRows] = useState(null)


  const handleDropDownAccept=(e)=>{
    console.log('clicked')
     console.log(e.target.id);
    
    const sendReq=async()=>{
      const req=await fetch(`https://helpinghands-backend.onrender.com/user/${e.target.id}/1`);

      const data=await req.json();
      
      
      setRows(data.allUsers);
     }

     sendReq();
     

     
          
   }

   const handleDropDownReject=(e)=>{
    console.log('clicked')
     console.log(e.target.id);
    
    const sendReq=async()=>{
      const req=fetch(`https://helpinghands-backend.onrender.com/user/${e.target.id}/2`);

      const data=await req.json();
      
      setRows(data.allUsers);
     }

     sendReq();
     

     
          
   }

  const fillRows = (user) => {
    setRows(user)
  }
  useEffect(() => {
    // localhost:5000/api/auth/getuser
    const getUserProfile = async () => {
      const response = await fetch(`${host}/api/auth/getuser`, {
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
                <TableCell align="left">

                  {row.adminVerified === "1" ? (
                    <Dropdown className="status"  style={{ borderColor: "white", padding: "0" }}>
                      <Dropdown.Toggle id="dropdown-basic" style={{
                        background: "rgb(252, 255, 164)",
                        color: "rgb(255, 196, 12)", 
                      }}>
                        Pending
                      </Dropdown.Toggle>

                      <Dropdown.Menu  >
                        <Dropdown.Item  >
                          <button type="button" onClick={handleDropDownAccept} id={row._id} class="btn btn-outline-success">
                            Accept
                          </button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <button type="button" onClick={handleDropDownReject} id={row._id} class="btn btn-outline-danger">
                            Reject
                          </button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <span className="status" style={makeStyle(row.adminVerified)}>
                      {row.adminVerified === "1"
                        ? "Pending"
                        : row.adminVerified === "2"
                          ? "Approved"
                          : "Rejected"}
                    </span>
                  )}


                  {/* <span className="status" style={makeStyle(row.adminVerified)}>{row.adminVerified === "1" ? "Pending" : row.adminVerified === "2" ? "Approved" : "Rejected"}</span> */}
                  {/* <Dropdown className="status">
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                      Pending
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item ><button type="button" class="btn btn-outline-success">Accept</button></Dropdown.Item>
                      <Dropdown.Item ><button type="button" class="btn btn-outline-danger">Reject</button></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default NgoPage;


