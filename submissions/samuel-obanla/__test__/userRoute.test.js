const request = require('supertest');
const app = require('../index')
const mongoose = require('mongoose')


let userId

describe('User Route', () => {
    beforeAll(async () => {
        connection = await mongoose.createConnection(process.env.TEST_STRING);
    });

    afterAll(async () => {
        await mongoose.connection.collection("users").deleteMany({});
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
})