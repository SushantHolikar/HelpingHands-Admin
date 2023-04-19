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
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from "react-router-dom";

const BlogsPage = () => {

  function createData(name, trackingId, date, status, Email) {
    return { name, trackingId, date, status, Email };
  }

  const navigate=useNavigate()

  const handleBlog=()=>{
    navigate('/create-blog')
  }

  const handleDelete=(e)=>{
    
    const sendReq=async()=>{
      const req=await fetch(`https://helpinghands-backend.onrender.com/posts/${e.target.id}`,{
        method: 'DELETE'
      });

      const data=await req.json();
      const newarr=[]
      for(let i=0;i<rows.length;i++)
      {
        if(rows[i]._id!==e.target.id)
        newarr.push(rows[i])
      }
      setRows(newarr)
     }

     sendReq();
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


  const host = "https://helpinghands-backend.onrender.com"
  const [rows, setRows] = useState(null)
  const fillRows = (blog) => {
    setRows(blog)
  }
  useEffect(() => {
    const getBlogProfile = async () => {
      const response = await fetch(`${host}/api/auth/getpost`, {
        method: 'GET'
      });

      const json = await response.json();
      // fillRows(json)
      json.sort(function(a, b) {
        return a.date - b.date;
      });
      setRows(json)
      console.log(json)
      // setUser(json)    
    }
    getBlogProfile();

    // console.log("side",user);

  }, [])
  var random=1
  return (

    <div className="Table">
      <h3>Recent Articles</h3>
      <div >
    <button type="button" className="eventbutton" onClick={()=>handleBlog()} style={{color:"black"}}><FontAwesomeIcon icon={faCirclePlus}  />  Article</button>
    </div>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Manage</TableCell>
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
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell align="left"> <div style={{ maxWidth: "160px", overflowWrap: "break-word" }}>
          {row.image.length > 20 ? `${row.image.slice(0, 20)}...` : row.image}
        </div></TableCell>
                <TableCell align="left"><button type="button" onClick={handleDelete} id={row._id} class="btn btn-danger">
                  <FontAwesomeIcon icon={faTrash}  /></button></TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default BlogsPage;
