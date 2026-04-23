import { Link } from "react-router-dom"
import { ROUTES, translateText } from "@/utils"
import { PageContainer, Heading } from "@/components"
import { useLanguage } from "@/contexts"


const ErrorPage = () => {

  const { language } = useLanguage()

  return (
    <PageContainer>
      <div className="mt-5 px-5">
        <Heading title={translateText('errorPage', 'errorTitle', language)} headingType="section-heading" />
      </div>
      <div className="flex space-y-1 flex-col items-center justify-center">
        <span>{translateText('errorPage', 'errorText', language)}</span>
        <span>{translateText('errorPage', 'returnTo', language)}<Link to={ROUTES.HOME} className="underline decoration">{translateText('errorPage', 'homePage', language)}</Link></span>
      </div>
    </PageContainer>
  );
}

export default ErrorPage