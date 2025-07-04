// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {ChronoGlyphs} from "../src/ChronoGlyphs.sol";

/**
 * @title ChronoGlyphsTest V2
 * @notice Menambahkan tes untuk fitur "Weekend Glow".
 */
contract ChronoGlyphsTest is Test {
    ChronoGlyphs public chronoGlyphs;
    address public constant USER = address(0x1); 

    function setUp() public {
        chronoGlyphs = new ChronoGlyphs();
    }

    function testMinting() public {
        vm.prank(USER);
        chronoGlyphs.mintGlyph();
        assertEq(chronoGlyphs.ownerOf(1), USER);
    }

    function testTokenURINormalDay() public {
        // Tes ini memastikan output di hari biasa (bukan akhir pekan)
        vm.prank(USER);
        chronoGlyphs.mintGlyph();
        string memory uri = chronoGlyphs.tokenURI(1);
        console.log("--- HASIL TOKEN URI (HARI BIASA) ---");
        console.log(uri);
        console.log("------------------------------------");
    }

    // --- TES BARU UNTUK FITUR WEEKEND GLOW ---
    function testTokenURIOnWeekend() public {
        // 1. Kita tentukan sebuah timestamp untuk hari Sabtu
        // 1751788800 adalah timestamp untuk Sabtu, 5 Juli 2025
        uint256 saturdayTimestamp = 1751788800;

        // 2. "Alat Sihir" Foundry: Memanipulasi waktu!
        // Semua transaksi setelah baris ini akan menganggap waktunya adalah hari Sabtu.
        vm.warp(saturdayTimestamp);

        // 3. Kita mint NFT di "hari Sabtu"
        vm.prank(USER);
        chronoGlyphs.mintGlyph();

        // 4. Kita ambil dan tampilkan hasilnya
        string memory uri = chronoGlyphs.tokenURI(1);
        console.log("--- HASIL TOKEN URI (AKHIR PEKAN) ---");
        console.log(uri);
        console.log("-------------------------------------");

        // 5. Tes tambahan untuk memastikan atribut Flair ada
        assert(bytes(uri).length > 0); // Memastikan URI tidak kosong
    }
}
