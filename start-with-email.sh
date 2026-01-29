#!/bin/bash

# Zoebar Business Group - Start Script with Email Server
# This script starts both the email server and the website

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Banner
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║        Zoebar Business Group - Full Stack            ║"
echo "║        Website + Email Server                        ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}Starting services...${NC}\n"

# Function to cleanup background processes
cleanup() {
    echo -e "\n${YELLOW}Stopping servers...${NC}"
    kill $(jobs -p) 2>/dev/null || true
    exit
}

trap cleanup SIGINT SIGTERM

# Start email server in background
echo -e "${BLUE}[1/2] Starting Email Server (Port 3001)...${NC}"
npm run server &
EMAIL_SERVER_PID=$!

# Wait a bit for email server to start
sleep 2

# Start website in background
echo -e "${BLUE}[2/2] Starting Website (Port 3333)...${NC}"
npm run dev -- --port 3333 &
WEBSITE_PID=$!

echo -e "\n${GREEN}✅ All services started!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📧 Email Server:${NC} http://localhost:3001"
echo -e "${BLUE}🌐 Website:${NC}      http://localhost:3333"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "\n${YELLOW}Press Ctrl+C to stop all servers${NC}\n"

# Wait for all background processes
wait

