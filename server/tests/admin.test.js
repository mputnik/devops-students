const request = require('supertest');
const server = require('../server.js')('test_data', 'localhost');
const jwt = require('jsonwebtoken');

let token;

const testInput = {
    firstName: "Test",
    lastName: "Entry",
    favoriteColor: "Green",
    favoritePet: "Fish",
    message: "edit or delete me"
}

const testEdit = {
    firstName: "Form",
    lastName: "Data",
    favoriteColor: "Green",
    favoritePet: "Cat",
    message: "This has been edited"
}

beforeAll(async () => {
    await server.initAdmin();
    payload = { username: "admin" };
    token = 'Bearer ' + jwt.sign(payload, 'secret', {expiresIn: "1h"});
});

afterAll(async () => {
    await server.drop();
    server.close();
});

describe("Test POST /admin/login api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("attempt sign in with invalid username", (done) => {
        request(server.app)
            .post('/api/admin/login')
            .send({
                username: "notAdmin",
                password: "notAdmin"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    test("attempt sign in with incorrect credentials", (done) => {
        request(server.app)
            .post('/api/admin/login')
            .send({
                username: "admin",
                password: "notAdmin"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done);
    });

    test("attempt sign in with correct credentials", async () => {
        const res = await request(server.app)
            .post('/api/admin/login')
            .send({
                username: "admin",
                password: "admin"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        const payload = jwt.verify(res.body.token, 'secret');
        expect(payload.username).toMatch("admin");
    });
});

describe("Test POST /admin/is-auth api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("is-auth success", (done) => {
        request(server.app)
            .post('/api/admin/is-auth')
            .send()
            .set({Accept: 'application/json', Authorization: token})
            .expect('Content-Type', /json/)
            .expect(200, {}, done);
    });

    test("is-auth fail", (done) => {
        request(server.app)
            .post('/api/admin/is-auth')
            .send()
            .set({Accept: 'application/json', Authorization: null})
            .expect('Content-Type', /json/)
            .expect(401, { message: 'token missing or invalid'}, done);
    });
});

describe("Test PUT /admin/edit/:id api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("edit entry with authorization", async () => {
        testId = await server.add(testInput);

        expect(await server.getAll()).toEqual([testInput]);

        await request(server.app)
            .put(`/api/admin/edit/${testId}`)
            .send(testEdit)
            .set({Accept: 'application/json', Authorization: token})
            .expect('Content-Type', /json/)
            .expect(201, { message: `id ${testId} data successfuly updated` });

        expect(await server.getAll()).toEqual([testEdit]);
    });

    test("edit entry with invalid id", async () => {
        testId = await server.add(testInput);

        expect(await server.getAll()).toEqual([testInput]);

        await request(server.app)
            .put(`/api/admin/edit/${69420}`)
            .send(testEdit)
            .set({Accept: 'application/json', Authorization: token})
            .expect('Content-Type', /json/)
            .expect(404);

        expect(await server.getAll()).toEqual([testInput]);
    });

    test("edit entry without authorization", async () => {
        testId = await server.add(testInput);

        expect(await server.getAll()).toEqual([testInput]);

        await request(server.app)
            .put(`/api/admin/edit/${testId}`)
            .send(testEdit)
            .set({Accept: 'application/json', Authorization: null})
            .expect('Content-Type', /json/)
            .expect(401, { message: 'token missing or invalid' });

        expect(await server.getAll()).toEqual([testInput]);
    });
});

describe("Test DELETE /admin/delete/:id api", () => {
    beforeEach(async () => {
        await server.drop();
    });

    test("delete entry with authorization", async () => {
        testId = await server.add(testInput);

        expect(await server.getAll()).toEqual([testInput]);

        await request(server.app)
            .delete(`/api/admin/delete/${testId}`)
            .set({Accept: 'application/json', Authorization: token})
            .expect('Content-Type', /json/)
            .expect(200, { message: `id ${testId} data successfuly deleted from to mongodb database` });

        expect(await server.getAll()).toEqual([]);
    });

    test("delete entry with invalid id", async () => {
        testId = await server.add(testInput);

        expect(await server.getAll()).toEqual([testInput]);

        await request(server.app)
            .delete(`/api/admin/delete/${69420}`)
            .set({Accept: 'application/json', Authorization: token})
            .expect('Content-Type', /json/)
            .expect(404);

        expect(await server.getAll()).toEqual([testInput]);
    });

    test("delete entry without authorization", async () => {
        testId = await server.add(testInput);

        expect(await server.getAll()).toEqual([testInput]);

        await request(server.app)
            .delete(`/api/admin/delete/${testId}`)
            .set({Accept: 'application/json', Authorization: null})
            .expect('Content-Type', /json/)
            .expect(401, { message: 'token missing or invalid' });

        expect(await server.getAll()).toEqual([testInput]);
    });
});