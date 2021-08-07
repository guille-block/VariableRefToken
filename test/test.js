const {assert} = require('chai')
const Token = artifacts.require('./VariableRefToken')

//require('chai')
//  .use(require('chai-as-promised'))
//  .should()

  contract('Test Reflection Token', ([deployer, user1, user2, user3]) => {
    let token

    beforeEach(async () => {
        token = await Token.new()
    })

    describe('main IERC20 checks', () => {
        it('checking token name', async () => {
            expect(await token.name()).to.be.eq('VarRefToken')
        })
        it('checking token symbol', async () => {
            expect(await token.symbol()).to.be.eq('GUI')
          })
        it('checking token supply', async () => {
            var supply = 10 * 10**6 * 10**9
            assert.equal(await token.totalSupply(), supply.toString())
        })
        it('checking deployer balance', async () => {
            var depBalance = await token.balanceOf(deployer)
            assert.equal(await token.totalSupply(), depBalance.toString())
        })
    })
        
    describe('Transfers and Reflects', () => {

        it('balance of user2 ok', async () => {
            var tAmount = 100000000000000
            var rAmount = await token.reflectionFromToken(tAmount, true)
            await token.transfer(user2, 100000000000000, {from: deployer})
            var bUser2 = await token.balanceOf(user2)
            var tFromReflection = await token.tokenFromReflection(rAmount)
            assert.equal(tFromReflection.toString(), bUser2.toString())
        })

        it('balances after multiple transfers are equal or standard', async () => {
            await token.transfer(user1, 100000000000000, {from: deployer})
            var bUser1First = await token.balanceOf(user1)
            await token.transfer(user2, 100000000000000, {from: deployer})
            var bUser1Second = await token.balanceOf(user1)
            var bUser2First = await token.balanceOf(user2)
            await token.transfer(user3, 100000000000000, {from: deployer})
            var bUser1Third = await token.balanceOf(user1)
            var bUser2Second = await token.balanceOf(user2)
            var bUser3First = await token.balanceOf(user3)
            assert.equal(bUser1First.toString(), bUser3First.toString(), 'User 1 initial balance is not equal to User 3 initial balance (post first transaction)')
            assert.equal(bUser1First.toString(), bUser2First.toString(), 'User 1 initial balance is not equal to User 2 initial balance (post first transaction)')
            assert.equal(bUser1Second.toString(), bUser2Second.toString(), 'User 1 second balance is not equal to User 2 second balance (post second transaction)')
            assert.isBelow(parseFloat(bUser3First.toString()), parseFloat(bUser2Second.toString()), 'User 3 First balance is not below to User 2 second balance (post third transaction)')
            assert.isBelow(parseFloat(bUser2Second.toString()), parseFloat(bUser1Third.toString()), 'User 2 second balance is not below to User 1 Third balance (post third transaction)')
            
        })
            
    })
})