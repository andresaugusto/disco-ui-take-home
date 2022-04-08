import * as React from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { withStyles } from '@material-ui/core/styles';

import { VC } from "../../types";

// C U S T O M  E L E M E N T S
const CustomTextField = withStyles({
  root: {
    "& label": {
      color: "grey",
    },
    "& input": {
      color: "grey",
    },
    "& label.Mui-focused": {
      color: "lightGrey",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: "lightGrey",
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "lightGrey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "lightGrey",
      },
    },
  },
})(TextField);



// C O M P O N E N T
export const IssueCredentialForm: React.FC<{ cred: VC; onChange(newValue: VC): void }> = ({ cred, onChange }) => {
  
  // R E T U R N
  return (
    <Box>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <CustomTextField
          type="required"
          label="Recipient DID"
          spellCheck={false}
          value={cred.credentialSubject?.id || ""}
          onChange={(e) =>
            onChange({
              ...cred,
              credentialSubject: {
                ...cred.credentialSubject,
                id: e.target.value,
              },
            })
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <CustomTextField
          variant="outlined"
          type="search"
          placeholder="Your kudos here!"
          value={cred.credentialSubject?.kudos || ""}
          onChange={(e) =>
            onChange({
              ...cred,
              credentialSubject: {
                ...cred.credentialSubject,
                kudos: e.target.value,
              },
            })
          }
        />
      </FormControl>
    </Box>
  );
};
