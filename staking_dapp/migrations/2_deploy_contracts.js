const Dummy_Token = artifacts.require("Dummy_Token");
const Tether_Token = artifacts.require("Tether_Token");
const Staking_Dapp = artifacts.require("Staking_Dapp");

module.exports = async function(deployer, network, accounts){

    await deployer.deploy(Tether_Token)
    const tether_token = await Tether_Token.deployed()

    await deployer.deploy(Dummy_Token)
    const dummy_token = await Dummy_Token.deployed()
//In constructor of staking contract we have passed dummy token and tethertoken address

    await deployer.deploy(Staking_Dapp, dummy_token.address, tether_token.address)
    const staking_dapp = await Staking_Dapp.deployed()
//transfering total supply of dummy token to contract's address
    await dummy_token.transfer(staking_dapp.address, '1000000000000000000000000')
// transfering 100 tether token to first account of ganache 
    await tether_token.transfer(accounts[1], '100000000000000000000')


}