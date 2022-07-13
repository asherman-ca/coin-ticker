# Tickr

Live coin tickers and PNL tracker (https://coin-ticker.vercel.app/)

## Setup

1. npm install
2. npm start

## Design Influence

1. Opensea
2. Livecoinwatch

## Schema

Users

{
balance: Int
email: String
lastFaucet: Time
name: String
testBalance: Int
timestamp: Time
}

Orders

{
userRef: String
coin: String
coinId: String
image: String
spent: Int
price: Int
timestamp: Time
type: String
userRef: String
}

Likes

{
coinId: String
userRef: String
timestamp: Time
}

## Maths

PNL:

average purchase price = (total spent / total tokens gained)
average sell price = (total $ collected / total tokens sold)

unrealizec PNL = total units held \* (current price / average purchase price)

realized PNL = total unit sold \* (average sell price / average purchase price)

## Resources:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
