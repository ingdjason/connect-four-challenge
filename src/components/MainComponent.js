import React from "react";
import { 
  Stack, Alert, Box, Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Header from "./Header";
import SquareList from "./SquareList";
import AlertSnackbar from "./AlertSnackbar";

const PaperCustomize = styled(Paper)`
    background-color: #fff;
    text-align: center;
    border-radius: 0;
  `;

class MainComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      boardGame: this.initiateBoard(7, 6),
      score_player_one: 0,
      score_player_two: 0,
      current_player: 1,
      type_game: 4,
      open: false,
      message: 'Invalid Move! or Reset current board',
      severity: 'warning'
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.initiateBoard = this.initiateBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handlePlayerTurn = this.handlePlayerTurn.bind(this);
    this.handleWinnerPrize = this.handleWinnerPrize.bind(this);

    this.handleVerticalWin = this.handleVerticalWin.bind(this);
    this.handleHorizontalWin = this.handleHorizontalWin.bind(this);
    this.handleRowCheck = this.handleRowCheck.bind(this);
    this.handleAddCoin = this.handleAddCoin.bind(this);
    this.handleDiagonalWin = this.handleDiagonalWin.bind(this);
    this.handleOpenClose = this.handleOpenClose.bind(this);
  }

  handleResetGame(e){//reset the board to initial 
    e.preventDefault();
    this.setState(state=>({
      type_game: this.state.type_game ,
      boardGame: this.initiateBoard(7, 6),
      current_player: 1,
    }))
  }

  handleOpenClose({open, message, severity}){//alert snack open after bad move or player win

    this.setState(state=>({
      open: open,
      message: message,
      severity: severity,
    }))
  }

  handleChange(e){//update the current Connect N board to value
    e.preventDefault();
    
    this.setState(state=>({
      type_game: e.target.value,
      boardGame: this.initiateBoard(7, 6),
      current_player: 1,
    }))
  }

  handlePlayerTurn(currentPlayer){//Toggle player turn 
    this.setState(state=>({
      current_player: currentPlayer === 1 ? 2: 1
    }))
  }

  handleCellClick(cellPosition, rowPosition){//handle cell click on player click
    console.time('player-turn')
    let tempBoardGame = this.state.boardGame;
    let typeGame = this.state.type_game;
    let currentPlayer = this.state.current_player
   
    //Step1 : add coin to board and check if successful 
    let addCoin = this.handleAddCoin(currentPlayer, cellPosition, rowPosition);
    if(addCoin){
      //Step 2: toggle player turn
      this.handlePlayerTurn(currentPlayer);
      //Step 3: check board
        //Horizontal(Rows)-Vertical(Columns)-Diagonal(Left)(Right)
          //if one of them true the current player win
      let horizontal = this.handleHorizontalWin(tempBoardGame, currentPlayer, typeGame);
      let vertical = this.handleVerticalWin(tempBoardGame, currentPlayer, typeGame);
      let diagonal = this.handleDiagonalWin(tempBoardGame, currentPlayer, typeGame);

      if(horizontal || vertical || diagonal){
        //Step 4: player win
        this.handleWinnerPrize(currentPlayer, this.initiateBoard(7, 6), 1);
        this.handleOpenClose({open: true, message: `Player ${currentPlayer} wins!`, severity: 'success'});
      }
    }else{
      this.handleOpenClose({open: true, message: `Invalid Move! Player ${currentPlayer}'s turn: ${currentPlayer}`, severity: 'warning'});
    }
    console.timeEnd('player-turn')
  }

  handleWinnerPrize(currentPlayer, board, player){//Update current player score 
    this.setState(state=>({
      boardGame: board,
      score_player_one: currentPlayer === 1? 
        this.state.score_player_one + 1 : this.state.score_player_one, 
      score_player_two: currentPlayer === 2 ? 
        this.state.score_player_two + 1 : this.state.score_player_two,
      connect: [],
      current_player: player
    }));
  }

  handleDiagonalWin(arr, player, typeGame){//check if current player win diagonal 
    /* This method is only set for array 7X6 */
    let diagonalPossibility = [
      [ [4,0], [5,1] ],
      [ [3,0], [4,1], [5,2] ],
      [ [2,0], [3,1], [4,2], [5,3] ],
      [ [1,0], [2,1], [3,2], [4,3], [5,4] ],
      [ [0,0], [1,1], [2,2], [3,3], [4,4], [5,5] ],
      [ [0,1], [1,2], [2,3], [3,4], [4,5], [5,6] ],
      [ [0,2], [1,2], [2,4], [3,5], [4,6] ],
      [ [0,3], [1,4], [2,5], [3,6] ],
      [ [0,4], [1,5], [2,6] ],
      [ [0,5], [1,6] ],
      [ [5,5], [4,6] ],
      [ [5,4], [4,5], [3,6] ],
      [ [5,3], [4,4], [3,5], [2,6] ],
      [ [5,2], [4,3], [3,4], [2,5], [1,6] ],
      [ [5,0], [4,1], [3,2], [2,3], [1,4], [0,5] ],
      [ [4,0], [3,1], [2,2], [1,3], [0,4] ],
      [ [3,0], [2,1], [1,2], [0,3] ],
      [ [2,0], [1,1], [0,2] ],
      [ [1,0], [0,1] ]
    ];

    //We can define this Operation as Quadratic: O(n2)
    let newBoard = diagonalPossibility.map((item)=>{
      let arrTemp = [];
      for(let i=0; i< item.length; i++){
        arrTemp.push(arr[item[i][0]][item[i][1]]);
      }
      return arrTemp;
    })
    
    //We can define this Operation as Linear: O(n2)
    return newBoard.some((item, position)=>{
      return this.handleRowCheck(item, player, typeGame);
    })
  }

  handleVerticalWin(arr, player, typeGame){//Handle board for coins in vertical current player 
    /*
      - Temp array 
      - Loop hover the current board and get current coin position value
      - Check if one of the new generated board win
        - handle check for Each row 
    */
    let newBoard = [];
    for(var i=0; i<7; i++){
      newBoard.push([]);
      for(var j=0; j<6; j++){
        newBoard[i].push(arr[j][i]);
      }
    }

    return newBoard.some((item, position)=>{
      return this.handleRowCheck(item, player, typeGame);
    })
  }

  handleHorizontalWin(arr, player, typeGame){//Handle board for coins in horizontal current player 
    return arr.some((item, position)=>{
      return this.handleRowCheck(item, player, typeGame);
    })
  }

  handleRowCheck(arr, player, typeGame){//Review each row for current arr board
    let addForPlayer = [];
    arr.forEach((item)=>{
      if(item === player){
        addForPlayer.push(item);
      }else{
        if(addForPlayer.length < typeGame){
          addForPlayer = [];
        }
      }
    })

    if(addForPlayer.length === typeGame){
      return true;
    }

    return false;
  }

  handleAddCoin(currentPlayer, cellPosition, rowPosition){//add coin on user click
    let tempBoardGame = this.state.boardGame;
    let tempSet = false;

    for(var i= tempBoardGame.length-1; i >=0; i-- ){
      if(!tempSet){
        if(tempBoardGame[i][cellPosition] === 0){
          tempBoardGame[i][cellPosition] = currentPlayer;
          this.setState(state=>({
            boardGame: tempBoardGame
          }))
          tempSet = true;
        }
      }
    }

    return tempSet;
  }

  initiateBoard (cellWidth, cellHeight){
    let arrBoard = [];
    for(var i=0; i< cellHeight; i++){
      let temp = 0;
      let tempArr = [];
      while(temp<cellWidth){
        tempArr.push(0);
        temp++;
      }
      arrBoard.push(tempArr);
    }
    return arrBoard;
  }

  componentDidMount(){
    this.setState(state=>({
      boardGame: this.initiateBoard(7, 6),
      score_player_one: 0, 
      score_player_two: 0,
      current_player: 1,
      type_game: 4
    }));
  }

  render(){
    return (<Box sx={{bgcolor: "#F4F4F4", height: '100vh'}} style={{padding: '10px'}}>
      <Stack spacing={1} >
        <PaperCustomize>
          <Header 
            typeGame={this.state.type_game}
            currentPlayer={this.state.current_player}
            handleChange={this.handleChange}
            handleResetGame={this.handleResetGame}
            score_player_one={this.state.score_player_one} 
            score_player_two={this.state.score_player_two} />
        </PaperCustomize>
        <PaperCustomize>
          <AlertSnackbar 
            open={this.state.open} 
            handleClose={this.handleOpenClose} 
            message={this.state.message} 
            severity={this.state.severity} />
          <SquareList 
            handleClick={this.handleCellClick} 
            boardGame={this.state.boardGame} 
            
            connect={this.state.connect} />
        </PaperCustomize>
      </Stack>
    </Box>)
  }
}

export default MainComponent;