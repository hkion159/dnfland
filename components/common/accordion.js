const Accordion = () => {
  return (
    <div className="accordion" id="accordionExample">
      {/* 11111111111111 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            여긴 무슨 사이트인가요?
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              던파랜드는 던전앤파이터의 캐릭터 정보를 쉽고 빠르게 조회하는
              사이트입니다.
            </strong>
            <br />
            <br /> 카카오 로그인과 모험단 등록을 통해 자신의 모험단을 등록하면
            어디서든 자신의 캐릭터에 접근할 수 있습니다.
            <br />
            현재 사이트에 여러 기능을 추가 중에 있으며 데미지 로직은 12월 안에
            전직업 구현될 예정입니다.
          </div>
        </div>
      </div>
      {/* 22222222222222 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            캐릭터 데미지가 안 나와요!
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              캐릭터 데미지 로직 구현은 12월 안에 완성될 예정입니다.
            </strong>{' '}
            <br />
            <br />
            던오프, 던담의 이론적이고 비현실적인 데미지 계산과 다르게 실전에
            가까운 계산을 구현하고자 노력하고 있습니다.
            <br />
            그래서 전직업 데미지 계산 로직 완성까지 시간이 다소 걸릴 것
            같습니다.
          </div>
        </div>
      </div>
      {/* 33333333333333 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            모바일은 지원 안 되나요?
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              데미지 계산 로직 구현 후에 모바일 화면을 고려한 반응형 웹을 손볼
              예정입니다.
            </strong>
            <br />
            <br /> 현재 던파랜드는 데스크탑 모니터 사이즈를 기준으로 제작되어
            있습니다.
            <br />
            모바일 사이즈 전용 반응형 레이아웃 구성은 추후 적용될 예정입니다.
            <br /> 모바일 사이즈 웹이 완성되면 전용 애플리케이션도 제작할
            계획입니다.
          </div>
        </div>
      </div>
      {/* 44444444444444 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFour">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="true"
            aria-controls="collapseFour"
          >
            로그인은 카카오만 가능하나요?
          </button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              일부러 로그인을 단순화하려고 카카오만 이용하고 있습니다.
            </strong>
            <br />
            <br />
            만약 네이버, 구글 등 다른 아이디 로그인도 만들어달라는 요청이 많으면
            만들어드리겠습니다.
            <br />
            만드는건 5분도 걸리지 않으니 필요하시면 한 줄 건의하기로
            요청해주세요.
          </div>
        </div>
      </div>
      {/* 55555555555555 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFive">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="true"
            aria-controls="collapseFive"
          >
            다크모드는 없나요?
          </button>
        </h2>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              다크모드도 데미지 계산 로직 구현이 끝나면 바로 만들 계획입니다.
            </strong>
            <br />
            <br /> 그리고 로그인 후 개인 설정에 다크모드 기본적용 여부도 넣을
            계획입니다.
          </div>
        </div>
      </div>
      {/* 66666666666666 */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingSix">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSix"
            aria-expanded="true"
            aria-controls="collapseSix"
          >
            여기 사이트가 던옾이랑 던담과의 차별점이 뭔가요?
          </button>
        </h2>
        <div
          id="collapseSix"
          className="accordion-collapse collapse"
          aria-labelledby="headingSix"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              최신 웹 기술을 이용해서 만들었습니다. 그리고 이론적이고 비현실적인
              데미지 계산을 지양하고 가장 실전에 가까운 데미지를 계산하기 위해
              노력하고 있습니다. 또한 건의사항을 접수받고 자주 사이트를
              업데이트하며 신기능을 꾸준히 추가해나갈 예정입니다.
            </strong>
            <br />
            <br /> 기술 스택은 아래와 같습니다. 관심 있으시면 한 번 찾아보세요.
            <br /> HTML/CSS/Javascript, React.js, Next.js, Redux,
            next-redux-cookie-wrapper, next-auth, prisma, aws rds, bootstrap,
            popper, toastui editor, git
            <br /> 초기 사이트 접속 시에 로딩 시간이 좀 걸릴 수 있습니다. 서버
            위치 문제때문에 느린건데 곧 옮길 예정입니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
