import * as chai from "chai";
import bcryptjs from "bcryptjs";
import User from "../api/models/user.model.js";
import sinon from "sinon";
import { signin } from "../api/controllers/auth.controller.js";

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

describe("Signup Function", function () {
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
  it("should return false for an invalid signup", async () => {
    const result = await signup({
      body: {
        email: "tubai@avenger.com",
        password: "tubai1208",
      },
    });
    assert.isFalse(result);
  });
});

describe("signin", () => {
  let sandbox;

  beforeEach(() => {
    // Create a sandbox for easy cleanup
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    // Restore the sandbox to clean up stubs
    sandbox.restore();
  });

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

    // Call the signin function
    await signin(
      { body: { email: "thor3000@avengers.com", password: "thor3000" } },
      res,
      next
    );

    // Assertions
    assert.isTrue(findOneStub.calledOnce);
    assert.isTrue(bcryptjs.compareSync.calledOnce);

    // Restore the stubs to their original implementations
    findOneStub.restore();
  });

  it("should handle user not found", async () => {
    // Stub the findOne method of the User model to return null
    const findOneStub = sandbox.stub(User, "findOne").resolves(null);

    // Mock the response and next function
    const res = {
      cookie: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    // Call the signin function
    await signin(
      { body: { email: "avengers@example.com", password: "avengers" } },
      res,
      next
    );

    // Assertions using Sinon assertions
    assert.isFalse(res.status.calledOnce);
    assert.isFalse(res.json.calledOnce);
    assert.isFalse(res.status.calledWith(404));
    assert.isFalse(res.json.calledWith({ error: "User not found" }));

    // Restore the stubs to their original implementations
    findOneStub.restore();
  });

  it("should handle wrong credentials", async () => {
    // Stub the findOne method of the User model to return a user
    const findOneStub = sandbox.stub(User, "findOne").resolves({
      email: "thor3000@example.com",
      password: bcryptjs.hashSync("thor3000", 10),
    });

    // Stub the compareSync method of bcryptjs to return false for password comparison
    sandbox.stub(bcryptjs, "compareSync").returns(false);

    // Mock the response and next function
    const res = {
      cookie: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const next = sandbox.stub();

    // Call the signin function
    await signin(
      { body: { email: "thor3000@avengers.com", password: "thor300" } },
      res,
      next
    );

    // Assertions using Chai expect assertions
    expect(res.status.calledOnce).to.be.false;
    expect(res.json.calledOnce).to.be.false;
    expect(res.status.calledWith(401)).to.be.false;
    expect(res.json.calledWith({ error: "Wrong Credentials" })).to.be.false;

    // Restore the stubs to their original implementations
    findOneStub.restore();
  });
});
