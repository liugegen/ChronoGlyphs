# ⧗ ChronoGlyphs

<div align="center">

![ChronoGlyphs Logo](https://img.shields.io/badge/ChronoGlyphs-Living%20NFTs-blueviolet?style=for-the-badge&logo=ethereum)

**Living NFTs that evolve with time**

[![Monad Testnet](https://img.shields.io/badge/Deployed%20on-Monad%20Testnet-blue?style=flat-square)](https://testnet.monadexplorer.com)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-lightgrey?style=flat-square&logo=solidity)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](https://chronoglyphs.vercel.app) • [📖 Documentation](#documentation) • [🚀 Getting Started](#getting-started) • [🎨 Features](#features)

</div>

## 🌟 Overview

ChronoGlyphs is an innovative NFT collection that brings digital art to life through time. Each Glyph is a **living, breathing artwork** that dynamically transforms between day and night forms based on real-world time, creating a unique visual experience that changes every 12 hours.

### ✨ What Makes ChronoGlyphs Special?

- 🕐 **Time-Dynamic Art**: NFTs that change appearance based on real-world time
- 🎨 **Procedural Generation**: Each mint generates a unique Monad animal with random traits
- ⚡ **Fully On-Chain**: Complete SVG generation with no external dependencies
- 🌍 **Living Ecosystem**: Your NFT transforms automatically - day becomes night, night becomes day
- 🦄 **Monad-Native**: Built specifically for the Monad blockchain ecosystem

---

## 🎨 Features

### 🌅 Dynamic Day/Night Cycle
- **Day Form**: Bright, energetic designs with sun-inspired elements
- **Night Form**: Mystical, serene artwork with moon and star motifs
- **Automatic Transformation**: Changes every 12 hours based on UTC time

### 🦁 Procedural Animal Generation
ChronoGlyphs generates 10 unique Monad animals on mint:
- 🐺 **Monad Wolf** - Loyal guardians of the blockchain
- 🐅 **Monad Tiger** - Fierce protectors with striped patterns
- 🐉 **Monad Dragon** - Legendary creatures of immense power
- 🔥 **Monad Phoenix** - Mythical beings of rebirth and renewal
- 🦄 **Monad Unicorn** - Magical entities of purity and wonder
- 🦅 **Monad Eagle** - Majestic rulers of the digital skies
- 🦁 **Monad Lion** - Noble kings of the crypto savanna
- 🦉 **Monad Owl** - Wise keepers of blockchain knowledge
- 🦊 **Monad Fox** - Clever tricksters of the DeFi world
- 🐻 **Monad Bear** - Gentle giants of the ecosystem

### 💎 Rarity & Traits
- **Unique Color Palettes**: Each animal has distinct primary, secondary, and accent colors
- **Time-Based Traits**: Day/Night form variations double the visual possibilities
- **Legendary Rarity**: All ChronoGlyphs are marked as Legendary tier
- **Blockchain Metadata**: Fully on-chain trait storage and generation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- [Foundry](https://book.getfoundry.sh/getting-started/installation) for smart contract development
- MetaMask or compatible Web3 wallet
- Monad Testnet MON tokens

### 🏗️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/liugegen/ChronoGlyphs.git
   cd ChronoGlyphs
   ```

2. **Install smart contract dependencies**
   ```bash
   forge install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

### ⚙️ Environment Setup

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**
   ```env
   PRIVATE_KEY=your_private_key_here
   MONAD_RPC_URL=https://testnet-rpc.monad.xyz
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

### 🔧 Development

**Smart Contract Development:**
```bash
# Compile contracts
forge build

# Run tests
forge test

# Run tests with gas reporting
forge test --gas-report
```

**Frontend Development:**
```bash
cd frontend
npm run dev
```

### 🚀 Deployment

**Deploy to Monad Testnet:**
```bash
# Deploy contract
forge script script/DeployChronoGlyphs.s.sol --rpc-url $MONAD_RPC_URL --private-key $PRIVATE_KEY --broadcast

# Verify contract (optional)
forge verify-contract <CONTRACT_ADDRESS> src/ChronoGlyphs.sol:ChronoGlyphs --chain-id 10143
```

---

## 🏗️ Architecture

### Smart Contract Structure

```
src/
├── ChronoGlyphs.sol        # Main NFT contract
├── test/
│   └── ChronoGlyphs.t.sol  # Comprehensive test suite
└── script/
    └── DeployChronoGlyphs.s.sol  # Deployment script
```

### Frontend Architecture

```
frontend/
├── src/
│   ├── App.jsx             # Main application component
│   ├── App.css             # Responsive styling
│   ├── main.jsx            # React entry point
│   └── assets/             # Static assets
├── public/                 # Public assets
└── package.json            # Dependencies
```

### 🔗 Contract Details

**Deployed on Monad Testnet:**
- **Contract Address**: `0xAE9FbF66469624bc6D0834D3BC547f03B44FB21d`
- **Network**: Monad Testnet (Chain ID: 10143)
- **Explorer**: [View on MonadExplorer](https://testnet.monadexplorer.com/address/0xAE9FbF66469624bc6D0834D3BC547f03B44FB21d)

---

## 🎯 Core Functions

### Smart Contract API

```solidity
// Mint a new ChronoGlyph
function mintGlyph() public

// Get token metadata (includes dynamic SVG)
function tokenURI(uint256 tokenId) public view returns (string memory)

// Standard ERC721 functions
function balanceOf(address owner) public view returns (uint256)
function ownerOf(uint256 tokenId) public view returns (address)
```

### Time Logic

The contract determines day/night state using:
```solidity
uint256 secondsInADay = 86400;
uint256 secondOfTheDay = block.timestamp % secondsInADay;
bool isDay = secondOfTheDay < (secondsInADay / 2);
```

- **Day**: 00:00 - 11:59 UTC
- **Night**: 12:00 - 23:59 UTC

---

## 🌐 Frontend Features

### 🎨 Modern React Interface
- **RainbowKit Integration**: Seamless wallet connection
- **Real-time Clock**: Live time display with day/night indication
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Previews**: Live demo of day/night transformations

### 🔗 Web3 Integration
- **Wagmi Hooks**: Modern Web3 React patterns
- **Viem**: Type-safe Ethereum interactions
- **Monad Network**: Custom network configuration
- **Transaction Tracking**: Real-time mint status and explorer links

### 📱 Responsive Experience
- **Mobile-First**: Touch-optimized interface
- **Progressive Enhancement**: Works on all modern browsers
- **Accessibility**: WCAG compliant with screen reader support
- **Performance**: Optimized loading and animations

---

## 🧪 Testing

### Smart Contract Tests

```bash
# Run all tests
forge test

# Run specific test
forge test --match-test testMinting

# Run with verbosity
forge test -vvv

# Generate coverage report
forge coverage
```

### Test Coverage

- ✅ Minting functionality
- ✅ Token URI generation
- ✅ Day/night state logic
- ✅ Metadata structure
- ✅ Access controls
- ✅ Edge cases

---

## 🛠️ Technology Stack

### Blockchain
- **Solidity ^0.8.20**: Smart contract language
- **OpenZeppelin**: Security-audited contract libraries
- **Foundry**: Development framework and testing
- **Monad**: High-performance blockchain network

### Frontend
- **React 19**: Modern UI framework
- **Vite**: Lightning-fast build tool
- **RainbowKit**: Premium wallet connection
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum library

### Development Tools
- **ESLint**: Code linting and formatting
- **Git**: Version control
- **GitHub Actions**: CI/CD pipeline
- **Vercel**: Frontend deployment

---

## 🎨 Visual Examples

### Day Form
```
🌅 Bright blue sky background
☀️ Golden sun elements
✨ Warm, energetic color palette
🌟 Radiant light effects
```

### Night Form
```
🌙 Deep blue/purple night sky
⭐ Silver moon and stars
🌌 Cool, mystical color palette
✨ Ethereal glow effects
```

---

## 🚀 Roadmap

### Phase 1: Core Launch ✅
- [x] Smart contract development
- [x] Frontend application
- [x] Monad Testnet deployment
- [x] Basic minting functionality

### Phase 2: Enhanced Features 🔄
- [ ] Marketplace integration
- [ ] Trait rarity system
- [ ] Community governance
- [ ] Mobile app development

### Phase 3: Ecosystem Expansion 🔮
- [ ] Cross-chain compatibility
- [ ] Gaming integrations
- [ ] Physical collectibles
- [ ] DAO formation

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow Solidity style guide
- Write comprehensive tests
- Maintain TypeScript types
- Use conventional commits

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract libraries
- **Monad** for the high-performance blockchain infrastructure
- **Foundry** team for excellent development tools
- **React** and **Vite** teams for modern frontend tooling
- **RainbowKit** for beautiful wallet integration

---

## 📞 Contact & Community

### Developer
- **Aldi Ranoto**: [@josari213](https://x.com/josari213)
- **GitHub**: [liugegen](https://github.com/liugegen)

### Community
- **Discord**: [Join our community](https://discord.gg/chronoglyphs)
- **Twitter**: [@ChronoGlyphs](https://twitter.com/chronoglyphs)
- **Telegram**: [ChronoGlyphs Channel](https://t.me/chronoglyphs)

---

<div align="center">

**⧗ ChronoGlyphs - Where Time Meets Art ⧗**

*Built with ❤️ for the Monad ecosystem*

Powered by **[Aldi Ranoto](https://x.com/josari213)** 🐦

</div>
