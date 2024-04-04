import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-purple-5">{title}</h1>
          <p className="text-lg lg:text-xl text-gray-700 mb-8">{description1} <span className="italic font-semibold text-blue-600">{description2}</span></p>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Students"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Template;