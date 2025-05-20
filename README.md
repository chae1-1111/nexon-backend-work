# [메이플스토리 PC] 웹 백엔드 개발자 과제전형 결과물

NestJS와 MongoDB를 기반으로 한 MSA 구조의 백엔드 서버입니다.

## API 문서
./Auth-API.md
./Event-API.md

## 📁 프로젝트 구조

```
.
├── auth/               # 인증 서비스
├── event/              # 이벤트 처리 서비스
├── gateway/            # API Gateway (JWT 인증 처리 및 라우팅)
├── docker-compose.yml  # 전체 서비스 실행 구성
└── ...
```

---

## 🛠️ 사용 기술

- **NestJS**: 각 서비스는 NestJS로 구성됨
- **MongoDB**: 데이터 저장소로 사용
- **Passport-JWT**: 인증 처리
- **Docker / Docker Compose**: 컨테이너 기반의 MSA 실행 환경
- **Node.js (v18)**: 런타임 환경

---

## 🚀 실행 방법

1. **레포지토리 클론**
   ```bash
   git clone https://github.com/chae1-1111/nexon-backend-work.git
   cd nexon-backend-work
   ```

2. **Docker Compose 실행**
   ```bash
   docker-compose up --build
   ```

3. **서비스 포트**

| 서비스     | 포트    |
|---------|-------|
| Gateway | 3000  |
| Auth    | 3001  |
| Event   | 3002  |
| MongoDB | 27017 |

---

## 🔐 인증 처리 흐름

1. `gateway` 서비스는 `access token`을 검증합니다.
2. 검증된 사용자 정보는 `Request` 객체에 담긴 채 `auth`, `event` 서비스로 전달됩니다.

---

## 🧩 초기 데이터 세팅

각 서비스는 시작 시 DB에 필수 데이터가 있는지 확인하고, 없을 경우 자동으로 생성합니다.  
이는 `onModuleInit()` 또는 별도의 `SeederService`를 통해 처리됩니다.

---

## ✍️ 작성자

- 작성자: 임채원
- 이메일: dla4212@naver.com
- GitHub: https://github.com/chae1-1111
