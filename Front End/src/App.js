import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      isLoading: true,
      controls: [],
      q0: "",
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
    };
  }

  //pull all data from back end
  callAPI = () => {
    fetch("http://localhost:9000/get-all-controls")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ apiResponse: res, isLoading: false });
      });
  };

  componentDidMount() {
    this.callAPI();
  }

  updateControls = () => {
    const { q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, apiResponse } =
      this.state;
    let controls = [];
    let systemCategory = [q0, q1, q2]
      .map((question, index) => {
        if (question === "low") {
          return 0;
        } else if (question === "moderate") {
          return 1;
        } else {
          return 2;
        }
      })
      .sort()[2];
    if (q3 === "yes") {
      systemCategory = 2;
    }
    if (q4 === "yes") {
      systemCategory = 2;
    }
    console.log(systemCategory);
    if (q5 !== "" && q5 !== "cots") {
      if (systemCategory === 1 || systemCategory === 2) {
        const sa11 = apiResponse.data.find((control) => control.number === 705);
        controls.push(sa11);
        console.log(controls);
      }
    }
    if (q6 !== "" && q6 !== "on-prem") {
      const ia2 = apiResponse.data.find((control) => control.number === 334);
      const ra5 = apiResponse.data.find((control) => control.number === 621);
      controls.push(ia2, ra5);
      console.log(controls);
    }
    if (q6 !== "" && q6 !== "on-prem") {
      if (systemCategory === 2) {
        const ia25 = apiResponse.data.find((control) => control.number === 337);
        controls.push(ia25);
        console.log(controls);
      }
    }
    if (q6 !== "" && q6 !== "on-prem") {
      if (systemCategory === 1 || systemCategory === 2) {
        const ra55 = apiResponse.data.find((control) => control.number === 625);
        controls.push(ra55);
        console.log(controls);
      }
    }
    if (q7 !== "") {
      const at2 = apiResponse.data.find((control) => control.number === 133);
      const au2 = apiResponse.data.find((control) => control.number === 148);
      const ps3 = apiResponse.data.find((control) => control.number === 577);
      controls.push(at2, au2, ps3);
      console.log(controls);
    }
    if (q7 !== "") {
      if (systemCategory === 1 || systemCategory === 2) {
        const at23 = apiResponse.data.find((control) => control.number === 136);
        const ac5 = apiResponse.data.find((control) => control.number === 60);
        controls.push(at23, ac5);
      }
    }
    if (q7 !== "" && q7 !== "public") {
      if (systemCategory === 1 || systemCategory === 2) {
        const sc28 = apiResponse.data.find((control) => control.number === 828);
        controls.push(sc28);
      }
    }
    if (q8 !== "" && q8 !== "no") {
      const ps7 = apiResponse.data.find((control) => control.number === 589);
      const sa9 = apiResponse.data.find((control) => control.number === 688);
      controls.push(ps7, sa9);
    }
    if (q10 !== "" && q10 !== "yes") {
      const pm51 = apiResponse.data.find((control) => control.number === 543);
      controls.push(pm51);
    }

    this.setState({ controls });
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const { q9, controls } = this.state;
    return (
      <div className="App">
        <h1 className="App-header">System Characteristics Intake Form</h1>
        <h3>Please enter the best answer choices, related to your system.</h3>
        <div className="container">
          <label htmlFor="confidentiality-impact">
            What would be the organizational impact, based on loss of
            information confidentiality?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q0: e.target.value }, this.updateControls)
            }
            name="confidentiality"
            id="confidentiality-impact"
          >
            <option value="">--Please choose an option--</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>

          <label htmlFor="integrity-impact">
            What would be the organizational impact, based on loss of
            information integrity?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q1: e.target.value }, this.updateControls)
            }
            name="integrity"
            id="integrity-impact"
          >
            <option value="">--Please choose an option--</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>

          <label htmlFor="availability-impact">
            What would be the organizational impact, based on loss of system
            availability?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q2: e.target.value }, this.updateControls)
            }
            name="availability"
            id="availability"
          >
            <option value="">--Please choose an option--</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>

          <label htmlFor="regulatory-impact">
            Is involved information subject to regulatory impact (GxP, Privacy,
            HIPAA)?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q3: e.target.value }, this.updateControls)
            }
            name="regulatory"
            id="regulatory"
          >
            <option value="">--Please choose an option--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="medical-device">
            Does this system implementation involve a medical device or digital
            health-related application?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q4: e.target.value }, this.updateControls)
            }
            name="medical-device"
            id="medical-device"
          >
            <option value="">--Please choose an option--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="system-type">Which type of system is this?</label>

          <select
            onChange={(e) =>
              this.setState({ q5: e.target.value }, this.updateControls)
            }
            name="system-type"
            id="system-type"
          >
            <option value="">--Please choose an option--</option>
            <option value="cots">COTS (Commercial off the Shelf)</option>
            <option value="custom">Custom Developed</option>
            <option value="hybrid">
              Hybrid (Containing Both OOTB and Custom Components)
            </option>
          </select>

          <label htmlFor="system-location">Where is the system hosted?</label>

          <select
            onChange={(e) =>
              this.setState({ q6: e.target.value }, this.updateControls)
            }
            name="system-location"
            id="system-location"
          >
            <option value="">--Please choose an option--</option>
            <option value="on-prem">On Premises</option>
            <option value="vendor-hosted">Vendor-Hosted</option>
            <option value="hybrid">
              Hybrid (Containing Both On-Prem and Vendor-Hosted Components)
            </option>
          </select>

          <label htmlFor="info-classification">
            How is the involved information classified?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q7: e.target.value }, this.updateControls)
            }
            name="info-classification"
            id="info-classification"
          >
            <option value="">--Please choose an option--</option>
            <option value="public">Public</option>
            <option value="internal">Internal Use Only</option>
            <option value="confidential">Confidential</option>
            <option value="restricted">Restricted</option>
          </select>

          <label htmlFor="third-party">
            Is a third party provider involved (i.e. providing custom
            development, accessing or processing information, etc.)?
          </label>

          <select
            onChange={(e) =>
              this.setState({ q8: e.target.value }, this.updateControls)
            }
            name="third-party"
            id="third-party"
          >
            <option value="">--Please choose an option--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="personal-information">
            Does this system access, process, or host personal information?
          </label>

          <select
            onChange={(e) => this.setState({ q9: e.target.value })}
            name="personal-information"
            id="personal-information"
          >
            <option value="">--Please choose an option--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {q9 === "yes" && (
            <>
              <label htmlFor="de-identified">
                Is the personal information de-identified?
              </label>

              <select
                onChange={(e) =>
                  this.setState({ q10: e.target.value }, this.updateControls)
                }
                name="de-identified"
                id="de-identified"
              >
                <option value="">--Please choose an option--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </>
          )}

          <h3>
            Based on your selections, these are the controls you will need:{" "}
          </h3>
          <ul>
            {controls.map((control) => (
              <li key={control.control_identifier}>
                {control.control_identifier} - {control.control_name}{" "}
                <span className="hide-print">- {control.control_text}</span>
              </li>
            ))}
          </ul>
          {controls.length > 0 && (
            <div className="center">
              <button onClick={() => window.print()}>Print Controls</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
