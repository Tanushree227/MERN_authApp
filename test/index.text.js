import * as chai from "chai";
import bcryptjs from "bcryptjs";
import User from "../api/models/user.model.js";
import sinon from "sinon";
import { signin, google } from "../api/controllers/auth.controller.js";
import jwt from 'jsonwebtoken';

const assert = chai.assert;
const expect = chai.expect;

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

describe("Testing for Signup Page", function () {
  // Test case 1: Test successful signup
  it("should return true for a valid signup", async () => {
    const result = await signup({
      body: {
        username: "annu2905",
        email: "annu@avenger.com",
        password: "annu2905",
      },
    });

    assert.isTrue(result);
  });

  // Test case 2: Test unsuccessful signup
  it("should return false for user not found", async () => {
    const result = await signup({
      body: {
        email: "tubai@avenger.com",
        password: "tubai1208",
      },
    });
    assert.isFalse(result);
  });
});

describe("Testing for Signin Page", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  //Test Case 3: Signin with Valid Credentials
  it("should sign in a user with valid credentials", async () => {
    const findOneStub = sandbox.stub(User, "findOne").resolves({
      email: "thor3000@avengers.com",
      password: bcryptjs.hashSync("thor3000", 10),
    });

    sandbox.stub(bcryptjs, "compareSync").returns(true);

    const res = {
      cookie: sandbox.stub().returnsThis(),
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    await signin(
      { body: { email: "thor3000@avengers.com", password: "thor3000" } },
      res,
      next
    );

    assert.isTrue(findOneStub.calledOnce);
    assert.isTrue(bcryptjs.compareSync.calledOnce);

    findOneStub.restore();
  });

  //Test Case 4: Signin with invalid user
  it("should handle user not found", async () => {
    const findOneStub = sandbox.stub(User, "findOne").resolves(null);

    const res = {
      cookie: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    await signin(
      { body: { email: "avengers@example.com", password: "avengers" } },
      res,
      next
    );

    assert.isFalse(res.status.calledOnce);
    assert.isFalse(res.json.calledOnce);
    assert.isFalse(res.status.calledWith(404));
    assert.isFalse(res.json.calledWith({ error: "User not found" }));

    findOneStub.restore();
  });

  //Test Case 5: Sign in with wrong Credentials
  it("should handle wrong credentials", async () => {
    const findOneStub = sandbox.stub(User, "findOne").resolves({
      email: "thor3000@example.com",
      password: bcryptjs.hashSync("thor3000", 10),
    });

    sandbox.stub(bcryptjs, "compareSync").returns(false);

    const res = {
      cookie: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    await signin(
      { body: { email: "thor3000@avengers.com", password: "thor300" } },
      res,
      next
    );

    expect(res.status.calledOnce).to.be.false;
    expect(res.json.calledOnce).to.be.false;
    expect(res.status.calledWith(401)).to.be.false;
    expect(res.json.calledWith({ error: "Wrong Credentials" })).to.be.false;

    findOneStub.restore();
  });
});

describe('Testing for Google Authentication Component', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // Test Case 6: Google Authentication with Valid User
  it('should authenticate a user with valid Google credentials', async () => {
    const findOneStub = sandbox.stub(User, 'findOne').resolves({
      email: 'tanushreedas227@gmail.com',
    });

    sandbox.stub(bcryptjs, 'compareSync').returns(true);

    sandbox.stub(jwt, 'sign').returns('dummyToken');

    const res = {
      cookie: sandbox.stub().returnsThis(),
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    await google(
      { body: { email: 'tanushreedas227@gmail.com' } },
      res,
      next
    );

    assert.isTrue(findOneStub.calledOnce);

    assert.isFalse(bcryptjs.compareSync.calledOnce);

    assert.isTrue(jwt.sign.calledOnce);

    findOneStub.restore();
  });

  // Test Case 7: Google Authentication with Invalid User
  it('should handle Google authentication for an invalid user', async () => {
    const findOneStub = sandbox.stub(User, 'findOne').resolves(null);

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    await google(
      { body: { email: 'invaliduser@gmail.com' } },
      res,
      next
    );

    assert.isFalse(res.status.calledOnce);
    assert.isFalse(res.status.calledWith(404));

    assert.isFalse(res.json.calledOnce);
    assert.isFalse(res.json.calledWith({ error: 'User not found' }));

    findOneStub.restore();
  });
});