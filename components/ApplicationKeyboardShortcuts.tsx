"use client";

import { useEffect } from "react";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
};

const clickElement = (id: string) => {
  const element = document.getElementById(id);
  if (element instanceof HTMLElement && !element.hasAttribute("disabled")) {
    element.click();
  }
};

export default function ApplicationKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      if (document.querySelector('[role="dialog"]')) {
        return;
      }

      if (/^[1-7]$/.test(event.key)) {
        event.preventDefault();
        clickElement(`application-score-${event.key}`);
        return;
      }

      const actionMap: Record<string, string> = {
        o: "application-open-links",
        a: "application-action-accepted",
        r: "application-action-rejected",
        ArrowLeft: "application-prev",
        ArrowRight: "application-next",
      };

      const targetId = actionMap[event.key];
      if (targetId) {
        event.preventDefault();
        clickElement(targetId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
