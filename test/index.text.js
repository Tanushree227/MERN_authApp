import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import app from '../api/index.js';

chai.use(chaiHttp);
const should = chai.should();

describe('Login API', () => {
  it('should return a token on successful login', (done) => {
    const credentials = {
      email: 'thor3000@avengers.com',
      password: 'thor3000',
    };

    chai
      .request(app)
      .post('/api/signin')
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should return an error on invalid login credentials', (done) => {
    const credentials = {
      username: 'tanushree227',
      password: 'tanu2277',
    };

    chai
      .request(app)
      .post('/api/auth/signin')
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
