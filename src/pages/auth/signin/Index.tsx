import { Auth } from "../components/Auth"
import { FormSignin } from "./components/FormSignin"

const PageSignin = () => {
    return (
        <Auth descriptionHeader="Wellcome Back" titleFooter="Don't have an account?" titleButton="Sign up" toPage="/auth/signup">
            <FormSignin />
        </Auth>
    )
}

export default PageSignin