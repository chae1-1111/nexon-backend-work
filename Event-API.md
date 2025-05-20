# Event API 문서

### BaseURL : http://localhost:3000/event

## 1. 이벤트 생성

- **URL**: `/event`
- **Method**: `POST`
- **설명**: 신규 이벤트 생성
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Body**:

| 항목          | 타입      | 필수여부 | 비고                                             |
|-------------|---------|------|------------------------------------------------|
| title       | string  | 필수   | 이벤트 제목                                         |
| description | string  | 필수   | 이벤트 설명                                         |
| startTime   | string  | 필수   | 이벤트 시작 일시                                      |
| endTime     | string  | 필수   | 이벤트 종료 일시                                      |
| type        | ENUM    | 필수   | 이벤트 종류 (ATTENDANCE, INVITING, QUEST)           |
| count       | number  | 필수   | 이벤트 조건 수량 (type이 ATTENDANCE, INVITING 인 경우 필수) |
| questId     | string  | 필수   | 이벤트 대상 퀘스트 _id (type이 QUEST 인 경우 필수)           |
| isActive    | boolean | 필수   | 이벤트 상태 (true 인 경우 활성화)                         |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "_id": "신규 생성된 이벤트의 _id",
        ...
      }
      ```

## 2. 이벤트 목록 조회

- **URL**: `/event`
- **Method**: `GET`
- **설명**: 생성되어있는 이벤트 목록 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목   | 타입     | 필수여부 | 비고                  |
|------|--------|------|---------------------|
| page | number | 선택   | 조회 페이지 (default: 1) |

- **Response**:
    - 성공 (200 OK):
      ```json
      [
        {
          "_id": "이벤트의 _id",
          "title": "이벤트 제목",
          ...
        },{
          "_id": "이벤트의 _id",
          "title": "이벤트 제목",
          ...
        }
      ]
      ```

## 3. 이벤트 상세 조회

- **URL**: `/event/detail`
- **Method**: `GET`
- **설명**: 생성되어있는 이벤트 상세 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목 | 타입     | 필수여부 | 비고            |
|----|--------|------|---------------|
| id | string | 필수   | 조회 대상 이벤트 _id |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "_id": "이벤트의 _id",
        "title": "이벤트 제목",
        ...
      }
      ```

## 4. 보상 생성

- **URL**: `/reward`
- **Method**: `POST`
- **설명**: 신규 보상 생성
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Body**:

| 항목     | 타입     | 필수여부 | 비고                                 |
|--------|--------|------|------------------------------------|
| type   | ENUM   | 필수   | 보상 종류 (POINT, ITEM)                |
| amount | number | 필수   | 지급 수량                              |
| itemId | string | 선택   | 지급 대상 아이템 _id (type이 ITEM 인 경우 필수) |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "_id": "신규 생성된 보상의 _id",
        ...
      }
      ```

## 5. 보상 목록 조회

- **URL**: `/reward`
- **Method**: `GET`
- **설명**: 생성되어있는 보상 목록 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목   | 타입     | 필수여부 | 비고                  |
|------|--------|------|---------------------|
| page | number | 선택   | 조회 페이지 (default: 1) |

- **Response**:
    - 성공 (200 OK):
      ```json
      [
        {
          "_id": "보상의 _id",
          "title": "보상 제목",
          ...
        },{
          "_id": "보상의 _id",
          "title": "보상 제목",
          ...
        }
      ]
      ```

## 6. 보상 상세 조회

- **URL**: `/reward/detail`
- **Method**: `GET`
- **설명**: 생성되어있는 보상 상세 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목 | 타입     | 필수여부 | 비고           |
|----|--------|------|--------------|
| id | string | 필수   | 조회 대상 보상 _id |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "_id": "보상 _id",
        "title": "보상 제목",
        ...
      }
      ```

## 7. 이벤트 보상 목록 수정

- **URL**: `/event/reward`
- **Method**: `PATCH`
- **설명**: 이벤트에 보상 등록
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Body**:

