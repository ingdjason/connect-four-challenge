import React from "react";
import { 
  Button, 
  Paper, Table, TableHead, TableRow, 
  TableCell, Select, MenuItem, 
  FormControl, InputLabel, Chip, Alert 
} from "@mui/material";
import { styled } from '@mui/material/styles';

const Header = ({
    score_player_one, score_player_two, typeGame, 
    handleChange, currentPlayer, handleResetGame
  })=>{
  const TableCellCustomize = styled(TableCell)`
    background-color: #fff;
    text-align: center;
    border-radius: 0;
  `;
  
  return(<Table>
    <TableHead>
      <TableRow key={"th-1"}>
        <TableCellCustomize>
          Name :
        </TableCellCustomize>
        <TableCellCustomize>
          PLAYER 1
          <Chip label={currentPlayer === 1 ? '(🖐🏾)' : "[-]"} style={{backgroundColor: 'red'}} />
        </TableCellCustomize>
        <TableCellCustomize>
          PLAYER 2
          <Chip label={currentPlayer === 2 ? '(🖐🏾)': "[-]"} style={{backgroundColor: 'blue'}} />
        </TableCellCustomize>
        <TableCellCustomize>
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleResetGame}>
            Reset Connect: &emsp;{typeGame}
          </Button>
        </TableCellCustomize>
      </TableRow>
      <TableRow key={"th-2"}>
        <TableCellCustomize>
          Score :
        </TableCellCustomize>
        <TableCellCustomize 
          style={score_player_one > score_player_two? {color: 'green'} : 
          score_player_one === score_player_two ? {color: '#000'}: {color: 'red'}}>
          {score_player_one}
        </TableCellCustomize>
        <TableCellCustomize 
          style={score_player_two > score_player_one? {color: 'green'} : 
          score_player_one === score_player_two ? {color: '#000'}: {color: 'red'}}>
          {score_player_two}
        </TableCellCustomize>
        <TableCellCustomize colSpan={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Change Connect game:</InputLabel>
            <Select label="Change Connect game:" 
              value={typeGame}
              onChange={handleChange}>
              {
                [2,3,4,5,6,7].map((item)=>{
                  return <MenuItem value={item} key={`SL-${item}`}>{item}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </TableCellCustomize>
      </TableRow>
    </TableHead>
  </Table>)
}

export default Header;