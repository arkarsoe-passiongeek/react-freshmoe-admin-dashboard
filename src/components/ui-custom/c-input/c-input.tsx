import React from "react";
import { CBaseInput } from "./base-input";
import { CInputWithEndButton } from "./input-with-end-button";
import { CInputWithEndIcon } from "./input-with-end-icon";
import { CInputWithPasswordStrengthIndicator } from "./input-with-password-indicator";
import { CSearchInput } from "./search-input";

/**
 * CInput component with static properties for variations
 */
interface CInputType extends React.FC {
  Base: typeof CBaseInput;
  WithEndButton: typeof CInputWithEndButton;
  SearchInput: typeof CSearchInput;
  WithEndIcon: typeof CInputWithEndIcon;
  WithPasswordStrengthIndicator: typeof CInputWithPasswordStrengthIndicator;
}

const CInput: CInputType = () => {
  return <></>;
};

CInput.Base = CBaseInput;
CInput.WithEndButton = CInputWithEndButton;
CInput.SearchInput = CSearchInput;
CInput.WithEndIcon = CInputWithEndIcon;
CInput.WithPasswordStrengthIndicator = CInputWithPasswordStrengthIndicator;

export default CInput;
