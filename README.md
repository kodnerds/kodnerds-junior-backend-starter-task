# Kodnerds Junior Dev Challenge – Task 1 (Backend)

This is my solution for **Kodnerds Junior Dev Challenge – Backend Track**.
---

## Tools
- **Node.js** with **Express.js** for Restful APIs

## Architecture
- Clean architecture to allow separation of logic,improved scalability and maintainability.
---

## Features
- CRUD endpoints for the dataset
- Data validation for endpoint
- Error handling
---

### Prerequistes
- Node.js v18+
- npm or yarn
--

```bash
git clone https://github.com/yourorg/codequest_backend.git
cd submissions
npm install
npm run start

proceed to use any endpoint
Server runs at `http://localhost:2000` by default.
```
---

## Endpoints

### CRUD Endpoint
- **GET** `/kodnerds/all` - Get all Data present
```bash
{
    "code": 200,
    "success": true,
    "message": "Data retrieved successfully",
    "total": 6,
    "page": 1,
    "limit": 6,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false,
    "data": [
        {
            "id": 1,
            "author": "Faaruq Azeez",
            "date": "23 May, 2024",
            "title": "Energy Efficiency ideas to improve business sustainability",
            "description": "Energy Efficiency with Business Sustainability for substantial savings.",
            "image": "https://via.placeholder.com/300x200",
            "views": 20,
            "likes": 20,
            "comments": 20,
            "readMore": "#"
        },
    ]
}     
```
```bash
you could also set how many pages and data should be returned
```
- **GET** `/kodnerds/all?page=1&limit=10` - Get your set amount of data (Pagination)
```bash
{
    "id": 1,
    "author": "Faaruq Azeez",
    "date": "23 May, 2024",
    "title": "Energy Efficiency ideas to improve business sustainability",
    "description": "Energy Efficiency with Business Sustainability for substantial savings.",
    "image": "https://via.placeholder.com/300x200",
    "views": 20,
    "likes": 20,
    "comments": 20,
    "readMore": "#"
}
```
- **POST** `/kodnerds/create` - Create a new dataset
```bash
{
    "code": 201,
    "success": true,
    "message": "New data added successfully",
    "data": {
        "id": 7,
        "author": "George Orwell",
        "date": "17 August,1945",
        "title": "Fire and Blood, Game of thrones",
        "description": "Energy Efficiency with Business Sustainability for substantial savings.",
        "image": "https://en.wikipedia.org/wiki/File:Animal_Farm_-_1st_edition.jpg",
        "views": 20,
        "likes": 20,
        "readMore": "#"
    }
}
```
- **PUT** `/kodnerds/:id/edit` - Update an existing dataset passing the id as a parameter
```bash
{
    "code": 200,
    "success": true,
    "message": "Data updated successfully",
    "Updated": {
        "id": 7,
        "author": "George Orwell",
        "date": "17 August,1945",
        "title": "Fire and Blood, Game of thrones",
        "description": "Energy Efficiency with Business Sustainability for substantial savings.",
        "image": "https://en.wikipedia.org/wiki/File:Animal_Farm_-_1st_edition.jpg",
        "views": 100,
        "likes": 20,
        "readMore": "#"
    }
}
```
- **DELETE** `/kodnerds/:id/delete` - Delete an existing dataset
```bash
{
    "code": 200,
    "success": true,
    "message": "Data deleted successfully",
    "Deleted": {
        "id": 10,
        "author": "Frank Herbert",
        "date": "17 August,1945",
        "title": "Dune the Messaiah",
        "description": "Energy Efficiency with Business Sustainability for substantial savings.",
        "image": "https://i.ebayimg.com/images/g/BWYAAOSwF8VlGYbn/s-l960.webp",
        "views": 30,
        "likes": 50,
        "readMore": "#"
    }
}
```

## ⚡ Challenges Faced
- Had an Error where i could not read data from my file path,had to use external suggestion(ChatGPT) on how to restructure my folder
--- 

