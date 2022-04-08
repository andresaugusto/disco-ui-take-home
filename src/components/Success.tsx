import React from "react";
import { Box, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';

import { DiscoButton } from "./DiscoButton";
import { DiscoBox } from "./DiscoBox";
import { DiscoText } from "./DiscoText";

import { VC, Profile } from "../types";
import { truncateDid } from "../utils";

export const Success: React.FC<{ cred: VC, recipient: Profile }> = ({cred, recipient}) => {

  // console.log(EXAMPLE_CREDENTIAL)
  console.log(cred)
  console.log(recipient)

  const RECIPIENT = {
    avatarUrl: recipient?recipient.avatarUrl:"",
    did: recipient?recipient.did:cred.credentialSubject.id,
    name: recipient?recipient.name:"Disco Dancer"
  }

  return (
    <DiscoBox sx={{ padding: "2px", color: "white", borderRadius: "6px" }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "48px 16px", background: "rgba(58, 62, 64, 0)", borderRadius: "4px", filter: "invert(100)" }}
      >
        <Typography variant="h2" sx={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px" }}>
          <DiscoText>Nice!</DiscoText>
        </Typography>

        <Typography variant="h2" sx={{ marginBottom: "24px", color: "lightGrey", fontSize: "16px", fontWeight: "400" }}>
          Credential has been issued to:
        </Typography>

        <Avatar
          alt={RECIPIENT.name}
          src={RECIPIENT.avatarUrl}
          variant="square"
          sx={{ height: "120px", width: "120px", marginBottom: "12px", borderRadius: "4px", filter: "invert(100)" }}
        />
        <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "800" }}>
          {RECIPIENT.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{ marginBottom: "24px", color: "darkGrey", fontSize: "13px", fontWeight: "400" }}
        >
          {truncateDid(RECIPIENT.did)}
        </Typography>

        <Typography
          variant="body2"
          sx={{ marginBottom: "24px", color: "lightGrey", fontSize: "13px", fontWeight: "400", fontStyle: "italic" }}
        >
          "{cred.credentialSubject.kudos}"
        </Typography>

        <div id="issueCredentialFormContainer" style={{ marginBottom: 3 }}>
          {/* <IssueCredentialForm cred={cred} onChange={setCred} /> */}
        </div>

        <DiscoButton
          // startIcon={loading ? <CircularProgress size={20} sx={{color: "darkGrey"}}/> : false}
          sx={{ width: "100%" }}
          // onClick={() => console.log("clicked! VC:", cred, "recipient:", props.recipient)}
          // onClick={() => setActivatedStep("INFO_REVIEW")}
        >
          Close
        </DiscoButton>
      </Box>
    </DiscoBox>
  );
};
