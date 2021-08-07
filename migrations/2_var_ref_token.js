const VarRefToken = artifacts.require("VariableRefToken");

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(VarRefToken)  
};