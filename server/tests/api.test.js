const request = require('supertest');
const server = require('../server.js')('test_data', 'localhost');

beforeAll(async () => {
    await server.initAdmin();
});

afterAll(async () => {
    await server.drop();
    server.close();
});

describe("Test GET / api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("processes GET empty", (done) => {
        request(server.app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [], done);
    });

    test("processes GET non-empty", async () => {
        const testData = {
            firstName: "Jane",
            lastName: "Dane",
            favoritePet: "dog",
            favoriteColor: "Blue",
            message: "Cookies are delicious"
        };

        // Add data to retrieve via GET.
        testData._id = await server.add(testData);
        testData.__v = 0;

        await request(server.app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [testData]);
    });

});

describe("Test POST /save api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("passes POST with correct schema", async () => {
        const testInput = {
            firstName: "John",
            lastName: "Smith",
            favoritePet: "dog",
            favoriteColor: "Blue",
            message: "Hello, world!"
        };
        
        await request(server.app)
            .post('/api/save')
            .send(testInput)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, { msg: 'We received your data!' });
        
        expect(await server.getAll()).toEqual([testInput]);
    });

    test("pass POST with incorrect schema", async () => {
        await request(server.app)
            .post('/api/save')
            .send({
                name: "Jane Doe",
                level: 20,
                rank: "B+",
                isGood: false
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, { msg: 'Failed to save your data.' });

        expect(await server.getAll()).toEqual([]);
    });
});

describe("Test GET /search/:id api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("search mongodb data using id value", async () => {
        const testInput = {
            firstName: "Test",
            lastName: "123",
            favoritePet: "dog",
            favoriteColor: "Blue",
            message: "Hello there!!!"
        };

        testInput._id = await server.add(testInput);
        testInput.__v = 0;
        
        await request(server.app)
            .get(`/api/search/${testInput._id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, testInput);
    });

    test("search mongodb data using invalid id", (done) => {
        request(server.app)
            .get('/api/search/69420')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, { message: "Invalid id, could not retrieve data from mongodb database." }, done);
    });
});
