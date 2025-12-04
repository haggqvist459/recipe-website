import { v4 as uuidv4 } from "uuid";
import { UNITS } from "@/utils";
import { IngredientType } from "@/types";

const unicodeFractionMap: Record<string, string> = { "½": "1/2", "¼": "1/4", "¾": "3/4" };


const SWEDISH_UNIT_MAP: Record<string, string> = {
  msk: "tbsp",
  tsk: "tsp",
  krm: "dash",
  st: "pcs",
};

const toDecimal = (amountString: string): string => {
  const mixedMatch = amountString.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const den = parseFloat(mixedMatch[3]);
    return (whole + num / den).toString();
  }

  const fractionMatch = amountString.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const den = parseFloat(fractionMatch[2]);
    return (num / den).toString();
  }

  return amountString;
};

const normalizeLine = (rawLine: string): string => {
  let normalized = rawLine;

  for (const [symbol, ascii] of Object.entries(unicodeFractionMap)) {
    normalized = normalized.split(symbol).join(` ${ascii} `);
  }

  normalized = normalized
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/[×]/g, "x")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\/ ?/g, "/")
    .trim();

  return normalized;
};

// normalize Swedish or localized unit names into English equivalents
const normalizeUnit = (rawUnit: string): string => {
  const lower = rawUnit.toLowerCase();
  return SWEDISH_UNIT_MAP[lower] ?? lower;
};

const extractLeadingAmount = (tokenList: string[]): { amount: string; consumed: number } => {
  if (tokenList.length === 0) return { amount: "", consumed: 0 };

  if (/^\d+\s*x$/.test(`${tokenList[0]} ${tokenList[1] ?? ""}`.trim()) || /^\d+x$/.test(tokenList[0])) {
    const afterMultiplier = tokenList.slice(/^\d+x$/.test(tokenList[0]) ? 1 : 2);
    if (afterMultiplier.length && /^\d+([.,]\d+)?$|^\d+\/\d+$/.test(afterMultiplier[0])) {
      return { amount: afterMultiplier[0].replace(",", "."), consumed: (/^\d+x$/.test(tokenList[0]) ? 2 : 3) };
    }
  }

  const first = tokenList[0];
  const second = tokenList[1];

  if (/^\d+\/\d+$/.test(first)) return { amount: toDecimal(first), consumed: 1 };

  if (/^\d+([.,]\d+)?$/.test(first)) {
    if (second && /^\d+\/\d+$/.test(second)) {
      const mixed = `${first.replace(",", ".")} ${second}`;
      return { amount: toDecimal(mixed), consumed: 2 };
    }
    return { amount: first.replace(",", "."), consumed: 1 };
  }

  return { amount: "", consumed: 0 };
};

export const parseIngredientList = (pastedText: string): IngredientType[] => {
  const possibleUnitsLower = UNITS.map((unitValue) => unitValue.toLowerCase());

  return normalizeLine(pastedText)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const tokenList = line.split(" ").filter(Boolean);

      const { amount, consumed } = extractLeadingAmount(tokenList);
      const remainingAfterAmount = tokenList.slice(consumed);

      let unit: IngredientType["unit"] = "";
      if (remainingAfterAmount[0]) {
        const normalizedCandidate = normalizeUnit(remainingAfterAmount[0]);
        if (possibleUnitsLower.includes(normalizedCandidate.toLowerCase())) {
          unit = normalizedCandidate as IngredientType["unit"];
        }
      }

      const nameStartIndex = unit === "" ? 0 : 1;
      const name = remainingAfterAmount.slice(nameStartIndex).join(" ");

      return {
        id: uuidv4(),
        name,
        amount,
        unit,
      };
    });
};