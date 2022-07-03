// imports
const { ethers, run, network } = require("hardhat");

// async main
async function main() {
  // 컨트랙트를 불러옵니다.
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  // 불러온 컨트랙트를 배포합니다.
  const simpleStorage = await SimpleStorageFactory.deploy();
  // 배포된 컨트랙트의 주소를 획득합니다.
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  // what happens when we deploy to our hardhat network?
  // chainId: An optional number, used to validate the network Hardhat connects to. If not present, this validation is omitted.
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
