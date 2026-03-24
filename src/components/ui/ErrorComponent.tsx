import { ArrowCircle, ErrorIcon } from "@/components/icons";
import IconButton from "./IconButton";
import Heading from "./Heading";

type Props = {
  errorMessage?: string
}


const ErrorComponent = ({ errorMessage }: Props) => {

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="flex space-x-2 items-center">
        <ErrorIcon />
        <Heading title="Something went wrong!" headingType="sub-heading" />
        <ErrorIcon />
      </div>
      {errorMessage &&
        <>
          <Heading title="Error message: " headingType="sub-heading" />
          <span className="text-primary-text mt-2">{errorMessage}</span>
        </>
      }
      <span className="">Try reloading the page. </span>
      <IconButton onClick={reloadPage}>
        <ArrowCircle />
      </IconButton>
    </div>
  );
}

export default ErrorComponent;