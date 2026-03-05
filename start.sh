#!/bin/bash

# AutoSocial AI — Startup Script
# Starts both the FastAPI backend and Next.js frontend

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo -e "${BLUE}🚀 Starting AutoSocial AI${NC}"
echo -e "${YELLOW}════════════════════════${NC}"

# Check for backend venv
if [ ! -d "$BACKEND_DIR/venv" ]; then
    echo -e "${RED}❌ No virtual environment found at backend/venv${NC}"
    echo -e "   Run: cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# Check for frontend node_modules
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo -e "${YELLOW}⚠  Installing frontend dependencies...${NC}"
    cd "$FRONTEND_DIR" && npm install
fi

# Kill anything on ports 3000 and 8001
echo -e "${YELLOW}🧹 Cleaning up ports 3000 & 8001...${NC}"
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:8001 | xargs kill -9 2>/dev/null || true

sleep 0.5

# Start backend
echo -e "${GREEN}⚙️  Starting FastAPI backend on http://localhost:8001${NC}"
(cd "$BACKEND_DIR" && ./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload) &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Check backend
echo -e "${YELLOW}🔍 Checking backend health...${NC}"
HEALTH=$(curl -s http://localhost:8001/health 2>/dev/null)
if [[ "$HEALTH" == *"healthy"* ]]; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${YELLOW}⚠  Backend may not be ready yet (still starting up)${NC}"
fi

# Start frontend
echo -e "${GREEN}🌐 Starting Next.js frontend on http://localhost:3000${NC}"
(cd "$FRONTEND_DIR" && npm run dev) &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e "${GREEN}  AutoSocial AI is running!${NC}"
echo -e "${GREEN}  Frontend:  http://localhost:3000${NC}"
echo -e "${GREEN}  Backend:   http://localhost:8001${NC}"
echo -e "${GREEN}  API Docs:  http://localhost:8001/docs${NC}"
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Trap to clean up on exit
trap "echo -e '\n${RED}Shutting down...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Wait
wait