| 항목         | 타입       | 필수여부 | 비고        |
|------------|----------|------|-----------|
| eventId    | string   | 필수   | 대상 이벤트    |
| rewardList | string[] | 필수   | 등록할 보상 목록 |

- **Response**:
    - 성공 (200 OK):

## 8. 이벤트 보상 요청

- **URL**: `/event/complete`
- **Method**: `POST`
- **설명**: 이벤트 보상 요청
- **Authorization**: 필요
- **권한**: USER
- **Request Body**:

| 항목      | 타입     | 필수여부 | 비고     |
|---------|--------|------|--------|
| eventId | string | 필수   | 대상 이벤트 |

- **Response**:
    - 성공 (200 OK):

## 9. 이벤트 보상 내역 조회

- **URL**: `/event/complete`
- **Method**: `GET`
- **설명**: 이벤트 보상 요청
- **Authorization**: 필요
- **권한**: USER
- **Request Query**:

| 항목     | 타입     | 필수여부 | 비고                                 |
|--------|--------|------|------------------------------------|
| page   | number | 선택   | 조회 페이지 (default: 1)                |
| userId | string | 선택   | 조회 대상 사용자 _id (USER에서는 입력해도 동작 없음) |

- **Response**:
    - 성공 (200 OK):


## 10. 아이템 목록 조회

- **URL**: `/item`
- **Method**: `GET`
- **설명**: 생성되어있는 아이템 목록 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목   | 타입     | 필수여부 | 비고                  |
|------|--------|------|---------------------|
| page | number | 선택   | 조회 페이지 (default: 1) |

- **Response**:
    - 성공 (200 OK):
      ```json
      [
        {
          "_id": "아이템 _id",
          "title": "아이템 제목",
          ...
        },{
          "_id": "아이템 _id",
          "title": "아이템 제목",
          ...
        }
      ]
      ```

## 11. 아이템 상세 조회

- **URL**: `/item/detail`
- **Method**: `GET`
- **설명**: 생성되어있는 아이템 상세 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목 | 타입     | 필수여부 | 비고           |
|----|--------|------|--------------|
| id | string | 필수   | 조회 대상 아이템 _id |

- **Response**:
    - 성공 (200 OK):
      ```json
      {
        "_id": "아이템 _id",
        "title": "아이템 제목",
        ...
      }
      ```

## 12. 퀘스트 목록 조회

- **URL**: `/quest`
- **Method**: `GET`
- **설명**: 생성되어있는 퀘스트 목록 조회
- **Authorization**: 필요
- **권한**: ADMIN, OPERATOR
- **Request Query**:

| 항목   | 타입     | 필수여부 | 비고                  |
|------|--------|------|---------------------|
| page | number | 선택   | 조회 페이지 (default: 1) |

- **Response**:
    - 성공 (200 OK):
      ```json
      [
        {
          "_id": "퀘스트 _id",
          "title": "퀘스트 제목",
          ...
        },{
          "_id": "퀘스트 _id",
          "title": "퀘스트 제목",
          ...
        }
      ]
      ```

## 13. 퀘스트 완료

- **URL**: `/quest/history`
- **Method**: `POST`
- **설명**: 퀘스트 완료 시 내역 등록
- **Authorization**: 필요
- **권한**: USER
- **Request Body**:

| 항목      | 타입     | 필수여부 | 비고     |
|---------|--------|------|--------|
| eventId | string | 필수   | 대상 이벤트 |

- **Response**:
    - 성공 (200 OK):

## 9. 이벤트 보상 내역 조회

- **URL**: `/event/complete`
- **Method**: `GET`
- **설명**: 이벤트 보상 요청
- **Authorization**: 필요
- **권한**: USER
- **Request Query**:

| 항목     | 타입     | 필수여부 | 비고                                 |
|--------|--------|------|------------------------------------|
| page   | number | 선택   | 조회 페이지 (default: 1)                |
| userId | string | 선택   | 조회 대상 사용자 _id (USER에서는 입력해도 동작 없음) |

- **Response**:
    - 성공 (200 OK):
