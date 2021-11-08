const Skill = ({ skill }) => {
  return (
    <div className="container text-start">
      {skill.active.map((skill, index) => (
        <div key={index} className="row">
          <div className="col d-flex px-3 align-items-center">
            <div>{skill.requiredLevel}</div>
            <div className="ms-3">{skill.name}</div>
            <div className="ms-auto">{skill.level}</div>
          </div>
          <hr className="m-0" />
        </div>
      ))}
    </div>
  );
};

export default Skill;
