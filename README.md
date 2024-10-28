# 노드커넥션 (node-connection)

## 1. 프로젝트 소개

### 1.1. 배경 및 필요성

전세 사기 수법이 점점 교묘해지고, 현재의 부동산 거래 시스템으로는 이를 완전히 방지하는 데 한계가 있다는 지적이 나오고 있다. 2023년 경찰청이 발표한 전세사기 검거 현황에 따르면, 총 2,188명이 전세 사기 혐의로 검거되었으며, 그중 부동산 권리관계 허위 고지 78명, 무권한 계약 49명이 검거되었다. 이러한 유형의 사기 수법들은 모두 임차인의 권리가 법적 보호를 받기 전후의 시간차를 악용하는 방식으로, 임차인에게 큰 피해를 준다.

부동산 권리관계 허위 고지는 임대인이 건물에 저당권이 설정되어 있거나 압류, 경매가 진행 중임에도 이를 숨기고 임차인과 계약을 체결하여 보증금을 편취하는 방식이다. 임차인은 이러한 숨겨진 권리 문제로 인해 계약 이후에 심각한 법적 분쟁에 휘말리게 될 위험이 있다.

또한, 실소유자 행세 및 무권한 계약은 부동산의 소유자가 아닌 사람이 관련 서류를 위조하여 자신을 마치 실권리자인 것처럼 속이고, 임차인과 계약을 체결한 후 보증금을 가로채는 방식이다. 이러한 경우 임차인은 실제 소유권자와 관계없는 사람과 계약을 맺었기 때문에, 나중에 보증금을 돌려받지 못할 가능성이 크다.

이와 같은 사기 수법은 시간차 전세사기와 깊은 연관이 있다. 근저당권은 접수 즉시 효력이 발생하지만, 임차인의 전입신고는 다음 날 0시부터 효력이 발생하는 등기 제도의 시간차를 악용하는 방식이다. 이로 인해 소유자가 전세계약 후 전입신고가 이루어지기 전에 부동산을 담보로 대출을 받거나 소유권을 이전하여, 임차인의 권리가 침해되는 상황이 발생할 수 있다.

경찰청 발표 자료에서 확인되듯이, 전세 사기 수법은 더욱 복잡해지고 있으며, 현재의 부동산 거래 및 등기 시스템으로는 이를 완벽하게 방지하는 데 한계가 있다. 이러한 문제를 해결하기 위해서는 법적 보호 장치의 보완과 함께, 새로운 기술을 통한 효율적이고 투명한 거래 시스템 구축이 필요하다.

### 1.2. 목표 및 주요 내용

본 과제에서는 급증하는 ‘시간차 전세 사기’와 같은 부동산 사기 수법 등 부동산 사기를 예방하기 위한 등기사항증명서 발급 시스템 구현을 목표로 한다. 등기사항증명서 등록 및 조회를 블록체인 상에서 진행하여 정보의 위·변조를 방지하고 전세 사기를 예방하여 보다 안전하고 투명한 부동산 거래 환경을 조성할 수 있을 것이다.

## 2. 상세 설계

### 2.1. 시스템 구성도

- **기술 스택**

