import * as React from "react";
import { useState, useEffect } from "react"
import { Box, Components, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { VC, Profile } from "../../types";
import { IssueCredentialForm } from "./IssueCredentialForm";
import { DiscoButton } from "../DiscoButton";

// @NOTE: You will use this component to display the credential in the Review step
import { Credential } from "./Credential";

// @NOTE: You will use this async function from the Review step, and when it returns, this component should advance to the Success step
import { signVc } from "../../utils/";

// @NOTE: You will edit and use this component in the Success step
import { Success } from "../Success";
import { isWhiteSpaceLike } from "typescript";

export interface IssueCredentialFlowProps {
  issuer: string;
  recipient: Profile; // @NOTE: This prop contains information (name, profile image URL) about the recipient of the issued credential that you may use in the success step
  initialCredential: VC;
}



// C O M P O N E N T
export const IssueCredentialFlow = (props: IssueCredentialFlowProps) => {
  
  // S T A T E
  const [compState, setCompState] = useState({
    management: {
      instantiation: {
        keys: ["INFO_ENTRY", "INFO_REVIEW", "SUBMIT_SAVE_AND_APPRECIATE"],
        activeView: "",
      },
    },
  });
  const [activatedStep, setActivatedStep] = useState("INFO_ENTRY");
  const [cred, setCred] = useState(props.initialCredential);
  const [recipient, setRecipient] = useState(props.recipient)
  const [loading, setLoading] = useState(false);

  // S H O R T C U T S
  const CSI = compState.management.instantiation;

  // C O N S T A N T S
  const instanceDetails = {
    infoEntry: {
      body: (
        <Box sx={{ width: "90%", maxWidth: "333px" }}>
          <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "800" }}>Issue Disco Dancer Credential</Typography>

          <Typography variant="body2" sx={{ marginBottom: "24px", color: "darkGrey", fontSize: "13px", fontWeight: "400" }}>
            Fill out the credential details
          </Typography>

          <div id="issueCredentialFormContainer" style={{ marginBottom: 3 }}>
            <IssueCredentialForm cred={cred} onChange={setCred} />
          </div>

          <DiscoButton
            startIcon={loading ? <CircularProgress size={20} sx={{color: "darkGrey"}}/> : false}
            sx={{ width: "100%" }}
            // onClick={() => console.log("clicked! VC:", cred, "recipient:", props.recipient)}
            onClick={() => setActivatedStep("INFO_REVIEW")}
          >
            Review
          </DiscoButton>
        </Box>
      ),
      submitButton: "Review",
    },
    infoReview: {
      body: (
        <Box sx={{ width: "90%", maxWidth: "333px" }}>
          <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "800" }}>Review Credential</Typography>

          <Typography variant="body2" sx={{ marginBottom: "24px", color: "darkGrey", fontSize: "13px", fontWeight: "400"  }}>
            Make sure all the information is correct
          </Typography>

          <div id="credentialContainer" style={{ marginBottom: "22.2px" }}>
            <Credential cred={cred} />
          </div>

          <DiscoButton
            startIcon={loading ? <CircularProgress size={20} sx={{color: "darkGrey"}}/> : false}
            sx={{ width: "100%" }}
            // onClick={() => console.log("clicked! VC:", cred, "recipient:", props.recipient)}
            onClick={() => setActivatedStep("SUBMIT_SAVE_AND_APPRECIATE")}
          >
            Submit
          </DiscoButton>
        </Box>
      ),
    },
    submitSaveAndAppreciate: {
      body: (
        <Box sx={{ width: "90%", maxWidth: "333px" }}>
          <Success cred={cred} recipient={recipient} />
        </Box>
      ),
    },
  };

  // F U N C T I O N S
  const rejectNewActivatedStep = (rejectedActivatedStep: string) => {
    console.log(
      `VIEW: '${rejectedActivatedStep}' was rejected as a step. Make sure 'CSI.keys' and handleUpdateView() cases are up to date.`,
    );
    setActivatedStep(CSI.activeView);
    console.log(activatedStep);
  };
  const updateActiveView = (approvedNewStep: string) => {
    setCompState(() => ({
      ...compState,
      management: {
        ...compState.management,
        instantiation: {
          ...compState.management.instantiation,
          activeView: approvedNewStep
        }
      }
    }))
  };
  const handleCredentialSubmission = (newActivatedStep: string) => {
    signVc(cred);
    setTimeout(() => {
      updateActiveView(newActivatedStep);
      setLoading(false);
    }, 1500);
  };
  const handleNewActivatedStep = (newActivatedStep: string) => {
    // b a s i c   i n s t a n c e   n a v i g a t i o n
    // newView==="SUBMIT_SAVE_AND_APPRECIATE" 
    // ? handleCredentialSubmission(newView) 
    // : updateActiveView(newView)
    // s p e c i f i c   i n s t a n c e   n a v i g a t i o n
    switch (newActivatedStep) {
      case "INFO_ENTRY": {
        updateActiveView(newActivatedStep)
        setLoading(false)
        break
      }; case "INFO_REVIEW": {
        // @NOTE: insert filter for kudos being filled out or not before switching view
        updateActiveView(newActivatedStep)
        setLoading(false)
        break
      }; case "SUBMIT_SAVE_AND_APPRECIATE": {
        handleCredentialSubmission(newActivatedStep)
        break
      } default: rejectNewActivatedStep(newActivatedStep)
    }
  };


  // E F F E C T S
  useEffect(() => {
    // s e t u p
    setLoading(true);
    // e l l a b o r a t i o n
    handleNewActivatedStep(activatedStep);
    // w r a p  u p
  }, [ activatedStep !== CSI.activeView ]);

  // R E T U R N
  return (
    <div style={{ width: "90%", maxWidth: "333px", padding: "48px 0px", display: "flex", justifyContent: "center", alignItems: "center", color: "lightGrey", backgroundColor: "#0d1117" }}>
      {CSI.activeView === "INFO_ENTRY" ? instanceDetails.infoEntry.body : null}
      {CSI.activeView === "INFO_REVIEW" ? instanceDetails.infoReview.body : null}
      {CSI.activeView === "SUBMIT_SAVE_AND_APPRECIATE" ? instanceDetails.submitSaveAndAppreciate.body : null}
    </div>
  );
};
