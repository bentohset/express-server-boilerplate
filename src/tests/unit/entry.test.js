const { entryService } = require("../../services");
const { db } = require("../../models");

let thisDB = db
let userData

beforeAll(async () => {
    await thisDB.sequelize.sync({ force: true });
});

describe("Entry service", () => {
    const testEntry = {
        content: "testcontent",
        userId: 1
    }
    it("should create an entry", async () => {
        const res = await entryService.createEntry(testEntry.content, testEntry.userId)
        expect(res.content).toEqual(testEntry.content)
    });
    
});

afterAll(async () => {
    await thisDB.sequelize.close()
})