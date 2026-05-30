import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>TI Engineer</h4>
                <h5>CELL N SOFT TELECOM PRIVET LIMITED</h5>
              </div>
              <h3>2017</h3>
            </div>
            <p>
              Commissioned telecom infrastructure and configured specialized hardware (BTS, load cells), managing strategic site surveys and field documentation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cell Leader</h4>
                <h5>Molex india Pvt. Ltd.</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
            Operated advanced automated machinery and executed precision soldering and testing to optimize manufacturing workflows and ensure zero-defect electrical assemblies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Team Lead</h4>
                <h5>Elunico IT Solutins</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Optimized automated wire processing, precision soldering, and quality testing to ensure zero-defect manufacturing workflows.
            </p>
          </div>
           <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IOT& Calibration Engineer</h4>
                <h5>Electro Meter Corporation</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Led embedded IoT firmware development and executed NABL-compliant industrial instrument calibrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
