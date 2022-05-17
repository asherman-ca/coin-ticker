# Tickr

Live coin tickers and PNL tracker

## Setup

1. npm install
2. npm start

## Design Influence

1. Opensea
2. Livecoinwatch

## Schema

Order

{
userRef: String
coin: String
price: Int
quantity: Int
}

Holding

{
userRef: String
coin: String
totalHeld: Int
totalSpent: Int
averageBuy: Int
averageSell: Int
}

## Maths

PNL:

average purchase price = (total spent / total tokens gained)
average sell price = (total $ collected / total tokens sold)

unrealizec PNL = total units held \* (current price / average purchase price)

realized PNL = total unit sold \* (average sell price / average purchase price)

## Resources:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
