const Migrations = artifacts.require("SocailNetwork"); //reflect the socialnetwork in abs folder

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


