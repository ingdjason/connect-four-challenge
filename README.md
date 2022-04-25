# Getting Started with Create React App - Connect N

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, first run:

### `npm install`

## Available Scripts

now, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
# `Prompt`

Your task is to design a variant of the classic Connect 4 game. However, instead of 4 we are building Connect N. In our case “N” is the number of pieces that need to line up in order for a player to win. Once “N” has been defined two players will take turns placing pieces until one player wins or there is a draw. Game board is 7 cells in width and 6 cells in height.

# `Big O notation`

The code are optimized to run in less time, On testing the maximum runtime is: 0.31201171875
The algorithms i used to calculate the winner after each turn execute has  Quadratic Time

Calculate Vertical win : O(n2) * O(n2)
Calculate Horizontal win : O(n2)
Calculate Diagonal win : O(n2) * O(n2)

