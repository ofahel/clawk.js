#!/usr/bin/env node
import { getUserInfo } from "../lib/index.mjs";

// ANSI colors
const c = { reset: "\x1b[0m", bold: "\x1b[1m", green: "\x1b[1;32m", yellow: "\x1b[1;33m", underline: "\x1b[4m", red: "\x1b[1;31m" };

function printBanner() {
  console.clear();
  console.log(c.bold + "    /\\___/\\");
  console.log("    )     (");
  console.log("   =\\     /=");
  console.log("     )   (");
  console.log(`    /     \\   ${c.green}Clawk.js${c.yellow} v1.0${c.reset}${c.bold}`);
  console.log(`    )     (   ${c.reset}Scrape TikTok info by username.${c.bold}`);
  console.log(`   /       \\  ${c.reset}Author: Davidson N. Fahel${c.bold}`);
  console.log(`   \\       /  ${c.reset}GitHub: ${c.underline}github.com/ofahel${c.reset}${c.bold}`);
  console.log(`    \\__ __/   ${c.reset}Inspired by Clawk by Haitham Aouati`);
  console.log(`       ))     ${c.reset}Original project: ${c.underline}github.com/haithamaouati/Clawk${c.reset}`);
  console.log("      //");
  console.log("     ((");
  console.log(`      \\)${c.reset}\n`);
}


function printUsage() {
  console.log("Usage: clawk.js <username>");
}

async function main() {
  printBanner();
  const argv = process.argv.slice(2);
  if (!argv[0]) {
    printUsage();
    process.exit(1);
  }

  const username = argv[0].replace(/^@/, "");

  try {
    const info = await getUserInfo(username);
    console.log(JSON.stringify(info, null, 2));
  } catch (err) {
    console.error(c.red + "Error:" + c.reset, err.message);
    process.exit(1);
  }
}

main();
