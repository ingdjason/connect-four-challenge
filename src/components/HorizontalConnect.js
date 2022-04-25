import React from "react";
import { TableRow } from "@mui/material";
import ItemSquare from "./ItemSquare";
import { styled } from '@mui/material/styles';

const HorizontalConnect = ({position, rowItem, handleClick})=>{
  const TableRowCustomize = styled(TableRow)`
  background-color: red;
  text-align: center;
  border-radius: 0;
  `;

  return(<TableRowCustomize>
    {
      rowItem.map((item, pos)=>{

        return <ItemSquare 
          item={item}
          key={`rm-${pos}`}
          rowItem={rowItem}
          rowPosition={position} 
          cellPosition={pos} 
          handleClick={handleClick}>
            &emsp;
        </ItemSquare>
      })
    }
    
  </TableRowCustomize>)
    
}

export default HorizontalConnect;