import signupImgage from "../assets/images/SignUpPic.jpg"
import Template from "../components/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join MediCare today and unlock a world of personalized healthcare services."
      description1="Health is Wealth"
      description2="Education to future-proof your career."
      image={signupImgage}
      formType="signup"
    />
  )
}

export default Signup
