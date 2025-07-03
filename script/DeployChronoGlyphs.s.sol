// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ChronoGlyphs} from "../src/ChronoGlyphs.sol";

/**
 * @title DeployChronoGlyphs
 * @notice Skrip sederhana untuk mendeploy kontrak ChronoGlyphs.
 */
contract DeployChronoGlyphs is Script {
    
    /**
     * @notice Fungsi utama yang akan dijalankan oleh Foundry.
     */
    function run() external returns (ChronoGlyphs) {
        // Memulai "siaran" transaksi ke blockchain
        vm.startBroadcast();

        // Membuat dan mendeploy instance baru dari kontrak ChronoGlyphs
        ChronoGlyphs chronoGlyphs = new ChronoGlyphs();

        // Menghentikan "siaran" transaksi
        vm.stopBroadcast();

        // Mengembalikan alamat kontrak yang baru saja dideploy
        return chronoGlyphs;
    }
}
