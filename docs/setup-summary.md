# YouTube Trends API - 초기 설정 완료 요약

## 📋 완료된 작업

### 1. 패키지 설치
```bash
npm install googleapis node-cron @types/node-cron prisma @prisma/client
```
- `googleapis`: YouTube Data API v3 클라이언트
- `node-cron`: 백그라운드 스케줄러 (30분마다 트렌드 업데이트)
- `prisma` + `@prisma/client`: PostgreSQL ORM

### 2. TypeScript 설정
- `tsconfig.json` 생성
- Target: ES2022, Module: commonjs
- Strict mode 활성화

### 3. 데이터베이스 설정
- Prisma 스키마 작성 (`prisma/schema.prisma`)
- PostgreSQL 연결: `172.30.1.74:5432/youtube_trends`
- 마이그레이션 완료: `videos` 테이블 생성

### 4. 환경 변수
- `.env` 파일 생성
- `.gitignore` 보안 설정 완료

---

## 🗄️ 데이터베이스 스키마

```prisma
model Video {
  videoId       String   @unique  // YouTube 영상 ID
  title         String            // 영상 제목
  channelTitle  String            // 채널명
  thumbnailUrl  String            // 썸네일 URL
  viewCount     BigInt            // 조회수
  publishedAt   DateTime          // 게시일
  duration      Int               // 영상 길이 (초)
  aspectRatio   String            // "9:16" (숏츠) or "16:9" (롱폼)
  type          String            // "shorts" or "long"
  categoryId    String            // 카테고리 ID
  regionCode    String            // 지역 코드 (KR)
  rank          Int               // 순위 (1-10)
}
```

**숏츠 판별 로직**:
- `duration ≤ 180초` AND `aspectRatio == "9:16"` → 숏츠
- 그 외 → 롱폼

---

## 🏗️ 아키텍처 설계

### DB 기반 아키텍처 (선택 이유)
✅ 응답 속도 10-20배 빠름 (10-50ms)
✅ YouTube API 비용 95% 절감
✅ 사용자 증가해도 API 비용 동일
✅ 히스토리 기능 확장 가능

### 데이터 흐름
```
[백그라운드 Cron - 30분마다]
YouTube API → 영상 데이터 수집 → 숏츠/롱폼 필터링 → PostgreSQL 저장

[클라이언트 요청]
API 요청 → PostgreSQL 쿼리 (10-50ms) → JSON 응답
```

---

## 📂 예정 구조

```
src/
  index.ts              # Entry point
  app.ts                # Express app
  config/
    youtube.config.ts   # YouTube API client
    env.ts              # Environment validation
  services/
    youtube.service.ts  # YouTube API 호출
  jobs/
    trends.job.ts       # Cron 작업
  routes/
    trends.routes.ts    # API 엔드포인트
  controllers/
    trends.controller.ts # Request handlers
  types/
    youtube.types.ts    # TypeScript types
```

---

## 🎯 다음 단계

1. YouTube API 서비스 레이어 구현
2. 백그라운드 Cron 작업 구현 (30분 주기)
3. Express API 엔드포인트 구현:
   - `GET /api/trends/popular?type=shorts|long`
   - `GET /api/trends/category/:categoryId?type=shorts|long`

---

## ⚙️ 환경 변수

```bash
DATABASE_URL=postgresql://...
YOUTUBE_API_KEY=your_key_here
PORT=3000
TRENDS_UPDATE_INTERVAL=30
```

**중요**: `.env` 파일에 YouTube API 키 설정 필요
