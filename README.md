# Terminal Codes

```bash
## For Smart Contract:

# Create a directory
mkdir <directory>

# Change into the created directory
cd <directory>

# Install Hardhat as a development dependency
npm install --save-dev hardhat

# Initialize Hardhat project
npx hardhat init

# Remove the default Lock.sol contract
rm contracts/Lock.sol

# Install OpenZeppelin contracts
npm i @openzeppelin/contracts

# Install ethers
npm i ethers

# Install dotenv
npm i dotenv

# Run contract deployment script
npx hardhat run scripts/deploy.ts --network "arbitrum-sepolia"

# Verify the deployed contract on the "arbitrum-sepolia" network
npx hardhat verify --network "arbitrum-sepolia" <contract address> <wallet address>


##For frontend app
# Create a new Next.js app
npx create-next-app <name>
# Run the app in development mode
npm run dev
