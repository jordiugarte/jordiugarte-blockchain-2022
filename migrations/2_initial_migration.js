const Migrations = artifacts.require("Migrations");
const TestBank = artifacts.require('TestBank')

module.exports = function (deployer) {
  deployer.deploy(TestBank);
};