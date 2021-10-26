## 던파랜드 소개

던파랜드는 던전앤파이터의 캐릭터 정보를 쉽고 빠르게 조회하는 사이트입니다.

캐릭터들을 모험단 단위의 그룹으로 검색하면 많은 캐릭터들에 동시에 접근할 수 있습니다.

카카오 로그인 후 모험단을 등록하면 어디서든 자신의 캐릭터들을 조회할 수 있습니다.

## 사이트 링크

Vercel 배포 주소: https://dnf.land

AWS Cloudfront 배포 주소: https://d3gnzc2owds3id.cloudfront.net/

## 프론트엔드 프로젝트

누구나 쉽게 하는 클론코딩 프로젝트를 하지 않습니다.

프론트엔드 직무 역량을 강화하기 위해 실제 개발 과정을 직접 경험했습니다.

오로지 혼자만의 힘으로 프로젝트를 수행했고 리액트 책 외엔 모두 원어로 적힌 공식 문서와 구글 검색을 보면서 했습니다.

그 과정에서 마주했던 문제점과 직접 해결한 과정을 아래에 서술합니다.

## 문제 및 해결 과정

- **문제 1: bootstrap navbar 내부 컴포넌트들의 좌측, 정중앙, 우측 배치가 의도대로 되지 않고 어긋남**

  - 시도 1: 모든 컴포넌트를 담는 전체 크기의 div를 만들고 justify-content-between을 적용하여 정중앙을 기준으로 간격을 두게 하고자 했습니다.
    - 실패 원인: navbar는 기본적으로 반응형으로 설계되었고 브라우저 너비가 작을 땐 컴포넌트의 일부가 collapse되도록 설계되어 있었습니다. 그래서 일부 컴포넌트들만 div로 감싸여있어서 justify-content-between을 적용하기에 컴포넌트 구분이 불명확하고 복잡했습니다.
   
  - 시도 2: 검사를 통해 각 컴포넌트가 flex-item인 것을 확인하고 margin-left, margin-right를 auto로 설정하여 왼쪽, 오른쪽 끝으로 밀착시키고자 했습니다.
    - 실패 원인: flex-item의 margin을 이용한 배치는 왼쪽과 오른쪽만 고려하여 설계된 것이었습니다. 그래서 navbar의 정중앙에 위치시키고자 했던 컴포넌트가 화면 정중앙이 아니라 빈 공간의 중앙에 위치하면서 중앙에서 치우치게 되었습니다.
    
  - 시도 3: 좌측, 정중앙, 우측에 배치시킬 컴포넌트들끼리 div로 감싸고 flex를 적용한 뒤 그 안에서 각자 세부 배치를 조정했습니다.
    - 성공: 전체 영역을 같은 크기로 3등분한 div로 나누니 좌측, 정중앙, 우측에 잘 배치할 수 있었습니다.
    
  ![Screenshot_343](https://user-images.githubusercontent.com/59219773/137828142-a966997e-f253-4539-a497-61f327ef6476.png)
  ![Screenshot_344](https://user-images.githubusercontent.com/59219773/137828270-abb7063c-5184-4282-987e-d02c34458993.png)


- **문제 2: jsx문 안에 getServerSideProps에서 fetch한 데이터를 보이려 했으나 에러 메시지(객체는 리액트 child로서 유효하지 않다)를 마주침**

  - 시도 1: 데이터가 객체가 아닌데 객체라고 떠서 코드를 면밀하게 점검하고 콘솔에 로그를 찍어봤습니다.
    - 실패 원인: 코드엔 문제가 없었고 데이터가 기대한 데이터가 아니라 Promise 객체였습니다. async function이 리턴하는 것은 항상 Promise 객체라는 것을 알았습니다.
    
  - 시도 2: 코드에 await이 빠진 부분이 없는지 모두 점검했습니다.
    - 실패 원인: 문제는 fetch를 getServerSideProps에서 두 번 이상 호출했었던 점이었습니다.
    
  - 시도 3: 검색으로 Promise 객체를 반환하는 데이터 fetch를 할 땐 Promise.all 함수를 이용해야 모든 응답이 정상적으로 올 때까지 기다린다는 사실을 알았습니다.
    - 성공: 모든 데이터 fetch에 대해 응답을 기다리고 await 구문으로 그 후의 실행도 비동기적으로 처리되었습니다.


- **문제 3: next.js에서 제공하는 Image 요소에서 에러를 발생시킴**

  - 시도 1: next.js의 공식 문서의 next/Image API를 정독했습니다.
    - 성공: next.js의 Image 요소가 가리키는 src가 외부 사이트면 보안 공격을 막기 위해 next.config.js에 도메인을 적어줘야 한다는 것을 알았습니다.
    
  ![Screenshot_345](https://user-images.githubusercontent.com/59219773/137830116-ebb32908-f109-4398-aea0-398f66993296.png)


- **문제 4: jsx 컴포넌트를 변수에 저장하고 꺼내 쓰려 했지만 에러가 발생함**

  - 시도 1: 콘솔에 로그를 찍어 차이를 확인한 결과 타입 속성이 달라짐을 확인했습니다.
    - 실패 원인: jsx가 변수에 저장될 때와 즉시 렌더될 때의 속성이 달라지는 것으로 추정합니다.
  
  - 시도 2: 검색 결과는 얻지 못했지만 컴포넌트를 변수에 저장하는 사용법이 잘못된 것이라고 추정했습니다.
    - 성공: 이제 변수에 저장하지 않고 항상 바로 import 해와서 jsx 안에 작성합니다.


- **문제 5: 이미지 a 요소가 이미지 밑에 의도하지 않은 여백을 만듦**

  - 시도 1: 검색 결과가 충분히 많아서 display를 block으로 바꾸는 등 방안들을 모두 적용해봤습니다.
    - 실패 원인: next.js에선 a를 Link로 감싸는데 이때문인지 문제의 원인인 a를 수정해도 어떠한 변화도 발생하지 않았습니다.
  
  - 시도 2: next.js에서의 문제 해결 방안을 찾을 수 없어서 위에도 같은 크기의 여백을 만들어 줌으로써 세로 가운데 정렬을 만들었습니다.
    - 성공: 세로 가운데 정렬은 잘 되지만 문제의 근본을 해결하진 못해서 아쉬움이 남습니다.
  
  ![Screenshot_347](https://user-images.githubusercontent.com/59219773/138812352-89d242ba-7901-4667-acef-279f7f092638.png)
  ![Screenshot_348](https://user-images.githubusercontent.com/59219773/138812369-479bb2b7-ffc6-4130-af00-df43862d3e6e.png)
  ![Screenshot_349](https://user-images.githubusercontent.com/59219773/138812455-e29448ea-94ef-4387-80e4-fb78936c0209.png)


- **문제 6: popper를 이용한 popover의 위치와 화살표가 어긋남**

  - 시도 1: 공식 문서를 정독하고 코드의 오타를 검증하는 등 문제의 원인을 찾아 헤맸습니다.
    - 실패 원인: 공식 문서엔 일반 자바스크립트 html, css를 기준으로 설명되어 있어서 리액트와 차이가 있었습니다.

  - 시도 2: 일반 자바스크립트는 display를 통해 popover를 보이고 감춥니다. 리액트만의 jsx 문법 특징인 jsx문 내에서의 조건문을 활용하여 popover를 보일지 결정하게 했습니다.
    - 성공: 리액트의 특별한 렌더링 방식때문에 정적으로 위치를 결정하는 popover가 제 위치에 렌더링되지 못했던 것이었습니다.
  ![Screenshot_350](https://user-images.githubusercontent.com/59219773/138812590-0f55bbae-06f1-4489-9d1a-966ab8cdd257.png)
  
  ![Screenshot_351](https://user-images.githubusercontent.com/59219773/138812612-e967d8fa-f249-4755-af0e-332bb0d834d7.png)



- **문제 7: Next.js의 getServerSideProps 함수 내에서 redux의 state를 제대로 가져오지 못함**

  - 시도 1: Next.js의 공식 문서를 수 회 반복해서 정독하고 검색하며 시간을 쏟아 부었습니다.
    - 실패 원인: 검색 결과 게시글과 스택오버플로우마다 해결 방법이 다 달랐습니다. 시간에 따라 라이브러리가 업데이트되면서 문법도 달라졌기 때문이었습니다.

  - 시도 2: next-redux-wrapper의 적용 방식이 버전업되면서 달라졌었고 공식 문서에서 새로운 방식을 보고 적용했습니다.
    - 성공: 대부분의 글들이 예전 버전을 기준으로 설명했지만 제가 설치한 것은 최신 버전이었기에 문법에 차이가 있었습니다.


- **문제 8: redux state가 다른 페이지로 이동할 때마다 초기화 됨**

  - 시도 1: 초기화시키는 액션을 작성했는지 코드를 모두 꼼꼼히 살펴보고, 페이지 이동 전후 상태를 로그로 찍어보고, next의 router.push 함수가 원래 상태를 초기화시키는건지 공식 문서를 정독하고 검색했습니다.
    - 실패 원인: 위의 시도들은 문제의 원인이 아니었습니다.

  - 시도 2: 계속되는 검색 중에 next-redux-wrapper가 페이지 이동 시마다 클라이언트에서 생성하는 스토어를 서버의 스토어와 합친다는 것을 알게 되었습니다. 그것이 HYDRATE라는 액션이고 리듀서의 상태는 클라이언트의 상태이고 액션의 payload가 서버의 상태임을 알았습니다. 그래서 HYDRATE 액션이 디스패치되면 클라이언트의 상태를 리턴하도록 했습니다.
    - 성공: 이제 페이지 이동 시에도 리덕스 상태가 유지되었습니다.


- **문제 9: getServerSideProps 함수 내에서 받은 리덕트 상태가 브라우저와 달리 항상 초기값임**

  - 시도 1: 상태 변경 액션이 잘 디스패치 된건지 확인하기 위해 콘솔에 로그를 찍고 다양한 테스트를 진행했습니다.
    - 실패 원인: 코드엔 문제가 없었고 상태는 잘 변경되었습니다.

  - 시도 2: 긴 시간 검색 끝에 상태는 클라이언트와 서버에 각각 따로 존재한다는 것을 알았습니다. 상태 변경 디스패치는 클라이언트의 상태만 변경시켰고 서버사이드렌더링 때의 상태는 서버의 상태를 받아왔습니다. 클라이언트와 서버의 상태를 합치는 방법을 검색했습니다.
    - 성공: 브라우저의 쿠키를 이용하면 클라이언트와 서버에 공유된 정보를 이용할 수 있다는 것을 알았습니다.


- **문제 10: 앱을 Vercel에 배포하고 실행했는데 속도가 개발 서버보다 훨씬 느려짐**

  - 시도 1: 코드 전체를 최적화가 안 된 부분이 있는지 검토했습니다.
    - 실패 원인: 속도 문제는 코드가 아니었습니다. 실제 웹의 속도는 아주 많은 요소들이 결정합니다.

  - 시도 2: 검색 결과 같은 문제를 겪었던 사람의 글을 발견했습니다. Vercel 서버가 서울에도 있는 것으로 알고 있었지만 무료 요금제를 쓰면 기본 서버 위치인 워싱턴에서 변경할 수 없다는 것을 알았습니다. 그래서 api 요청이 매우 느려지는 결과를 만들었던 것이었습니다.
    - 결과: aws lambda에 앱을 배포했지만 도메인 이전은 60일이 경과되어야 가능해서 하지 못했습니다.


## 느낀 점

ㅁㄴㅇㄹ
