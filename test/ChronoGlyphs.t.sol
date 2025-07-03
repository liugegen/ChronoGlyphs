// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {ChronoGlyphs} from "../src/ChronoGlyphs.sol";

/**
 * @title ChronoGlyphsTest
 * @notice Ini adalah skrip untuk menguji kontrak ChronoGlyphs kita.
 */
contract ChronoGlyphsTest is Test {
    ChronoGlyphs public chronoGlyphs;
    // 1. Kita buat alamat pengguna palsu untuk tes
    address public constant USER = address(0x1); 

    function setUp() public {
        chronoGlyphs = new ChronoGlyphs();
    }

    /**
     * @notice Tes sederhana untuk memastikan fungsi minting berjalan dengan benar.
     */
    function testMinting() public {
        // 2. Kita "berpura-pura" menjadi USER saat memanggil baris berikutnya
        vm.prank(USER);
        chronoGlyphs.mintGlyph();
        
        // 3. Kita periksa apakah pemilik token ID 1 adalah USER
        assertEq(chronoGlyphs.ownerOf(1), USER);
    }

    /**
     * @notice Tes paling penting: untuk melihat hasil dari tokenURI.
     */
    function testTokenURIOutput() public {
        // 4. Kita "berpura-pura" menjadi USER lagi
        vm.prank(USER);
        chronoGlyphs.mintGlyph();

        string memory uri = chronoGlyphs.tokenURI(1);

        console.log("--- HASIL TOKEN URI ---");
        console.log(uri);
        console.log("------------------------");
    }
}
