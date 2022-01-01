import { Button, FormControl, TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import { addNote } from "../../api";
import Notification from "../common/Notification";

function AddNoteForm({ user }) {
  const [loading, setloading] = useState(false);
  const [note, setNote] = useState(user.note);
  const [message, setMessage] = useState(null);

  const handleChange = async (event) => {
    setNote(event.target.value);
  };

  const save = async () => {
    const data = {
      userId: user.uuid,
      note,
    };
    try {
      setloading(true);
      setMessage(null);
      const response = await addNote(data);
      if (response.status === 200) {
        setMessage({ text: "Note updated", type: "success" });
      }
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      reset();
    }
  };
  const reset = () => {
    setloading(false);
    setNote('')
  };

  return (
    <Box>
      <Notification notification={message} />
      <Typography variant="h6">Note</Typography>
      <p>{user.note}</p>
      <FormControl sx={{ m: 1, width: "100%", mt: 3 }}>
        <TextareaAutosize
          placeholder="Note about this..."
          onChange={handleChange}
          value={note}
          minRows={5}
        />
      </FormControl>
      <FormControl>
        {note && (
          <Button disabled={loading} onClick={save} variant="outlined">
            Save
          </Button>
        )}
      </FormControl>
    </Box>
  );
}

export default AddNoteForm;
