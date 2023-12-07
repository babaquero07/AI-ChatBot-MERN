import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      name={props.name}
      label={props.label}
      InputLabelProps={{ style: { color: "white" } }}
      type={props.type}
      inputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
