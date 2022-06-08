const Lottery = artifacts.require('Lottery');

contract('Lottery', accounts => {
    let instance;
    beforeEach("deploy", async () => {
        instance = await Lottery.new();
    })

    it("allows one account to enter", async () => {
        const instance = await Lottery.deployed();
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
    })

    it("allows multiple accounts to enter", async () => {
        await instance.enter({from: accounts[0], value: web3.utils.toWei("3", "ether")});
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        await instance.enter({from: accounts[2], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    })

    it("require a minimum amount of ether to enter", async () => {
        try {
            await instance.enter({from: accounts[1], value: web3.utils.toWei("1", "ether")});
        } catch (e) {
            assert.equal("Minimum 2.1 Ether", e.reason);
        }
    })

    it("only manager can call pickWinner()", async () => {
        try {
            await instance.pickWinner({from: accounts[8]});
            assert(true);
        } catch(e) {
            assert.equal("you are not the manager.", e.reason);
        }
    })
})