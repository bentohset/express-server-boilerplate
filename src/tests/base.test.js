const request = require("supertest");
const app = require('../app')

describe("Test the root path", () => {
    it("should get 200 OK", async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
    });
});