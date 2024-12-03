import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Home";
import LogIn from "./logIn.js";
import CreateAccount from "./CreateAccount.js";
import SchedulingAppt from "./schedulingAppt.js";
import ViewMedHist from "./ViewMedHist.js";
import DocHome from "./DocHome.js";
import ViewOneHistory from "./ViewOneHistory.js";
import Settings from "./Settings.js";
import DocSettings from "./DocSettings.js";
import PatientsViewAppt from "./PatientsViewAppt.js";
import NoMedHistFound from "./NoMedHistFound.js";
import DocViewAppt from "./DocViewAppt.js";
import MakeDoc from "./MakeDoc.js";
import Diagnose from "./Diagnose.js";
import ShowDiagnoses from "./ShowDiagnoses.js";

export default function App() {
  const [component, setComponent] = useState(<LogIn />);

  useEffect(() => {
    fetch("https://project-tjlu.onrender.com/userInSession")
      .then((res) => res.json())
      .then((res) => {
        const { email, who } = res;
        if (email === "") {
          setComponent(<LogIn />);
        } else {
          if (who === "pat") {
            setComponent(<Home />);
          } else {
            setComponent(<DocHome />);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user session:", error);
        setComponent(<LogIn />);
      });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/NoMedHistFound" component={NoMedHistFound} />
          <Route exact path="/MakeDoc" component={MakeDoc} />
          <Route exact path="/Settings" component={Settings} />
          <Route exact path="/MedHistView" component={ViewMedHist} />
          <Route exact path="/scheduleAppt" component={SchedulingAppt} />
          <Route exact path="/showDiagnoses/:id" component={ShowDiagnoses} />
          <Route exact path="/Diagnose/:id" component={Diagnose} />
          <Route exact path="/ViewOneHistory/:email" component={ViewOneHistory} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/createAcc" component={CreateAccount} />
          <Route exact path="/DocHome" component={DocHome} />
          <Route exact path="/PatientsViewAppt" component={PatientsViewAppt} />
          <Route exact path="/DocSettings" component={DocSettings} />
          <Route exact path="/ApptList" component={DocViewAppt} />
          <Route exact path="/">
            {component}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
