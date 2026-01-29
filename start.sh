#!/bin/bash

# Zoebar Business Group Website - Startup Script
# This script installs dependencies and starts the development server on port 3000

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Banner
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║        Zoebar Business Group Website Setup           ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Node.js is installed
echo -e "${BLUE}[1/4] Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed.${NC}"
    echo "Please install Node.js v18 or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} found${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm ${NPM_VERSION} found${NC}"

# Install dependencies
echo -e "\n${BLUE}[2/4] Installing dependencies...${NC}"
echo "This may take a few minutes..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}Error: Failed to install dependencies${NC}"
    exit 1
fi

# Check for .env.local file
echo -e "\n${BLUE}[3/4] Checking environment configuration...${NC}"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓ Environment file (.env.local) found${NC}"
else
    echo -e "${YELLOW}⚠ Warning: .env.local file not found${NC}"
    echo "The AI Support Assistant requires an OpenAI API key."
    echo "Please create a .env.local file with:"
    echo "VITE_OPENAI_API_KEY=your_api_key_here"
    echo ""
    read -p "Do you want to continue without it? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start the development server
echo -e "\n${BLUE}[4/4] Starting development server on port 3000...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}\n"

# Wait a moment for user to read
sleep 1

# Start the server
npm run dev -- --port 3000

# This line will only execute if the server is stopped
echo -e "\n${GREEN}Server stopped.${NC}"

