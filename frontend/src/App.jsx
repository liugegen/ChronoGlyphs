import { ConnectButton } from '@rainbow-me/rainbowkit';
import './App.css';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

// 1. Definisikan Alamat Kontrak dan ABI
const contractAddress = '0xAE9FbF66469624bc6D0834D3BC547f03B44FB21d'; // <-- Alamat kontrak Anda yang sudah dideploy
const contractABI = [
  {
    "inputs": [],
    "name": "ChronoGlyphs",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintGlyph",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// Fungsi untuk generate hewan monad secara acak
const generateMonadAnimal = () => {
  const animals = [
    {
      name: 'Monad Wolf',
      colors: { primary: '#4A90E2', secondary: '#357ABD', accent: '#F5A623' },
      shape: 'wolf'
    },
    {
      name: 'Monad Tiger',
      colors: { primary: '#F5A623', secondary: '#E68900', accent: '#000000' },
      shape: 'tiger'
    },
    {
      name: 'Monad Dragon',
      colors: { primary: '#7B68EE', secondary: '#6A5ACD', accent: '#FF6347' },
      shape: 'dragon'
    },
    {
      name: 'Monad Phoenix',
      colors: { primary: '#FF6347', secondary: '#FF4500', accent: '#FFD700' },
      shape: 'phoenix'
    },
    {
      name: 'Monad Unicorn',
      colors: { primary: '#DDA0DD', secondary: '#DA70D6', accent: '#FFFFFF' },
      shape: 'unicorn'
    },
    {
      name: 'Monad Eagle',
      colors: { primary: '#8B4513', secondary: '#A0522D', accent: '#FFFFFF' },
      shape: 'eagle'
    },
    {
      name: 'Monad Lion',
      colors: { primary: '#FFD700', secondary: '#FFA500', accent: '#8B4513' },
      shape: 'lion'
    },
    {
      name: 'Monad Owl',
      colors: { primary: '#696969', secondary: '#2F4F4F', accent: '#FFD700' },
      shape: 'owl'
    },
    {
      name: 'Monad Fox',
      colors: { primary: '#FF4500', secondary: '#FF6347', accent: '#FFFFFF' },
      shape: 'fox'
    },
    {
      name: 'Monad Bear',
      colors: { primary: '#8B4513', secondary: '#A0522D', accent: '#FFE4B5' },
      shape: 'bear'
    }
  ];
  
  return animals[Math.floor(Math.random() * animals.length)];
};

// Fungsi untuk generate SVG berdasarkan hewan
const generateAnimalSVG = (animal, isDay) => {
  const { colors, shape } = animal;
  const bgColor = isDay ? '#87CEEB' : '#191970';
  
  switch (shape) {
    case 'wolf':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <circle cx="100" cy="90" r="45" fill="${colors.primary}"/>
          <circle cx="85" cy="80" r="8" fill="${colors.secondary}"/>
          <circle cx="115" cy="80" r="8" fill="${colors.secondary}"/>
          <circle cx="85" cy="78" r="3" fill="#000"/>
          <circle cx="115" cy="78" r="3" fill="#000"/>
          <ellipse cx="100" cy="95" rx="4" ry="6" fill="#000"/>
          <path d="M80,65 Q100,55 120,65 Q110,70 100,68 Q90,70 80,65" fill="${colors.primary}"/>
          <path d="M75,65 Q80,55 85,65" fill="${colors.accent}"/>
          <path d="M115,65 Q120,55 125,65" fill="${colors.accent}"/>
        </svg>
      `;
    case 'tiger':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="100" rx="50" ry="45" fill="${colors.primary}"/>
          <path d="M70,85 Q100,75 130,85" fill="${colors.secondary}"/>
          <path d="M75,95 Q100,90 125,95" fill="${colors.secondary}"/>
          <path d="M80,105 Q100,100 120,105" fill="${colors.secondary}"/>
          <circle cx="88" cy="85" r="6" fill="#000"/>
          <circle cx="112" cy="85" r="6" fill="#000"/>
          <ellipse cx="100" cy="95" rx="3" ry="5" fill="#000"/>
          <path d="M100,100 Q95,105 100,110 Q105,105 100,100" fill="#000"/>
          <path d="M80,70 Q85,60 90,70" fill="${colors.accent}"/>
          <path d="M110,70 Q115,60 120,70" fill="${colors.accent}"/>
        </svg>
      `;
    case 'dragon':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="110" rx="55" ry="40" fill="${colors.primary}"/>
          <circle cx="100" cy="85" r="35" fill="${colors.primary}"/>
          <circle cx="90" cy="78" r="5" fill="${colors.accent}"/>
          <circle cx="110" cy="78" r="5" fill="${colors.accent}"/>
          <circle cx="90" cy="78" r="2" fill="#000"/>
          <circle cx="110" cy="78" r="2" fill="#000"/>
          <path d="M100,90 Q95,95 100,100 Q105,95 100,90" fill="#000"/>
          <path d="M70,65 Q75,50 85,60 Q80,70 70,65" fill="${colors.secondary}"/>
          <path d="M115,60 Q125,50 130,65 Q120,70 115,60" fill="${colors.secondary}"/>
          <path d="M60,90 Q50,80 65,85 Q70,95 60,90" fill="${colors.accent}"/>
          <path d="M135,85 Q150,80 140,90 Q130,95 135,85" fill="${colors.accent}"/>
        </svg>
      `;
    case 'phoenix':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="120" rx="45" ry="35" fill="${colors.primary}"/>
          <circle cx="100" cy="85" r="30" fill="${colors.primary}"/>
          <circle cx="92" cy="80" r="4" fill="#000"/>
          <circle cx="108" cy="80" r="4" fill="#000"/>
          <path d="M100,90 Q98,95 100,98 Q102,95 100,90" fill="${colors.accent}"/>
          <path d="M80,60 Q70,40 90,50 Q95,65 80,60" fill="${colors.secondary}"/>
          <path d="M110,50 Q130,40 120,60 Q105,65 110,50" fill="${colors.secondary}"/>
          <path d="M65,80 Q45,70 60,85 Q75,90 65,80" fill="${colors.accent}"/>
          <path d="M135,85 Q155,70 140,80 Q125,90 135,85" fill="${colors.accent}"/>
          <path d="M100,55 Q95,40 105,40 Q100,50 100,55" fill="${colors.accent}"/>
        </svg>
      `;
    case 'unicorn':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <circle cx="100" cy="100" r="40" fill="${colors.primary}"/>
          <circle cx="92" cy="88" r="6" fill="#000"/>
          <circle cx="108" cy="88" r="6" fill="#000"/>
          <ellipse cx="100" cy="100" rx="3" ry="5" fill="#000"/>
          <path d="M100,105 Q95,110 100,115 Q105,110 100,105" fill="#000"/>
          <path d="M100,65 Q98,45 102,45 Q100,60 100,65" fill="${colors.accent}"/>
          <path d="M95,45 Q100,40 105,45" fill="${colors.accent}"/>
          <path d="M85,70 Q90,60 95,70" fill="${colors.secondary}"/>
          <path d="M105,70 Q110,60 115,70" fill="${colors.secondary}"/>
          <circle cx="75" cy="85" r="2" fill="${colors.accent}"/>
          <circle cx="125" cy="85" r="2" fill="${colors.accent}"/>
          <circle cx="80" cy="95" r="1" fill="${colors.accent}"/>
          <circle cx="120" cy="95" r="1" fill="${colors.accent}"/>
        </svg>
      `;
    case 'eagle':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="110" rx="50" ry="35" fill="${colors.primary}"/>
          <circle cx="100" cy="80" r="32" fill="${colors.primary}"/>
          <circle cx="92" cy="75" r="5" fill="#000"/>
          <circle cx="108" cy="75" r="5" fill="#000"/>
          <path d="M100,85 Q96,90 100,95 Q104,90 100,85" fill="${colors.accent}"/>
          <path d="M65,90 Q45,80 60,95 Q75,100 65,90" fill="${colors.secondary}"/>
          <path d="M135,95 Q155,80 140,90 Q125,100 135,95" fill="${colors.secondary}"/>
          <path d="M85,65 Q80,55 90,60" fill="${colors.accent}"/>
          <path d="M110,60 Q120,55 115,65" fill="${colors.accent}"/>
        </svg>
      `;
    case 'lion':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <circle cx="100" cy="100" r="50" fill="${colors.primary}"/>
          <circle cx="100" cy="90" r="35" fill="${colors.secondary}"/>
          <circle cx="90" cy="85" r="6" fill="#000"/>
          <circle cx="110" cy="85" r="6" fill="#000"/>
          <ellipse cx="100" cy="95" rx="4" ry="6" fill="#000"/>
          <path d="M100,105 Q95,110 100,115 Q105,110 100,105" fill="#000"/>
          <circle cx="75" cy="75" r="8" fill="${colors.accent}"/>
          <circle cx="125" cy="75" r="8" fill="${colors.accent}"/>
          <circle cx="70" cy="90" r="6" fill="${colors.accent}"/>
          <circle cx="130" cy="90" r="6" fill="${colors.accent}"/>
          <circle cx="80" cy="105" r="5" fill="${colors.accent}"/>
          <circle cx="120" cy="105" r="5" fill="${colors.accent}"/>
        </svg>
      `;
    case 'owl':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="110" rx="45" ry="50" fill="${colors.primary}"/>
          <circle cx="85" cy="90" r="18" fill="${colors.secondary}"/>
          <circle cx="115" cy="90" r="18" fill="${colors.secondary}"/>
          <circle cx="85" cy="90" r="10" fill="#000"/>
          <circle cx="115" cy="90" r="10" fill="#000"/>
          <circle cx="85" cy="88" r="3" fill="${colors.accent}"/>
          <circle cx="115" cy="88" r="3" fill="${colors.accent}"/>
          <path d="M100,105 Q98,110 100,115 Q102,110 100,105" fill="${colors.accent}"/>
          <path d="M75,65 Q70,50 80,60" fill="${colors.accent}"/>
          <path d="M120,60 Q130,50 125,65" fill="${colors.accent}"/>
        </svg>
      `;
    case 'fox':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="110" rx="40" ry="35" fill="${colors.primary}"/>
          <circle cx="100" cy="85" r="30" fill="${colors.primary}"/>
          <circle cx="92" cy="80" r="5" fill="#000"/>
          <circle cx="108" cy="80" r="5" fill="#000"/>
          <ellipse cx="100" cy="88" rx="3" ry="4" fill="#000"/>
          <path d="M100,95 Q95,100 100,105 Q105,100 100,95" fill="#000"/>
          <path d="M85,65 Q80,50 90,60" fill="${colors.secondary}"/>
          <path d="M110,60 Q120,50 115,65" fill="${colors.secondary}"/>
          <path d="M90,65 Q95,55 100,65" fill="${colors.accent}"/>
          <path d="M100,65 Q105,55 110,65" fill="${colors.accent}"/>
        </svg>
      `;
    case 'bear':
      return `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="100%" height="100%" fill="${bgColor}" rx="15"/>
          <ellipse cx="100" cy="115" rx="55" ry="45" fill="${colors.primary}"/>
          <circle cx="100" cy="85" r="35" fill="${colors.primary}"/>
          <circle cx="90" cy="80" r="6" fill="#000"/>
          <circle cx="110" cy="80" r="6" fill="#000"/>
          <ellipse cx="100" cy="90" rx="4" ry="6" fill="#000"/>
          <path d="M100,98 Q95,103 100,108 Q105,103 100,98" fill="#000"/>
          <circle cx="75" cy="65" r="12" fill="${colors.secondary}"/>
          <circle cx="125" cy="65" r="12" fill="${colors.secondary}"/>
          <circle cx="75" cy="65" r="6" fill="${colors.accent}"/>
          <circle cx="125" cy="65" r="6" fill="${colors.accent}"/>
        </svg>
      `;
    default:
      return generateAnimalSVG({...animal, shape: 'wolf'}, isDay);
  }
};

function App() {
  const { isConnected, address } = useAccount();
  const { data: hash, writeContract, isPending, error, isSuccess } = useWriteContract();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);

  // Read user's NFT balance
  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine if it's day or night based on current time
  const isDay = currentTime.getHours() >= 6 && currentTime.getHours() < 18;

  // Handle mint success
  useEffect(() => {
    if (isSuccess) {
      const newAnimal = generateMonadAnimal();
      setMintedNFT(newAnimal);
      setMintSuccess(true);
      setTimeout(() => {
        setMintSuccess(false);
        setMintedNFT(null);
      }, 10000); // Show for 10 seconds
    }
  }, [isSuccess]);

  // Format time display
  const timeString = currentTime.toLocaleTimeString();
  const dateString = currentTime.toLocaleDateString();

  async function handleMint() {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'mintGlyph',
      args: [],
    });
  }

  return (
    <div className={`app ${isDay ? 'day-theme' : 'night-theme'}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>⧗ ChronoGlyphs</h2>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Hero Section */}
      <main className="main-content">
        <div className="hero-section">
          <div className="time-display">
            <div className="current-time">
              <span className="time">{timeString}</span>
              <span className="date">{dateString}</span>
              <span className="period">{isDay ? '☀️ Day' : '🌙 Night'}</span>
            </div>
          </div>

          <div className="hero-text">
            <h1 className="title">
              Welcome to <span className="gradient-text">ChronoGlyphs</span>
            </h1>
            <p className="subtitle">
              Living NFTs that evolve with time. Each glyph transforms between day and night, 
              creating a unique visual experience that changes every 12 hours.
            </p>
          </div>

          {/* Demo Glyph Preview */}
          <div className="demo-glyph">
            <div className="glyph-container">
              {isDay ? (
                <svg width="120" height="120" className="glyph-svg">
                  <rect width="100%" height="100%" fill="#87CEEB" rx="10"/>
                  <circle cx="60" cy="60" r="25" fill="#FFD700"/>
                  <path d="M60,25 L65,35 L60,30 L55,35 Z" fill="#FFD700"/>
                  <path d="M85,60 L95,65 L90,60 L95,55 Z" fill="#FFD700"/>
                  <path d="M60,95 L65,85 L60,90 L55,85 Z" fill="#FFD700"/>
                  <path d="M35,60 L25,65 L30,60 L25,55 Z" fill="#FFD700"/>
                </svg>
              ) : (
                <svg width="120" height="120" className="glyph-svg">
                  <rect width="100%" height="100%" fill="#000080" rx="10"/>
                  <circle cx="60" cy="60" r="25" fill="#F0F0F0"/>
                  <circle cx="65" cy="55" r="3" fill="#000080"/>
                  <circle cx="50" cy="45" r="1" fill="#F0F0F0"/>
                  <circle cx="75" cy="35" r="1" fill="#F0F0F0"/>
                  <circle cx="85" cy="50" r="1" fill="#F0F0F0"/>
                  <circle cx="45" cy="75" r="1" fill="#F0F0F0"/>
                </svg>
              )}
            </div>
            <p className="glyph-description">
              {isDay ? 'Day Glyph - Bright and Energetic' : 'Night Glyph - Mystical and Serene'}
            </p>
          </div>

          {/* Minting Section */}
          <div className="minting-section">
            {isConnected ? (
              <div className="connected-state">
                <div className="user-info">
                  <p>Connected: <span className="address">{address?.slice(0, 6)}...{address?.slice(-4)}</span></p>
                  <p>Your Glyphs: <span className="balance">{balance?.toString() || '0'}</span></p>
                </div>
                
                <button 
                  onClick={handleMint} 
                  disabled={isPending}
                  className={`mint-button ${isPending ? 'loading' : ''} ${mintSuccess ? 'success' : ''}`}
                >
                  {isPending ? (
                    <>
                      <span className="spinner"></span>
                      Minting...
                    </>
                  ) : mintSuccess ? (
                    '✅ Minted Successfully!'
                  ) : (
                    '✨ Mint Your ChronoGlyph'
                  )}
                </button>
              </div>
            ) : (
              <div className="disconnected-state">
                <p>Connect your wallet to mint your living NFT</p>
                <div className="connect-prompt">
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button onClick={openConnectModal} className="connect-button">
                        🔗 Connect Wallet
                      </button>
                    )}
                  </ConnectButton.Custom>
                </div>
              </div>
            )}

            {/* Status Messages */}
            {hash && (
              <div className="status-message success">
                <p>✅ Transaction successful!</p>
                <a 
                  href={`https://testnet.monadexplorer.com/tx/${hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  View on Explorer →
                </a>
              </div>
            )}
            
            {error && (
              <div className="status-message error">
                <p>❌ Error: {error.shortMessage || error.message}</p>
              </div>
            )}

            {/* NFT Minted Display */}
            {mintedNFT && (
              <div className="minted-nft-display" onClick={() => setMintedNFT(null)}>
                <div className="nft-showcase" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="close-button" 
                    onClick={() => setMintedNFT(null)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h3>🎉 Your New ChronoGlyph NFT!</h3>
                  <div className="nft-card">
                    <div 
                      className="nft-image"
                      dangerouslySetInnerHTML={{ 
                        __html: generateAnimalSVG(mintedNFT, isDay) 
                      }}
                    />
                    <div className="nft-info">
                      <h4>{mintedNFT.name}</h4>
                      <p className="nft-description">
                        A mystical {mintedNFT.name.split(' ')[1].toLowerCase()} that changes with the rhythm of day and night
                      </p>
                      <div className="nft-traits">
                        <span className="trait">Primary: {mintedNFT.colors.primary}</span>
                        <span className="trait">Type: {isDay ? 'Day Form' : 'Night Form'}</span>
                        <span className="trait">Rarity: Legendary</span>
                      </div>
                    </div>
                  </div>
                  <p className="nft-note">
                    ✨ Your NFT will transform between day and night forms automatically!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h3>Why ChronoGlyphs?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🕐</div>
              <h4>Time-Dynamic</h4>
              <p>Your NFT changes appearance based on real-world time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h4>Unique Art</h4>
              <p>Each glyph has distinctive day and night variations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h4>On-Chain</h4>
              <p>Fully on-chain SVG generation with no external dependencies</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Built on Monad Testnet • ChronoGlyphs © 2025</p>
          <div className="powered-by">
            <p>Powered by <a href="https://x.com/josari213" target="_blank" rel="noopener noreferrer" className="dev-link">Aldi Ranoto</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
