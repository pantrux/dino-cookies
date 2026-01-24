#!/usr/bin/env node

/**
 * Wrangler wrapper script for Cloudflare Pages
 * 
 * This script intercepts 'wrangler deploy' commands and exits successfully
 * without doing anything, since Cloudflare Pages handles deployment automatically.
 * 
 * For actual wrangler commands (like D1 operations), use 'npx wrangler' directly.
 */

const args = process.argv.slice(2);

// Check if this is a deploy command
if (args.includes('deploy') && !args.includes('pages')) {
    console.log('✓ Cloudflare Pages deployment handled automatically');
    console.log('  No manual wrangler deploy needed');
    process.exit(0);
}

// For any other wrangler command, pass through to the real wrangler
const { spawn } = require('child_process');
const wrangler = spawn('npx', ['wrangler', ...args], {
    stdio: 'inherit',
    shell: true
});

wrangler.on('exit', (code) => {
    process.exit(code || 0);
});
