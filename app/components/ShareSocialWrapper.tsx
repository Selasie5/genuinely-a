"use client";

import React from "react";
import { ShareSocial } from "react-share-social";

interface Props {
  url: string;
  socialTypes: string[];
}

const ShareSocialWrapper: React.FC<Props> = ({ url, socialTypes }) => {
  return <ShareSocial url={url} socialTypes={socialTypes} />;
};

export default ShareSocialWrapper;
