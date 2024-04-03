import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/SettingsAPI";
import IconBtn from "../../Common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-md border-[1px] border-slate-400 bg-slate-300 p-8">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="label-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              className="input-style"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="error-message">
                Please enter your first name.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="label-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              className="input-style"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="error-message">
                Please enter your last name.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="label-style">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="input-style"
              {...register("dateOfBirth", {
                required: true,
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="error-message">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="label-style">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="input-style"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((ele, i) => (
                <option key={i} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="error-message">
                Please select your gender.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="label-style">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="input-style"
              {...register("contactNumber", {
                required: true,
                maxLength: 12,
                minLength: 10,
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="error-message">
                {errors.contactNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="about" className="label-style">
              About
            </label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              className="input-style"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="error-message">Please enter About.</span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-gray-400 py-2 px-5 font-semibold text-gray-950 hover:bg-purple-500"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  );
}
