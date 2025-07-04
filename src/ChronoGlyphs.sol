// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Mengimpor semua perkakas yang kita butuhkan dari OpenZeppelin
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ChronoGlyphs V2
 * @author liugegen & Gemini
 * @notice Versi ini menambahkan fitur bonus "Weekend Glow".
 */
contract ChronoGlyphs is ERC721 {
    using Strings for uint256;

    uint256 private s_tokenCounter;

    constructor() ERC721("ChronoGlyphs", "GLYPH") {
        s_tokenCounter = 0;
    }

    function mintGlyph() public {
        s_tokenCounter++;
        uint256 newItemId = s_tokenCounter;
        _safeMint(msg.sender, newItemId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721: URI query for nonexistent token");

        // --- a. Logika Waktu ---
        uint256 secondsInADay = 86400;
        uint256 currentTimestamp = block.timestamp;
        
        // Menentukan Siang atau Malam
        uint256 secondOfTheDay = currentTimestamp % secondsInADay;
        bool isDay = secondOfTheDay < (secondsInADay / 2);

        // --- FITUR BARU: Menentukan Akhir Pekan ---
        // Epoch time (1 Jan 1970) adalah hari Kamis (hari ke-4)
        uint256 dayOfWeek = ((currentTimestamp / secondsInADay) + 4) % 7; // 0=Minggu, 6=Sabtu
        bool isWeekend = (dayOfWeek == 0 || dayOfWeek == 6);

        // --- b. Membuat Gambar SVG ---
        string memory svg;
        string memory flairAttribute;

        string memory weekendGlowEffect = '<filter id="glow"><feGaussianBlur stdDeviation="3.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
        string memory weekendGlowStyle = ' style="filter:url(#glow)"';

        if (isDay) {
            // Gambar untuk Siang Hari
            svg = string(abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">',
                isWeekend ? weekendGlowEffect : "", // Tambahkan efek filter jika akhir pekan
                '<rect width="100%" height="100%" fill="#87CEEB"/>',
                '<circle cx="100" cy="100" r="40" fill="#FFD700"',
                isWeekend ? weekendGlowStyle : "", // Tambahkan gaya glow jika akhir pekan
                '/></svg>'
            ));
        } else {
            // Gambar untuk Malam Hari
            svg = string(abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">',
                isWeekend ? weekendGlowEffect : "",
                '<rect width="100%" height="100%" fill="#000080"/>',
                '<circle cx="100" cy="100" r="40" fill="#F0F0F0"',
                isWeekend ? weekendGlowStyle : "",
                '/></svg>'
            ));
        }

        // Menentukan atribut bonus untuk JSON
        if (isWeekend) {
            flairAttribute = ',{"trait_type": "Flair", "value": "Weekend Glow"}';
        } else {
            flairAttribute = "";
        }

        // --- c. Enkripsi Base64 untuk Gambar ---
        string memory imageURI = string(abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(bytes(svg))));
        
        // --- d. Membuat Metadata JSON (dengan atribut bonus) ---
        string memory metadata = string(
            abi.encodePacked(
                '{"name": "ChronoGlyph #',
                tokenId.toString(),
                '", "description": "A living glyph that changes with time.", "attributes": [{"trait_type": "Time of Day", "value": "',
                isDay ? "Day" : "Night",
                '"',
                flairAttribute, // Tambahkan atribut flair di sini
                '}], "image": "',
                imageURI,
                '"}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(metadata))));
    }
}
