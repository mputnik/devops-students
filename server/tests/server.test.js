const request = require('supertest');
// const assert = require('assert');
const server = require('../server.js')('test_data');

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
            },
            {
                firstName: "Unknown",
                lastName: "Ghost",
                favoritePet: "fish",
                favoriteColor: "Yellow",
                message: "Yum yum" 
            }
        ];

        // Add data to retrieve via GET.
        server.add(testData[0]);
        server.add(testData[1]);

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
            .expect(200, { msg: 'We received your data!' }, done);
            // Does not check if data is added to db properly yet.

            // .end((err) => {
            //     if (err) return done(err);
            //     const data = server.get();
            //     assert(data.length === 1);
            //     assert(objEquals(data[0], testInput));
            //     done();
            // });
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
            // Does not check if data is not added to db properly yet.

            // .end((err) => {
            //     if (err) return done(err);
            //     const data = server.get();
            //     assert(data.length === 0);
            //     done();
            // });
    });

    beforeEach(async () => {
        await server.drop();
    });

    afterAll(async () => {
        await server.drop();
        server.close();
    });
});

// Function planned for after-POST testing, but put on hold for now.
// function objEquals (obj1, obj2) {
//     const ok1 = Object.keys(obj1);
//     const ok2 = Object.keys(obj2);
//     const ov1 = Object.values(obj1);
//     const ov2 = Object.values(obj2);

//     if (ok1.length != ok2.length) return false;
    
//     for (let i = 0; i < obj1.keys(); i++) {
//         if (ok1[i] !== ok2[i]) return false;
//         if (ov1[i] !== ov2[i]) return false;
//     }

//     return true;
// }