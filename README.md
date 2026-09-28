# 09. 풍력발전소 3D 설비 모니터링 및 진단 시스템

## 프로젝트명
풍력발전소 3D 설비 모니터링 및 진단 시스템

## 수행 시기
2024년

## 프로젝트 소개
풍력발전기의 운전·계측·진단 데이터를 웹에서 통합 모니터링하기 위한 시스템.

기존 풍력발전 시스템에서 생성되는 설비 데이터를 Backend와 연동하고, Blade, Pitch, Nacelle, Gearbox, Generator, Yaw 등 주요 설비의 상태를 Three.js 기반 3D 모델과 D3.js 차트를 통해 확인할 수 있도록 개발하였다.

풍력발전 원천 Database와 웹 서비스용 Database를 각각 연결하고, 설비별 Stored Procedure를 통해 화면에서 필요한 계측·진단 데이터를 조회하는 구조로 구성하였다.

Frontend, Backend, Database 및 데이터 시각화 시스템 전반을 단독으로 개발하였다.

---

## 주요 기술

- Vue.js 3
- JavaScript
- Vite
- Node.js
- Express
- MariaDB / MySQL
- Stored Procedure
- Three.js
- GLB / GLTF
- D3.js
- Axios
- Vuex
- Redis
- JWT
- XLSX
- GeoJSON
- Turf.js

---

## 주요 기능

### 풍력발전기 3D 모니터링

Three.js를 이용하여 풍력발전기 3D 모델을 웹에서 렌더링하고 설비정보와 연결하였다.

- GLB 기반 풍력발전기 3D 모델 로딩
- WebGLRenderer 기반 3D 렌더링
- OrbitControls를 이용한 모델 탐색
- HDR 환경 적용
- 조명 및 Shadow 처리
- 설비별 위치 및 데이터 연결
- 3D 모델과 설비 상태정보 연동
- 3D 리소스 로딩 상태 처리
- 3D 리소스 해제 및 메모리 관리
- HDR 관련 리소스 캐싱

실제 서비스에서 수십 MB 규모의 풍력발전기 GLB 모델을 웹 환경에서 로딩하여 사용하였다.

---

### 설비별 상태 모니터링

풍력발전기의 주요 구성요소별 데이터를 분리하여 모니터링할 수 있도록 구성하였다.

- Blade
- Pitch
- Nacelle / Tower
- Drive Train
- Gearbox
- Generator
- Yaw

각 설비의 계측값과 진단 결과를 별도의 Overview 및 Diagnosis 화면과 차트를 통해 확인할 수 있도록 구현하였다.

---

### 풍력발전 계측 데이터

SCADA 및 설비별 원천 데이터를 연동하여 다양한 풍력발전기 상태정보를 제공하였다.

주요 데이터:

- 풍속 / 풍향
- 발전량
- 활성전력 / 무효전력
- Rotor Speed
- Generator Speed
- Blade Angle
- Bearing Temperature
- Gearbox Temperature
- Generator Temperature
- Nacelle Temperature
- 진동 가속도
- 진동 속도
- Torque
- Bending Moment

---

### 설비 진단 및 예측 데이터

단순한 센서 측정값뿐 아니라 기존 풍력 시스템에서 생성되는 진단 및 예측 결과를 웹에서 확인할 수 있도록 구현하였다.

- 실제 측정값
- 예측값
- 측정값과 예측값의 편차
- 진동 RMS
- Alert Level
- Alarm Level
- 설계수명
- 예상수명
- 잔여수명 관련 정보
- Health Index

이를 통해 단순 계측 데이터 모니터링뿐 아니라 설비의 상태 및 진단 결과를 함께 확인할 수 있도록 구성하였다.

---

### 설비별 진단

설비별 특성에 맞게 별도의 Stored Procedure와 Backend API를 구성하였다.

예:

- `SP_WT_DIAG_BLADE`
- `SP_WT_DIAG_GEARBOX`
- `SP_WT_DIAG_GENERATOR`
- `SP_WT_DIAG_YAW`
- `SP_WT_ALARM`

Blade, Gearbox, Generator, Yaw 등 설비마다 필요한 계측값과 진단 결과가 다르기 때문에 화면에서 필요한 데이터를 기준으로 조회 구조를 분리하였다.

---

## 다중 Database 연동

웹 서비스 자체 데이터와 기존 풍력발전 시스템의 원천 데이터를 각각 관리하기 위해 복수 Database Connection Pool을 구성하였다.

### Main Database

웹 서비스 운영에 필요한 데이터를 관리하였다.

- 사용자
- 사용자 권한
- 사용자별 Chart 설정
- Alarm Log
- 시스템 관련 데이터

### 풍력발전 원천 Database

기존 풍력발전 시스템에서 생성되는 계측 및 진단 데이터를 조회하였다.

- SCADA
- Blade
- Drive Train
- Gearbox
- Generator
- Tower
- 진단결과
- 예측결과
- Health Index
- RUL
- Alarm 데이터

Node.js Backend에서 각 Database Connection Pool을 별도로 관리하고 서비스 목적에 따라 필요한 데이터베이스를 조회하도록 구성하였다.

---

## Alarm 모니터링

설비의 진단결과 및 상태정보를 이용하여 Alarm 정보를 웹에서 확인할 수 있도록 구현하였다.

