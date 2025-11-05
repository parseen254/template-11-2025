#!/usr/bin/env node

/**
 * Get Convex Admin Key Script
 * 
 * Retrieves the admin key for the local Convex development deployment.
 * This key is required to access the Convex dashboard.
 */

import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

function getAdminKey() {
  try {
    // Read deployment name from .env.local
    const envPath = join(process.cwd(), '.env.local');
    if (!existsSync(envPath)) {
      console.error('❌ .env.local file not found');
      process.exit(1);
    }

    const envContent = readFileSync(envPath, 'utf-8');
    const deploymentMatch = envContent.match(/CONVEX_DEPLOYMENT=(.+)/);
    
    if (!deploymentMatch) {
      console.error('❌ CONVEX_DEPLOYMENT not found in .env.local');
      process.exit(1);
    }

    const deployment = deploymentMatch[1].trim();
    const [backend, deploymentName] = deployment.split(':');

    // Construct path to config.json
    const configPath = join(
      homedir(),
      '.convex',
      `${backend}-convex-backend-state`,
      deploymentName,
      'config.json'
    );

    if (!existsSync(configPath)) {
      console.error(`❌ Config file not found at: ${configPath}`);
      console.error('💡 Make sure you\'ve run "npx convex dev" at least once');
      process.exit(1);
    }

    // Read and parse config
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    
    if (!config.adminKey) {
      console.error('❌ Admin key not found in config');
      process.exit(1);
    }

    // Get deployment URL
    const deploymentUrl = envContent.match(/NEXT_PUBLIC_CONVEX_URL=(.+)/)?.[1]?.trim();

    // Print results
    console.log('\n🔑 Convex Admin Key Retrieved Successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📋 Admin Key:`);
    console.log(`   ${config.adminKey}`);
    
    if (deploymentUrl) {
      console.log(`\n🌐 Deployment URL:`);
      console.log(`   ${deploymentUrl}`);
      
      // If it's a GitHub Codespaces URL, provide the external URL
      const urlMatch = deploymentUrl.match(/127\.0\.0\.1:(\d+)/);
      if (urlMatch && process.env.CODESPACE_NAME) {
        const port = urlMatch[1];
        const externalUrl = `https://${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`;
        console.log(`\n🔗 Dashboard URL (Codespaces):`);
        console.log(`   ${externalUrl}`);
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 Usage:');
    console.log('   1. Navigate to the Convex Dashboard');
    console.log('   2. Paste the Admin Key when prompted');
    console.log('   3. Click "Log In"\n');

    // Copy to clipboard if in Codespaces
    if (process.env.CODESPACE_NAME) {
      console.log('📋 Admin key has been output above - you can copy it from the terminal\n');
    }

  } catch (error) {
    console.error('❌ Error retrieving admin key:', error.message);
    process.exit(1);
  }
}

getAdminKey();
