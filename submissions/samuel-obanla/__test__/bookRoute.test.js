const request = require('supertest')
const app = require('../index')
const mongoose = require('mongoose')


describe('Book Route', () => {
    beforeAll(async () => {
        connection = await mongoose.createConnection(process.env.TEST_STRING);
    })
    
    afterAll(async () => {
        await mongoose.connection.collection("users").deleteMany({});
    });

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
                .send(data)
            expect(res.statusCode).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body.data.title).toBe(data.title)
        })
    })
})