import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const InlineFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== "lowerCase" && prop !== "withBtn"
})<{ withBtn?: boolean; }>(
  ({ theme, withBtn, color }) => `
  flex-direction: row;
  align-items: ${withBtn ? "start" : "center"};
`
);

export default InlineFormControl;
