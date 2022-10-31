const request = require('supertest');
const server = require('../server.js')('test_data', 'localhost');

describe("Test API and database", () => {
    test("processes GET empty", (done) => {
        request(server.app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, [], done);
    });

    test("processes GET non-empty", (done) => {
        const testData = [
            {
                firstName: "Jane",
                lastName: "Dane",
                favoritePet: "dog",
                favoriteColor: "Blue",
                message: "Cookies are delicious"
            }
        ];

        // Add data to retrieve via GET.
        server.add(testData[0]);

        request(server.app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, testData, done);
    });

    test("passes POST with correct schema", (done) => {
        const testInput = {
            firstName: "John",
            lastName: "Smith",
            favoritePet: "dog",
            favoriteColor: "Blue",
            message: "Hello, world!"
        };
        
        request(server.app)
            .post('/api/save')
            .send(testInput)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201, { msg: 'We received your data!' }, done);
    });

    test("pass POST with incorrect schema", (done) => {
        request(server.app)
            .post('/api/save')
            .send({
                name: "Jane Doe",
                level: 20,
                rank: "B+",
                isGood: false
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400, { msg: 'Failed to save your data.' }, done);
    });

    test("attempt sign in with incorrect credentials", (done) => {
        request(server.app)
            .post('/api/admin/login')
            .send({
                username: "notAdmin",
                password: "notAdmin"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404, done);
    });

    test("attempt sign in with correct credentials", (done) => {
        request(server.app)
            .post('/api/admin/login')
            .send({
                username: "admin",
                password: "admin"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });

    beforeAll(async () => {
        await server.initAdmin();
    });


    beforeEach(async () => {
        await server.drop();
    });

    afterAll(async () => {
        await server.drop();
        server.close();
    });
});
