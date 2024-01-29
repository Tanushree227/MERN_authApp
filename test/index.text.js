import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import bcryptjs from 'bcryptjs';
import User from "../api/models/user.model.js";
import app from '../api/index.js';

// chai.use(chaiHttp);
// chai.assert();
// const should = chai.should();

// describe('Login API', () => {
//   it('should return a token on successful login', (done) => {
//     const credentials = {
//       email: 'thor3000@avengers.com',
//       password: 'thor3000',
//     };

//     chai
//       .request(app)
//       .post('/api/signin')
//       .send(credentials)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('token');
//         done();
//       });
//   });

//   it('should return an error on invalid login credentials', (done) => {
//     const credentials = {
//       username: 'tanushree227',
//       password: 'tanu2277',
//     };

//     chai
//       .request(app)
//       .post('/api/auth/signin')
//       .send(credentials)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.body.should.be.a('object');
//         res.body.should.have.property('error');
//         done();
//       });
//   });
// });


// Import the necessary libraries
const assert = chai.assert;

const signup = async (req) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return true;
  } catch (error) {
    return false;
  }
};


describe('Signup Function', function() {
  // Test case 1: Test successful signup
  it('should return true for a valid signup', async function() {
      const result = await signup({
          body: {
              username: 'annu1208',
              email: 'annu@avenger.com',
              password: 'annu1208',
          },
      });

      assert.isTrue(result);
  });
  //Test case 2: Test unsuccessful signup
  it('should return false for a invalid signup', async () => {
    const result = await signup({
      body: {
        email: 'tuba@avenger.com',
        password: 'tuba1208',
      },
    });
    assert.isFalse(result);
  });
  
});

