import CustomInput from "./CustomInput";
import Textarea from "./Textarea";
const ContactForm = () => {
  return (
    <div>
      <div className="border-2 border-gray-200" />
      <p className="text-primary font-heading text-3xl m-8">
        Contact Us For Enquiries
      </p>
     <form className='mb-10 px-8 md:px-56 lg:px-72'>
     <CustomInput
        name={"Full name"}
        placeholder="Full Name"
        type={"text"}
        label={"Full Name"}
      />
      <CustomInput
        name={"Email"}
        placeholder="Email Address"
        type={"email"}
        label={"Email"}
      />
      <Textarea/>
      <button type='submit' className=" font-bold bg-primary tracking-widest rounded-2xl px-2 py-2 w-64  text-base mt-10 mx-auto hover:bg-gray-900 cursor-pointer text-white hover:text-green-50 sm:block">
          Submit<span aria-hidden="true"></span>
        </button>
     </form>
    </div>
  );
};

export default ContactForm;
