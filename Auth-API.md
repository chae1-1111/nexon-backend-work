# Auth API 문서

### BaseURL : http://localhost:3000/auth

## 1. 로그인

- **URL**: `/login`
- **Method**: `POST`
- **설명**: 로그인을 통해 Access Token 과 Refresh Token 발급
- **Authorization**: 불필요
- **권한**: 모든 사용자
- **Request Body**:

| 항목       | 타입   | 필수여부 | 비고       |
|----------|--------|------|----------|
| userId   | string | 필수   | 사용자 아이디  |
| password | string | 필수   | 사용자 비밀번호 |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "accessToken": "JWT",
        "refreshToken": "JWT"
      }
      ```

## 2. 회원가입

- **URL**: `/signup`
- **Method**: `POST`
- **설명**: 신규 사용자 생성
- **Authorization**: 불필요
- **권한**: 모든 사용자
- **Request Body**:

| 항목        | 타입   | 필수여부 | 비고       |
|-----------|--------|------|----------|
| userId    | string | 필수   | 사용자 아이디  |
| password  | string | 필수   | 사용자 비밀번호 |
| name      | string | 필수   | 사용자 이름   |
| reference | string | 선택   | 추천인 _id  |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "_id": "user._id",
        ...
      }
      ```

## 3. 토큰 갱신

- **URL**: `/refresh`
- **Method**: `POST`
- **설명**: Access Token 갱신
- **Authorization**: 필요 (Refresh Token 입력)
- **권한**: 모든 사용자

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "accessToken": "JWT",
        "refreshToken": "JWT"
      }
      ```
