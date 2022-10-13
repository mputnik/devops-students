const request = require('supertest');
const server = require('../server.js')('test_data');

describe("Test API and database", () => {
    it("processes GET empty", (done) => {
        request(server.app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, [{}], done);
    });

    it("processes GET non-empty", (done) => {
        request(server.app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, [
                {
                    // Stuff
                },
                {
                    // Stuff
                }
            ], done);
    });

    it("processes POST with correct schema", (done) => {
        request(server.app)
            .post('/api/save')
            .send({
                firstName: "John",
                lastName: "Smith",
                favoritePet: "dog",
                favoriteColor: "Blue",
                message: "Hello, world!"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, { msg: 'We received your data!' }, done);
    });

    it("processes POST with incorrect schema", (done) => {
        request(server.app)
            .post('/api/save')
            .send({
                name: "Jane Doe",
                level: 20,
                rank: "B+"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400, { msg: 'Failed to save your data' }, done);
    });

    afterEach(() => {
        server.drop();
    });

    afterAll(() => {
        server.close();
    });
});