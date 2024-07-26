import { styled } from "styled-components";
import Box from "@mui/material/Box";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const Text = styled.p`
  text-align: center;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid var(--brand-color)",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};
