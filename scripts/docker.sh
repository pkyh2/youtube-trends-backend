#!/bin/bash

# 스크립트의 디렉토리 기준으로 프로젝트 루트 경로 설정
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Docker Compose 파일 경로
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 사용법 출력
usage() {
    echo -e "${BLUE}사용법:${NC}"
    echo "  ./scripts/docker.sh [command]"
    echo "  또는"
    echo "  npm run docker:[command]"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  up        - 컨테이너 시작 (백그라운드, 빌드 포함)"
    echo "  down      - 컨테이너 중지 및 제거"
    echo "  stop      - 컨테이너 중지 (제거하지 않음)"
    echo "  logs      - 실시간 로그 출력"
    echo "  restart   - 컨테이너 재시작 (빌드 포함)"
    echo "  ps        - 실행 중인 컨테이너 확인"
    echo "  seed      - 실행 중인 컨테이너에서 seed 데이터 삽입"
    echo "  exec      - 컨테이너 내부 shell 접속"
    echo "  help      - 도움말 출력"
    echo ""
    echo -e "${BLUE}예시:${NC}"
    echo "  ./scripts/docker.sh up"
    echo "  npm run docker:up"
    exit 1
}

# 인자가 없으면 사용법 출력
if [ $# -eq 0 ]; then
    usage
fi

# 명령어 처리
case "$1" in
    up)
        echo -e "${GREEN}🚀 Docker 컨테이너를 빌드하고 시작합니다...${NC}"
        docker compose -f $COMPOSE_FILE up -d --build
        echo -e "${GREEN}✅ 컨테이너가 시작되었습니다!${NC}"
        echo -e "${YELLOW}💡 로그를 보려면: ./docker.sh logs${NC}"
        ;;
    
    down)
        echo -e "${YELLOW}🛑 Docker 컨테이너를 중지하고 제거합니다...${NC}"
        docker compose -f $COMPOSE_FILE down
        echo -e "${GREEN}✅ 컨테이너가 제거되었습니다!${NC}"
        ;;
    
    stop)
        echo -e "${YELLOW}⏸️  Docker 컨테이너를 중지합니다...${NC}"
        docker compose -f $COMPOSE_FILE stop
        echo -e "${GREEN}✅ 컨테이너가 중지되었습니다!${NC}"
        ;;
    
    logs)
        echo -e "${BLUE}📋 실시간 로그를 출력합니다... (Ctrl+C로 종료)${NC}"
        docker compose -f $COMPOSE_FILE logs -f
        ;;
    
    restart)
        echo -e "${YELLOW}🔄 Docker 컨테이너를 재시작합니다...${NC}"
        docker compose -f $COMPOSE_FILE down
        docker compose -f $COMPOSE_FILE up -d --build
        echo -e "${GREEN}✅ 컨테이너가 재시작되었습니다!${NC}"
        echo -e "${YELLOW}💡 로그를 보려면: ./docker.sh logs${NC}"
        ;;
    
    ps)
        echo -e "${BLUE}📦 실행 중인 컨테이너:${NC}"
        docker compose -f $COMPOSE_FILE ps
        ;;
    
    seed)
        echo -e "${BLUE}🌱 Seed 데이터를 삽입합니다...${NC}"
        docker compose -f $COMPOSE_FILE exec api npx prisma db seed
        echo -e "${GREEN}✅ Seed 데이터 삽입이 완료되었습니다!${NC}"
        ;;
    
    exec)
        echo -e "${BLUE}🔧 컨테이너 내부 shell에 접속합니다...${NC}"
        docker compose -f $COMPOSE_FILE exec api sh
        ;;
    
    help)
        usage
        ;;
    
    *)
        echo -e "${RED}❌ 알 수 없는 명령어: $1${NC}"
        usage
        ;;
esac

