import { v4 as uuidv4 } from "uuid";
import { InstructionType } from "@/types";


const STEP_KEYWORD_MAP: Record<string, string> = {
  step: "steg",
};

const NUMBERED_PATTERN = /^\s*(?:\d+[\.\)]|\*|-)\s*/;

export const parseInstructionList = (pastedText: string): InstructionType[] => {
  const possibleKeywords = [
    ...Object.keys(STEP_KEYWORD_MAP),
    ...Object.values(STEP_KEYWORD_MAP),
  ].map((word) => word.toLowerCase());

  const stepPattern = new RegExp(`\\b(${possibleKeywords.join("|")})\\b`, "i");

  const lines = pastedText
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line, index) => {
    let text = line.replace(NUMBERED_PATTERN, "").trim();
    let title = `Step ${index + 1}`;

    if (stepPattern.test(line)) {
      text = line.replace(stepPattern, "").trim();
    }

    return {
      id: uuidv4(),
      order: index + 1,
      title,
      text,
    };
  });
};