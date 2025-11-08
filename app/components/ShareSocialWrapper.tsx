"use client";

import { ShareIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useMemo, useState } from "react";
import { ShareSocial } from "react-share-social";

interface Props {
  url?: string;
  path?: string;
  socialTypes?: string[];
}

const ShareSocialWrapper: React.FC<Props> = ({ url, path, socialTypes = ["facebook", "twitter", "linkedin"] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const finalUrl = useMemo(() => {
    if (typeof window === "undefined") return url || "";
    if (url) return url;
    if (path) return `${window.location.origin}${path}`;
    return window.location.href;
  }, [url, path]);

  useEffect(() => {
    let t: number | undefined;
    if (copied) t = window.setTimeout(() => setCopied(false), 2000);
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
    } catch (e) {
      // fallback
      const el = document.createElement("input");
      el.value = finalUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
    }
  };

  return (
    <>
      <button
        aria-label="Open share"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 mt-10"
      >
       <ShareIcon className="size-4 text-white"/>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-md bg-white p-4 shadow-lg dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Share this post</h3>
              <button aria-label="Close share" onClick={() => setIsOpen(false)} className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-3">
              <ShareSocial url={finalUrl} socialTypes={socialTypes} />

              <div className="mt-3 flex gap-2">
                <input readOnly value={finalUrl} className="flex-1 rounded border px-2 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200" />
                <button onClick={handleCopy} className="rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700">
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSocialWrapper;