![system-configuration](https://github.com/user-attachments/assets/a01fd80a-70ca-48d7-ac3c-a8424e0128ad)

- **서비스 흐름도**

![service-flow](https://github.com/user-attachments/assets/83db3c55-1949-4a40-bd72-ec2f6bc18b77)

### 2.2. 사용 기술

본 프로젝트 개발 환경은 다음과 같습니다.

- **Server Specifications**
  | **Category** | **Spec** |
  | ------------ | ------------------ |
  | OS | Ubuntu 20.04.6 LTS |
  | CPU | 4 vCPU Cores |
  | RAM | 6GB |
  | Storage | 400GB SSD |

- **Framework & Tools**
  | **Tool/Framework** | **Version** |
  | ------------------ | --------------------- |
  | Go | 1.19.1 |
  | Node.js | 20.16.0 |
  | Java | Amazon Correto 17.0.7 |
  | Docker | 27.3.1 |
  | Docker Compose | 2.29.7 |
  | Hyperledger Fabric | 2.5.9 |
  | React | 18.3.1 |
  | Next.js | 14.2.5 |
  | Spring Boot | 3.3.2 |
  | Swagger | 2.2.0 |
  | MySQL | 8.0.33 |

## 3. 설치 및 사용 방법

### 3.1. 프로젝트 클론

먼저 노드커넥션 프로젝트를 클론합니다.

```bash
$ git clone https://github.com/pnucse-capstone-2024/Capstone-2024-team-42
```

### 3.2. 하이퍼레저 패브릭 네트워크 실행

`node-connection` 은 자동화된 설치 스크립트를 제공합니다. 프로젝트 루트 위치에서 아래 명령어를 실행하면, 설치에 필요한 의존성을 확인 및 설치 이후 Hyperledger Fabric을 설치합니다.

```bash
$ bash node-connection.sh start
```

명령어 실행이 완료되면, shell의 rc 파일에 필요한 환경변수가 주입됩니다. `source {shell의 rc파일}` 을 실행하여 서비스 실행에 필요한 변수 설정을 완료해야 합니다.

### 3.3. 체인코드 배포

체인코드를 배포하기 위해서는, 먼저 2가지 체인코드를 컴파일해야 합니다. `/chain-code/` 위치에 있는 2가지 폴더에서 각각 아래 명령어를 실행하여 컴파일 해주세요. 체인코드명은 `registry`, `issuance` 입니다.

```bash
$ go mod init {체인코드명}
$ go get github.com/hyperledger/fabric-contract-api-go/contractapi
$ go mod vendor
```

이후 프로젝트 루트 위치에서 아래 명령어를 실행합니다.

```bash
$ bash deploy-code.sh -ccn {체인코드명} -ccp {체인코드위치} -ccv {버전}
```

- 만약 특정 채널에 설치할 경우, `-c {채널명}` 옵션을 추가하면 됩니다.
- collection config 를 추가하고 싶다면, `-cccg {collection config}` 옵션을 추가면 됩니다.

### 3.4. 피어 노드 추가

`node-connection` 에서는 Hyperledger Fabric의 PDC(Private Data Collection)을 사용합니다. 이를 위해서는 registry organization에 최소 2개 이상의 peer node를 필요로 합니다. 따라서 노드를 추가해야 합니다.

먼저, 새로운 노드를 위한 인증서를 RegistryMSP 에서 발급받습니다.

```bash
$ cd ./network/node-connection-network
$ ./organizations/fabric-ca/registerPeer1.sh
```

인증서가 발급되면, 새로운 노드를 위한 docker container를 실행합니다.

```bash
$ docker compose -f ./compose/docker/docker-compose-peer1.registry.yaml up -d
```

이후 채널에 참가합니다.

```bash
$ CORE_PEER_ADDRESS=localhost:8051 peer channel join -b ./channel-artifacts/busan-headquarters-office.block
```

채널 가입이 완료되면, 체인코드를 설치합니다.

```bash
$ CORE_PEER_ADDRESS=localhost:8051 peer lifecycle chaincode install issuance.tar.gz
$ CORE_PEER_ADDRESS=localhost:8051 peer lifecycle chaincode install registry.tar.gz
```

**참고) 채널 추가하기**

등기소가 추가될 경우, peer node 와 함께 등기소 채널도 개설해야 합니다. 프로젝트 루트 위치에서 아래 명령어를 실행하여 추가할 수 있습니다.

```bash
$ bash create-channel.sh -c {채널 이름} -rcv {registry 체인코드 버전} -icv {issuance 체인코드 버전}
```

### 3.5. Spring Boot

실행 전, 필요한 환경변수를 주입해야 합니다. 프로젝트 루트에 위치한 env.sh 파일에 추가합니다.

```bash
#!/bin/bash

# Fabric CA Admin Information
export CA_ADMIN_NAME=
export CA_ADMIN_PASSWORD=

# Other Fabric Variables
export CHANNEL_NAME=busan-headquarters-office

# JWE Secrets
export JWE_SALT=""
export JWE_SECRET=

export ROOT_MSP=RegistryMSP
export ROOT_NUMBER=
export ROOT_PASSWORD=
```

- `CA_ADMIN_NAME`: 앞서 실행한 하이퍼레저 패브릭의 CA admin 계정 아이디 입니다.
- `CA_ADMIN_PASSWORD`: 패브릭 CA admin 계정 비밀번호 입니다.
- `JWE_SALT`: JWE 토큰 디코드에 필요한 salt값 입니다.
- `JWE_SECRET`: JWE 토큰 디코드에 필요한 시크릿 값 입니다.
- `ROOT_NUMBER`: 관리자 아이디
- `ROOT_PASSWORD`: 관리자 비밀번호

이후 홈 위치에 있는 shell의 rc 파일 내용을 적용합니다.

```bash
$ source /home/{user}/{shell rc파일}
```

스프링 부트를 위한 환경변수 설정이 완료되었습니다. 참고로, 하이퍼레저 패브릭 네트워크를 실행하면 관련 환경변수는 `./hyperledger.config.sh` 에서 확인할 수 있습니다.

`env.sh` 와 `hyperledger.config.sh` 를 통해 환경변수 설정이 완료되면, gradle 빌드 및 실행합니다. 프로젝트 내에 node-connection-backend 폴더 내에서 아래 명령어를 실행합니다.

```bash
$ ./gradlew clean build -x test
$ nohup java -jar ./build/libs/node-connection-backend-0.0.1-SNAPSHOT.jar &
```

이후 로그는 아래 명령어를 통해 확인할 수 있습니다.

```bash
$ tail nohup.out
```

만약 도커로 실행하고자 한다면 `./node-connection-backend` 폴더 내에 `docker-compose-backend.yaml` 파일을 이용합니다. 프로젝트 루트 위치에서 아래 명령어를 실행합니다.

```bash
docker compose -f ./node-connection-backend/docker-compose-backend.yaml up -d
```

### 3.6. Frontend

필요한 환경변수를 설정하기 위해 `./node-connection-frontend` 폴더에 `.env` 파일을 생성해 아래 내용을 추가합니다.

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET={JWE 토큰 시크릿}
NEXT_PUBLIC_API_URL={API 서버 주소}
```

`./node-connection-frontend` 위치에서 아래 명령어를 이용하여 빌드 후 클라이언트를 실행합니다.

```bash
$ yarn build
$ yarn start
```

## 4. 소개 및 시연 영상

- **원본 저장소**

[node-connection-backend](https://github.com/node-connection/node-connection-backend.git)

[node-connection-frontend](https://github.com/node-connection/node-connection-frontend.git)

- **시연 영상**

[![2024년 전기 졸업과제 42 노드커넥션](http://img.youtube.com/vi/fMZuQmW3RKg/0.jpg)](https://www.youtube.com/watch?v=fMZuQmW3RKg)

## 5. 팀 소개

|                                                                         팀원                                                                         | 역할 소개                                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------- |
|     [<img src="https://github.com/blackhblee.png" width="150">](https://github.com/blackhblee) <br> **[이현빈](https://github.com/blackhblee)**      | - 과제 일정 관리 <br> - Frontend 개발 <br> - 웹 클라이언트 디자인                       |
|          [<img src="https://github.com/seokwns.png" width="150">](https://github.com/seokwns) <br> **[문석준](https://github.com/seokwns)**          | - Hyperledger 네트워크 구축 <br> - 서버 구축 및 서비스 배포 <br> - 체인코드 및 API 구현 |
| [<img src="https://github.com/teriyakki-jin.png" width="150">](https://github.com/teriyakki-jin) <br> **[진예규](https://github.com/teriyakki-jin)** | - Backend 서버 구축 및 유지 보수 <br> - API 구현 <br> - API 문서 자동화                 |
