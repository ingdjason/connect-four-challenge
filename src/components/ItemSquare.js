import React from "react";
import { TableCell, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const ItemSquare = ({item, rowItem, rowPosition, cellPosition, handleClick})=>{

  const TableCellCustomize = styled(TableCell)`
    background-color: #fff;
    text-align: center;
    width: 50px;
    height: 50px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    border-radius: 50px;
    border: 2px solid ;
  `;

  const BoxCustomize = styled(Box)`
    background-color: red;
    text-align: center;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 2px solid ;
  `;

  return(<TableCellCustomize
    disabled={true} 
    onClick={(e)=>{
      handleClick(cellPosition, rowPosition);
    }}>
    <BoxCustomize 
      style={item === 1? {backgroundColor: 'red'}: item === 2 ? {backgroundColor: 'blue'} : {backgroundColor: '#fff'}} />
  </TableCellCustomize>)
}

export default ItemSquare;