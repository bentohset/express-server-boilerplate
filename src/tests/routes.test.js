const request = require("supertest");
const app = require('../app');
const { db } = require("../models");

let thisDB = db
let userData

beforeAll(async () => {
    await thisDB.sequelize.sync({ force: true });
});

describe("User API", () => {
    it("should register a user and return user and token", async () => {
        const res = await request(app).post('/v1/auth/register').send({
            username: 'test',
            password: 'testpw'
        })
        userData = res.body.user
        expect(res.statusCode).toEqual(201)
    });

    it("should fail registering an existing username", async () => {
        const res = await request(app).post('/v1/auth/register').send({
            username: 'test',
            password: 'testpw'
        })
        expect(res.statusCode).toEqual(500)
    });

    it("should login an existing user and return user and token", async () => {
        const res = await request(app).post('/v1/auth/login').send({
            username: 'test',
            password: 'testpw'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.user.username).toEqual('test')
    });

    it("should fail login user with wrong password", async () => {
        const res = await request(app).post('/v1/auth/login').send({
            username: 'test',
            password: 'wrongpw'
        })
        expect(res.statusCode).toEqual(500)
    });
});

describe("Entry API", () => {
    const testEntry = {
        content: "testcontent",
        userId: 1
    }

    it("should create and show an entry", async () => {
        const res = await request(app).post('/v1/entry/').send(testEntry)

        expect(res.statusCode).toEqual(201)
        expect(res.body.content).toEqual(testEntry.content)
    });

    it("should show all entries", async () => {
        const res = await request(app).get('/v1/entry/')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1)
    });

    it("should get 1 entry", async () => {
        const res = await request(app).get('/v1/entry/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.content).toEqual(testEntry.content)
    });

    it("should update an entry", async () => {
        const res = await request(app).patch('/v1/entry/1').send({
            content: "testcontent2"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toEqual(1)
        expect(res.body[1][0].content).toEqual("testcontent2")
    });
});

afterAll(async () => {
    await thisDB.sequelize.close()
})