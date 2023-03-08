# book-record-management

server >> storing certain book information
     >> User register
     >> Subscriber


Fine System ; 
User : 06/03/2023-06/06/2023
07/06/2023 => 50/- (1 day delay) / 50*3 (3 days delay)
3 Months (Basic)
6 Months (Standard)
12 Months (Premium)

if the subscription type is standard && if the subscription date is 06/03/2023
=> then valid till 06/09/2023

within subscription date is if miss the renewel >> 50/- per day
subscription date is also missed and also miss the renewel >> 100 + 50/- day

missed by renewal >> 50/-
missed by subscription >> 100/-
missed by renewal and  subscription >> 150/-

 ## routes and Endpoint 
 ## /users
 POST : Create a new user here
 GET : get all the user info 

 ## /users/{id}
GET : get all the user info by id
PUT : Update user by there ID
DELETE : delete user by ID (chk he/she still have an issued book) && (is there any fine to be paid)

## /users/subscription-details/{id}
GET : get users subsciption details
     >> Date of subscription
     >> valid till
     >> Is there any fine

## /books
GET : get all the books
POST : create/add new book

## /books/{id}
GET  : get  the book by id
PUT : update book by id

## /books/issued
GET : Get all issued books

## /books/issued/withFine
GET : get all issued books with their fines



## npm init
## npm i nodemon --save-dev
## npm i express
## npm run dev
