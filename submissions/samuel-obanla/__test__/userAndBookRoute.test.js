const request = require('supertest');
const app = require('../index')
const mongoose = require('mongoose')


let userId
let bookId
let token

describe('User Route', () => {
    beforeAll(async () => {
        connection = await mongoose.createConnection(process.env.TEST_STRING);
    });

    afterAll(async () => {
        await Promise.all([
            mongoose.connection.collection("users").deleteMany({}),
            mongoose.connection.collection("books").deleteMany({})
        ]);
    });
    

    describe('POST /api/v1/user/register', () => {
        it('Should be able to register user', async () => {
            const data = {
                firstName: "First",
                lastName: "Last",
                email: "example@gmail.com",
                phoneNumber: "09012345678",
                password: "Password.1234"
            }
            const res = await request(app)
                .post('/api/v1/user/register')
                .send(data)
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data.firstName).toBe(data.firstName)
            userId = res.body.data._id
        })
    })

    describe('POST /api/v1/user/login', () => {
        it('Should be able to login user', async () => {
            const data = {
                email: "example@gmail.com",
                password: "Password.1234"
            }
            const res = await request(app)
                .post('/api/v1/user/login')
                .send(data)
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)

            token = res.body.data.token
        })
    })

    describe('GET /api/v1/user/:id', () => {
        it('Should get the registered user', async () => {
            const res = await request(app)
                .get(`/api/v1/user/${userId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    })

    describe('POST /api/v1/books/create', () => {
        it('Should be able to create book', async () => {
            const data = {
                title: "Test book",
                description: "Test book description",
                readMore: "https://test-book-readMore.com",
                image: "https://test-book-image.com"
            }
            const res = await request(app)
                .post('/api/v1/books/create')
                .set("Authorization", `Bearer ${token}`)
                .send(data)
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data.title).toBe(data.title)

            bookId = res.body.data._id
        })
    })

    describe('PUT /api/v1/books/update/:id', () => {
        it('Should be able to update book', async () => {
            const data = {
                title: 'Update test book',
                description: "Update test book description",
                readMore: "https://test-book-readMore.com",
                image: "https://test-book-image.com"
            };
            const res = await request(app)
                .put(`/api/v1/books/update/${bookId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(data);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.title).toBe(data.title);
            expect(res.body.data.description).toBe(data.description);

            
        })
    })

    describe('GET /api/v1/books/:id', () => {
        it('Should be able to get book it ID', async () => {
            const res = await request(app)
                .get(`/api/v1/books/${bookId}`)
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        })
    })

    describe('GET /api/v1/books/', () => {
        it('Should be able to get book all book and be in pagination', async () => {
            const res = await request(app)
                .get('/api/v1/books/?page=1')
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.page).toBe(1)
        })
    })

    describe('PUT /api/v1/books/like/:id', () => {
        it('Should be able to like book', async () => {
            const res = await request(app)
                .put(`/api/v1/books/like/${bookId}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('likesCount')
            expect(res.body.data).toHaveProperty('likes')
        })
    })

    describe('PUT /api/v1/comment/:id', () => {
        it('Should be able to comment on a book', async () => {
            const data = {
                comment: "testing comment, nice test book"
            };
            const res = await request(app)
                .put(`/api/v1/books/comment/${bookId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(data);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.comments[0].comment).toBe(data.comment)
        })
    })

    describe('PUT /api/v1/view/:id', () => {
        it('Should be able to increase a book views', async () => {
            const res = await request(app)
                .put(`/api/v1/books/view/${bookId}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('view');
        })
    })

    describe('DELETE /api/v1/delete/:id', () => {
        it('Should be able to delete a book', async () => {
            const res = await request(app)
                .delete(`/api/v1/books/delete/${bookId}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        })
    })

})