// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Mengimpor semua perkakas yang kita butuhkan dari OpenZeppelin
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ChronoGlyphs
 * @author liugegen & Gemini
 * @notice Kontrak ini untuk koleksi NFT hidup yang berubah berdasarkan waktu.
 */
contract ChronoGlyphs is ERC721 {
    // Menggunakan library "Strings" untuk mengubah angka (uint256) menjadi teks (string)
    using Strings for uint256;

    // Variabel untuk menghitung jumlah total token yang sudah dibuat
    uint256 private s_tokenCounter;

    // Constructor: Fungsi yang hanya berjalan satu kali saat kontrak dideploy
    constructor() ERC721("ChronoGlyphs", "GLYPH") {
        // Mengatur nama koleksi dan simbolnya
        s_tokenCounter = 0;
    }

    /**
     * @notice Mencetak Glyph baru dan memberikannya kepada si pemanggil dengan aman.
     */
    function mintGlyph() public {
        s_tokenCounter++;
        uint256 newItemId = s_tokenCounter;
        // Menggunakan _safeMint dari OpenZeppelin yang lebih aman
        _safeMint(msg.sender, newItemId);
    }

    /**
     * @notice Mengembalikan metadata untuk ID token tertentu. Di sinilah keajaiban terjadi.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Perbaikan Final: Memeriksa apakah token ada dengan cara mengecek pemiliknya.
        // Jika pemiliknya bukan alamat kosong, berarti token itu ada.
        require(_ownerOf(tokenId) != address(0), "ERC721: URI query for nonexistent token");

        // --- a. Logika Waktu: Menentukan apakah sekarang Siang atau Malam ---
        uint256 secondsInADay = 86400;
        uint256 secondOfTheDay = block.timestamp % secondsInADay;
        bool isDay = secondOfTheDay < (secondsInADay / 2); // Benar untuk 12 jam pertama

        // --- b. Membuat Gambar SVG ---
        string memory svg;
        if (isDay) {
            // Gambar untuk Siang Hari
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="#87CEEB"/><circle cx="100" cy="100" r="40" fill="#FFD700"/></svg>';
        } else {
            // Gambar untuk Malam Hari
            svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="#000080"/><circle cx="100" cy="100" r="40" fill="#F0F0F0"/></svg>';
        }

        // --- c. Enkripsi Base64 untuk Gambar ---
        string memory imageURI = string(abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(bytes(svg))));
        
        // --- d. Membuat Metadata JSON ---
        string memory metadata = string(
            abi.encodePacked(
                '{"name": "ChronoGlyph #',
                tokenId.toString(), // Menggunakan library Strings dari OpenZeppelin
                '", "description": "A living glyph that changes with time.", "attributes": [{"trait_type": "Time of Day", "value": "',
                isDay ? "Day" : "Night",
                '"}], "image": "',
                imageURI,
                '"}'
            )
        );

        // Mengembalikan seluruh metadata yang sudah dienkripsi Base64
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(metadata))));
    }
}
