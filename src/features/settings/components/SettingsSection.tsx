import { useState } from "react";
import { Heading, Input } from "@/components";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

type Props = {}

const { language } = useLanguage()


const SettingsSection = ({ }: Props) => {
  return (
    <div className="">
      <Heading title={translateText('profile', 'settings', language)} headingType="sub-heading" />
      <div className="space-y-2 mt-5">
        <Heading title={translateText('profile', 'changeEmail', language)} headingType="sub-heading" />
        <Input
          id="newEmail"
          label={translateText('profile', 'newEmail', language)}
          placeholder="..."
          onChange={() => { }}
          value=""
        />
      </div>
      <div className="space-y-2 mt-5">
        <Heading title={translateText('profile', 'updatePassword', language)} headingType="sub-heading" />
        <Input
          id="newPassword"
          label={translateText('profile', 'newPassword', language)}
          placeholder="..."
          onChange={() => { }}
          value=""
        />
        <Input
          id="confirmPassword"
          label={translateText('profile', 'confirmPassword', language)}
          placeholder="..."
          onChange={() => { }}
          value=""
        />
      </div>
      <div className="space-y-2">
        <Heading title={translateText('profile', 'validateChanges', language)} headingType="sub-heading" />
        <Input
          id="currentPassword"
          label={translateText('profile', 'currentPassword', language)}
          placeholder="..."
          onChange={() => { }}
          value=""
        />
      </div>
      <button
        className="w-full mt-5 rounded bg-primary border border-primary hover:border-primary-text"
      >
        {translateText('buttons', 'confirm', language)}
      </button>
    </div>
  )
}

export default SettingsSection;