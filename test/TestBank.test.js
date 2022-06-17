

const TestBank = artifacts.require('TestBank')

contract('TestBank', accounts => {
    let instance;
    beforeEach("deploys a contract", async () => {
        instance = await TestBank.new();
    })


    it('Only owner can have an empty account', async () => {
        try {
            await instance.createAccount([0, "Propietario", 400, true], {from: accounts[0]});
            const account = await instance.listAccounts.call(0);
            assert.equal(
                account.id, 0 === 0 &&
                account.name ==="Propietario" &&
                account.balance === 0 &&
                account.enable === true,
                true
            );
        } catch (e) {
            assert.equal(e.reason, "You are not the owner.");
        }
    })

    it('If mount is greater than 10, return 2', async () => {
        await instance.createAccount([2, "Secundaria", 200, true], {from: accounts[0]})
        const balance1 = await web3.eth.getBalance(accounts[0]);
        await instance.depositMoney(2, {from: accounts[0], value: web3.utils.toWei("11", "ether")})
        const balance2 = await web3.eth.getBalance(accounts[0]);
        assert.equal(balance1 - balance2, 2)
    })

    it("Only the owner can close the bank", async () => {
        try {
            await instance.closeOrOpenBank(true,{from: accounts[5]})
            assert(false);
        } catch (e) {
            assert.equal("You are not the owner.",e.reason)
        }
    });

    it("The deposit must be at least 2 ETH", async()=>{
        try {
            await instance.createAccount([1, "Usuario", 0, false],{from: accounts[0]});
            await instance.depositMoney(1,{
                from: accounts[4],
                value: web3.utils.toWei("1", "ether")
            })
            assert(false);
        }catch (e) {
            assert.equal("The minimun deposit should be more than 2 ETH.",e.reason)
        }
    });

    it("The account name must have at least 6 chars", async()=>{
        try {
            await instance.createAccount([1, "Cien", 200, true], {from: accounts[0]})
            assert(false);
        }catch (e) {
            assert.equal("The name of product should be more than 5.", e.reason)
        }
    });

    it("Only the owner can block an account", async()=>{
        try {
            await instance.blockAccount(2, {from: accounts[5]})
            assert(false);
        }catch (e) {
            assert.equal("You are not the owner.",e.reason)
        }
    });

    it("Realizar el testing los clientes pueden hacer el retiro de su dinero controlar si cuenta con el dinero que desea retirar en su cuenta bancaria", async()=>{
        try {
            await instance.createAccount([8,"543543",0,false],{from: accounts[0]});
            await instance.depositMoney(8,{
                from: accounts[8],
                value: web3.utils.toWei("3", "ether"),});
            //Redrawing money
            await instance.redrawMoney(8,10);
            assert(false);
        }catch (e) {
            assert.equal("You don't have enough money in your account to redraw.",e.reason)
        }
    });

    it("Only the owner can retire funds", async()=>{
        try {
            await instance.withdrawAllMoney({from:accounts[9]});
        }catch (e) {
            assert.equal("You are not the owner.",e.reason)
        }
    });
})