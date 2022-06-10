const Migrations = artifacts.require("Migrations");
const Inbox = artifacts.require('Lottery')

module.exports = function (deployer) {
  deployer.deploy(Lottery);
};