- 설비별 Alert / Alarm 상태
- Alarm 발생시간
- Alarm 메시지
- 설비별 Alarm 조회
- 기간별 Alarm 조회
- Alarm History
- 사용자별 Alarm 관련 상태관리

풍력발전 원천 시스템의 상태 데이터를 웹 서비스에서 사용할 수 있는 Alarm 정보로 제공하였다.

---

## History 모니터링

과거 설비 데이터를 시간 기준으로 조회하여 Chart로 확인할 수 있도록 구현하였다.

- 기간 선택
- 설비 선택
- 데이터 종류 선택
- 시계열 Chart
- 과거 계측 데이터 조회
- 진단 데이터 History

Database에서 조회한 시간 기준 데이터를 Frontend Chart에서 사용할 수 있는 형태로 변환하여 제공하였다.

---

## 데이터 시각화

Three.js 기반 3D 모델과 D3.js 기반 Chart를 함께 사용하여 풍력발전기 상태를 시각화하였다.

### Three.js
풍력발전기 전체 구조 및 주요 설비를 공간적으로 확인할 수 있도록 구성하였다.

### D3.js
설비의 시간별 계측 및 진단 데이터를 Chart 형태로 표현하였다.

주요 시각화 데이터:

- 센서 측정값
- 예측값
- 측정값과 예측값의 편차
- 설비 상태
- Health Index
- Alarm 정보
- 시계열 데이터

---

## 사용자별 Dashboard

사용자가 모니터링하고 싶은 설비 및 Chart를 선택할 수 있도록 사용자별 설정 기능을 구현하였다.

- 페이지별 Chart 설정
- 설비 그룹 선택
- Chart 활성화 여부
- Chart 표시 순서 및 상태관리
- 사용자별 Dashboard 설정 저장

사용자의 설정정보는 웹 서비스 Database에 저장하여 로그인 후 동일한 모니터링 환경을 사용할 수 있도록 구성하였다.

---

## 사용자 및 권한관리

웹 기반 관리 시스템을 위한 사용자 및 권한 기능을 구현하였다.

- 사용자 로그인
- 사용자 계정관리
- 사용자 등급 및 권한
- 비밀번호 변경
- 사용자별 Chart 설정
- JWT 기반 인증
- Redis 연동

---

## DB 설계 및 Stored Procedure

웹 서비스 운영을 위한 별도 DB 구조와 풍력발전 원천 Database 조회를 위한 Stored Procedure를 구성하였다.

### 웹 서비스 DB

- 사용자
- 사용자 권한
- Chart 설정
- Alarm Log
- Alarm 상태
- 시스템 관련 데이터

### Stored Procedure

- 로그인
- 사용자관리
- 사용자별 Chart 설정
- Alarm 조회 및 저장
- History 조회
- 설비별 최신 데이터 조회
- Blade 진단
- Gearbox 진단
- Generator 진단
- Yaw 진단
- 풍력발전기 전체 상태 조회

Frontend에서 필요한 데이터 구조를 기준으로 Backend와 Database 조회 구조를 구성하였다.

---

## 담당 업무

**서비스 전체 단독 개발**

### Frontend

- Vue.js 3 기반 Frontend 전체 개발
- 풍력발전 모니터링 Dashboard 개발
- 설비별 Overview 화면 개발
- 설비별 Diagnosis 화면 개발
- History 화면 개발
- Alarm 화면 개발
- 사용자 및 설정 화면 개발
- D3.js 기반 Chart 개발
- REST API 연동

### 3D Visualization

- Three.js 기반 풍력발전기 3D Viewer 개발
- GLB 모델 로딩
- 3D 모델과 설비정보 연결
- 카메라 및 사용자 Interaction 구현
- OrbitControls 적용
- 조명 및 HDR 환경 구성
- 모델 로딩 처리
- 3D 리소스 관리 및 해제

### Backend

- Node.js / Express Backend 전체 개발
- REST API 설계 및 구현
- 다중 Database 연결
- 풍력발전 원천 데이터 연동
- 사용자 및 권한관리
- Alarm 처리
- History 데이터 처리
- Frontend용 데이터 변환
- JWT / Redis 기반 인증 및 상태관리

### Database

- 웹 서비스용 DB 설계
- 기존 풍력발전 원천 Database 구조 분석
- 설비별 Stored Procedure 구현
- 사용자별 Chart 설정 구조 설계
- Alarm Log 구조 설계
- Backend와 원천 Database 연동 구조 구현

---

## 프로젝트 내 역할

풍력발전기의 계측 및 진단 데이터를 웹에서 모니터링하기 위한 시스템을 단독으로 개발하였다.

Vue.js 3와 Three.js를 이용하여 풍력발전기 3D 모델과 실제 설비 데이터를 연결하고, D3.js 기반 Chart를 통해 Blade, Pitch, Nacelle, Gearbox, Generator, Yaw 등 주요 설비의 계측값, 진단값, 예측값 및 Health Index를 시각화하였다.

Backend에서는 Node.js / Express를 기반으로 웹 서비스 Database와 기존 풍력발전 원천 Database를 각각 연결하고, 설비 및 화면별 Stored Procedure를 통해 필요한 계측·진단 데이터를 조회하여 Frontend에 제공하는 구조를 구현하였다.

또한 사용자별 모니터링 Chart 설정, 설비별 Alarm 및 History 조회, 사용자 및 권한관리 등 웹 기반 풍력발전 모니터링 시스템 전반을 개발하였다.
