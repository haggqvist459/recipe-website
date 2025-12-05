import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addInstruction, updateInstructionField, removeInstruction, selectInstructions, setCurrentSection, setInstructions } from "@/features/recipeForms";
import { Input, Heading, Trashcan, ToggleButton, FadeWrapper } from "@/components";
import SectionWrapper from "../shared/SectionWrapper";
import { parseInstructionList } from "../../utils/parseInstructions";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

type Props = {
  handleNavigation?: (action: () => void) => void;
  toggleButtonState?: boolean
};


const InstructionSection = ({ handleNavigation, toggleButtonState = true }: Props) => {

  const { language } = useLanguage()
  const instructions = useAppSelector(selectInstructions);
  const [localInstructions, setLocalInstructions] = useState(instructions);
  const [displayPasteView, setDisplayPasteView] = useState(toggleButtonState)
  const [pastedText, setPastedText] = useState("");
  const dispatch = useAppDispatch();


  useEffect(() => {
    setLocalInstructions(instructions);
  }, [instructions]);

  const handleInstructionChange = (
    id: string,
    key: keyof (typeof localInstructions)[number],
    value: string
  ) => {
    setLocalInstructions((prev) =>
      prev.map((instruction) =>
        instruction.id === id ? { ...instruction, [key]: value } : instruction
      )
    );
  };

  const handleInstructionDispatch = (id: string, key: keyof (typeof localInstructions)[number]) => {
    const instruction = localInstructions.find(item => item.id === id);
    if (!instruction) return;
    dispatch(updateInstructionField({ id, key, value: instruction[key] }));
  };

  const handleParsedInstructions = () => {
    const instructionList = parseInstructionList(pastedText)
    dispatch(setInstructions(instructionList))
    setDisplayPasteView(false)
  }

  const hasValidInstruction = (ingredients: typeof localInstructions) => {
    return ingredients.some(instruction =>
      instruction.title.trim() !== "" &&
      instruction.text.trim() !== ""
    );
  };

  return (
    <SectionWrapper>
      <div className="flex justify-between">
        <Heading title={translateText('instructions', 'title', language)} />
        <div className="flex flex-col items-end pr-2">
          <span className="text-sm font-medium">{translateText('instructions', 'simplify', language)}</span>
          <ToggleButton isToggled={displayPasteView} onToggle={() => { setDisplayPasteView(prev => !prev) }} />
        </div>
      </div>
      <FadeWrapper key={displayPasteView ? "paste" : "manual"}>
        <div className="h-[60vh] flex flex-col">
          {displayPasteView ? (
            <>
              <div className="flex-grow overflow-y-auto space-y-2">
                <Input
                  multiline={true}
                  rows={15}
                  id="pasteInstructionField"
                  placeholder={translateText('instructions', 'paste', language)}
                  label={translateText('instructions', 'instructions', language)}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="my-2 w-full bg-lightblue text-primary-text font-medium rounded border-2 border-lightblue hover:border-primary-text"
                onClick={() => handleParsedInstructions()}
              >
                {translateText('instructions', 'parse', language)}
              </button>
            </>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-2">
                {localInstructions.map((instruction) => (
                  <div
                    className="mb-4"
                    key={`${instruction.id}-instruction`}>
                    <div className="flex items-end space-x-1">
                      <Input
                        id={`${instruction.id}-instructionTitle`}
                        placeholder="..."
                        label={`${translateText('instructions', 'instruction', language)} ${instruction.order}`}
                        value={instruction.title}
                        onChange={(changeEvent) =>
                          handleInstructionChange(instruction.id, "title", changeEvent.target.value)
                        }
                        onBlur={() => handleInstructionDispatch(instruction.id, "title")}
                        required={true}
                      />
                      <button
                        type="button"
                        className="mb-0.5 mr-1 disabled:opacity-50"
                        disabled={localInstructions.length === 1}
                        onClick={() => dispatch(removeInstruction({ id: instruction.id }))}
                      >
                        <Trashcan />
                      </button>
                    </div>
                    <div className="mt-2">
                      <Input
                        id={`${instruction.id}-text`}
                        placeholder="..."
                        value={instruction.text}
                        multiline={true}
                        required={true}
                        rows={3}
                        onChange={(changeEvent) =>
                          handleInstructionChange(instruction.id, "text", changeEvent.target.value)
                        }
                        onBlur={() => handleInstructionDispatch(instruction.id, "text")}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="my-2 w-full bg-lightblue text-primary-text font-medium rounded border-2 border-lightblue hover:border-primary-text"
                onClick={() => dispatch(addInstruction())}
              >
                {translateText('instructions', 'addInstruction', language)}
              </button>
            </>
          )}
        </div>
      </FadeWrapper>
      {handleNavigation && (
        <div className="w-full flex space-x-2 md:hidden">
          <button
            type="button"
            className="w-1/2 bg-secondary font-medium text-primary-text rounded"
            onClick={() => dispatch(setCurrentSection("Ingredients"))}
          >
            {translateText('buttons', 'back', language)}
          </button>
          <button
            type="button"
            disabled={!hasValidInstruction(localInstructions)}
            className="w-1/2 bg-primary font-medium text-primary-text rounded disabled:opacity-50"
            onClick={() => handleNavigation(() => dispatch(setCurrentSection("Preview")))}
          >
            {translateText('buttons', 'preview', language)}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

export default InstructionSection;