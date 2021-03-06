# 스토리라인
## 광고주 입장
### 1. 웹페이지 접속
```
접속 화면은 로그인페이지임.
아이디/비밀번호 입력
틀릴경우 화면에 표시(무엇이 틀렸다고는 표시안함) 
성공할경우 메인페이지로 이동
```
### 2. 회원가입
```
로그인 페이지에서 회원가입 버튼 누름
이름, 이메일, 아이디 비밀번호, 사업자번호, 기업명, 
이메일 중복체크, 아이디, 비밀번호 유효성(복잡도) 검사
핸드폰인증 or 이메일인증 체크함
사업자 번호 인증
recaptcha 를 이용한 무분별한 회원가입 방지함
```
### 3. 마이페이지
```
티켓보유량, 충전버튼
회원정보 수정&회원탈퇴
```
### 4. 로그인
```
아이디, 비밀번호 입력
성공시 메인페이지
recaptcha 를 이용한 무분별한 로그인공격 방지
아이디/비밀번호 5회이상 틀릴시 몇분동안 로그인 제한함과
```
### 5. 광고등록
```
광고 등록 탭 표시
광고 등록 탭 클릭시 티켓이 1개 이상 없으면→ 티켓충전 알람 및 충전페이지 Form render /
광고 등록 탭 클릭시 티켓이 1개 이상 보유중→ 광고등록 Form render
화면에 광고제목, 미션조건, 이벤트참가자 수 제한, 광고상세내용, 상품, 이벤트 날짜 및 시간선택, 사진업로드, 설문조사 입력칸 표시
작성 완료후 등록버튼 클릭시 광고등록(승인대기 상태) 1티켓 차감 및 알람
```
### 6.광고관리(수정/재요청/마감)
```
광고 관리 탭 표시
광고 관리 탭 클릭시 광고등록한 게시물들 출력
하나의 광고 마다 각 광고 제목, 사진, 광고상태(대기/거절/마감/진행 등), {현재참가인원/최대참가가능인원}, 이벤트 날짜(시작/마감), 광고상세내용 표시
광고의 상태에 따른 버튼 출력 및 활성화(연장/수정/마감)
광고에 대한 수정은 연장으로써만 가능하게 함 	
```
### 7. 티켓구매
```
티켓충전 각 상품 표시 ex) 1개 → 1,200/ 10개 → 10,000 등
원하는 상품 선택 후 결제수단 선택 ex) 휴대폰결제, 계좌이체 등
상품 및 결제수단 선택완료 후 결제절차 완료 및 티켓 충전완료
충전 실패 및 취소시 구매실패 알람 및 결제 취소처리 실행함
```


### API 문서

| 구분     | URL            | Method | parameter                                                    | response                                                     |
| -------- | -------------- | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 회원가입 | /stamp/join    | post   | id, password,name,company_no,company_name, companyLocation, phoneNumber | result(B)                                                    |
| 로그인   | /stamp/login   | post   | id, password                                                 | result(B),admin(B),ticket                                    |
| 광고등록 | /stamp/mission | post   | user_id,title,missionUser,Num,content,tag,startDate,endDate,survey1,survey2,survey3,imageUpLoad,category,ticket | ticket                                                       |
| 광고관리 | /stamp/board   | get    | id,token,ticket                                              | user_id, title, missionUserNum, content, tag, startDate, endDate, survey1,survey2,survey3,imageUpLoad |
| 회원탈퇴 | /stamp/secede  | delete | id, password, name, company_no, company_name                 |                                                              |
| 회원수정 | /stamp/modify  | patch  | id, password, name, company_no, company_name                 |                                                              |
| 티켓충전 | /stamp/ticket  | post   | id, charge, method                                           |                                                              |

### DB

- users
  - id 
  - password
  - name
  - company_no
  - company_name
  - companyLocation
  - phoneNumber

- advertises
  - title
  - totalNumber
  - content
  - survey
  - startDate
  - endDate 
