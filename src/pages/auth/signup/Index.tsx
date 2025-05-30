import { Auth } from "../components/Auth"
import { FormSignup } from "./components/FormSignup"

const PageSignup = () => {
    return (
        <Auth descriptionHeader="Create a new account" titleFooter="Already have an account?" titleButton="Sign in" toPage="/auth/signin">
            <FormSignup />
        </Auth>
    )
}

export default PageSignup