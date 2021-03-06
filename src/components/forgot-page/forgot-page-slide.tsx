import React, { useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { HEADER_TYPES, theme, DESKTOP_WIDTH, MOBILE_WIDTH } from "../../config";

import ContentBox from "../signup/content-box";
import Hr from "../signup/hr";
import Title from "../signup/title";
import ScreenContainer from "../shared/screen-container";
import Textarea from "../shared/generic/textarea";
import Header from "../shared/header";

const ContainerWrapper = styled.div`
  width: 100%;
`;

const ContinueButton = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  background-color: ${props => props.theme.button.background};
  border: none;
  color: ${props => props.theme.button.color};
  font-size: 16px;
  font-stretch: ${props => props.theme.fontStretch};
  font-style: ${props => props.theme.fontStyle};
  height: 40px;
  letter-spacing: ${props => props.theme.letterSpacing};
  line-height: ${props => props.theme.lineHeight};
  margin: auto;
  text-align: center;
  width: 245px;

  @media (max-width: ${DESKTOP_WIDTH}px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 25px 0;
  @media only screen and (max-width: ${DESKTOP_WIDTH}px)
    text-align: center;
  }
`;

const InputWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  @media only screen and (max-width: ${MOBILE_WIDTH}px) {
    display: block;
  }
`;
const InputColumnWrapper = styled.div`
  flex: 50%;
`;

const Label = styled.h3`
  color: ${props => props.theme.label.color};
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.7px;
  line-height: normal;
`;

const Error = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.theme.error.color};
`;

const ForgotPageSlide = ({ recoverAccountHandle, hasError, resetError }) => {
  const recoverTextearea = useRef<any>(null);
  const [mnemonic, setMnemonic] = useState("");
  const [isValidMnemonic, setIsValidMnemonic] = useState(true);

  const continueForgotButton = value => {
    const words = value.trim().split(" ");
    if (words.length === 12) {
      recoverAccountHandle(value.trim());
    } else {
      setIsValidMnemonic(false);
    }
  };

  const validateMnemonic = value => {
    if (hasError) resetError();
    const result = value
      .split("")
      .reduce(
        (words, ch) =>
          ch !== "," && ch !== ";" && ch !== "\t" && ch !== "&nbsp;"
            ? words + ch
            : words + " ",
        ""
      );
    setMnemonic(result.replace(/ {1,}/g, " "));
  };

  return (
    <ThemeProvider theme={theme}>
      <ContainerWrapper>
        <Header type={HEADER_TYPES.TEAM_PAGE} />
        <ScreenContainer title={"Forgot Account Handle?"}>
          <ContentBox>
            <Title>Recover Account Handle</Title>
            <Hr />
            <InputWrapper>
              <InputColumnWrapper>
                <Label>
                  If you have lost your Opacity Account Handle, you can recover
                  it using the 12 word mnemonic phrase provided when you signed
                  up for your account. Please enter the 12 words below in the
                  exact order originally provided with a space between each
                  word. Then click 'Recover Account Handle'.
                </Label>
                <Label>Recovery Phrase</Label>
                <Textarea
                  value={mnemonic}
                  ref={recoverTextearea}
                  onChange={e => validateMnemonic(e.target.value)}
                  name="storage-pin"
                />
              </InputColumnWrapper>
            </InputWrapper>
            <ButtonWrapper>
              {(!isValidMnemonic || hasError) && (
                <Error>Your mnemonic is invalid.</Error>
              )}
              <ContinueButton
                onClick={() =>
                  continueForgotButton(recoverTextearea.current.value)
                }
              >
                Recover Account Handle
              </ContinueButton>
            </ButtonWrapper>
          </ContentBox>
        </ScreenContainer>
      </ContainerWrapper>
    </ThemeProvider>
  );
};

export default ForgotPageSlide;
