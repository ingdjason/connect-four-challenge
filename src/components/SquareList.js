import React from "react";
import { Table, TableBody } from "@mui/material";
import HorizontalConnect from "./HorizontalConnect";
const SquareList = ({boardGame, handleClick, connect})=>{
  
  return(<Table>
    <TableBody>
      {
        boardGame.map((item, position)=>{
          return <HorizontalConnect 
            key={`st-${position}`}
            handleClick={handleClick} 
            position={position} 
            rowItem={item}/>
        })
      }
    </TableBody>
  </Table>)
}

export default SquareList;