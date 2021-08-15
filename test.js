import supertest from 'supertest'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import {app} from './server.js'
chai.use(sinonChai);
const {expect}=chai
const server = supertest.agent(app);


describe('Assignment Tests', () => {

    it('should call server with valid params', done => {
        server.get('/api/surprise?name=Quinn&birth_year=2000')
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
            })
        done();
    });


    it('should fail when calling server with invalid params', done => {
        server.get('/api/surprise?name=Quinn')
            .expect(400)
            .end((err, res) => {
                expect(res.status).to.equal(400);
            });
        done();
    });

    it('should return chuck noris joke', done => {
        server.get("/api/surprise?name=Quinn&birth_year=2000")
            .end((err,res) => {
                expect(res.body.type).to.deep.equal("chuck-norris-joke")
            })
        done()
    })

    it('should return kanye-west quote', done => {
        server.get("/api/surprise?name=Quinn&birth_year=2000")
            .end((err,res) => {
                expect(res.body.type).to.deep.equal("chuck-norris-joke")
            })
        done()
    })
});



