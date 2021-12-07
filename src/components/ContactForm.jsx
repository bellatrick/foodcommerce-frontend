import CustomInput from "./CustomInput";
import Textarea from "./Textarea";
import LoadingSpinner from "./LoadingSpinner";
import Modal from './MessageModal'
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [postMessage] = useMutation(POST_MESSAGE, {
    variables: form,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
    
    setLoading(true);
    await postMessage();
    setLoading(false);
    setOpen(true)
    setForm({
      name: "",
      email: "",
      message: "",
    });
    }catch(err){
      console.log(err)
      setLoading(false);
    }
  };
  return (
    <div className='z-10'>
      <div className="border-2 border-gray-200" />
      <p className="text-primary text-center font-heading text-3xl m-8 z-10">
        Contact Us For Enquiries
      </p>
      <form onSubmit={handleSubmit} className="mb-10 px-8 md:px-56 lg:px-72">
        <CustomInput
          name="name"
          placeholder="Full Name"
          type={"text"}
          onChange={handleChange}
          value={form.name}
          label={"Full Name"}
        />
        <CustomInput
          name="email"
          onChange={handleChange}
          placeholder="Email Address"
          type={"email"}
          value={form.email}
          label={"Email"}
        />
        <Textarea value={form.message} onChange={handleChange} />
        <button
          type="submit"
          className=" font-bold flex justify-center bg-primary tracking-widest rounded-2xl px-2 py-2 w-64  text-base mt-10 mx-auto hover:bg-gray-900 cursor-pointer text-white hover:text-green-50 sm:block"
        >
          {loading ? <LoadingSpinner height={"6"} width={"5"} /> : "Submit"}
          <span aria-hidden="true"></span>
        </button>
      </form>
      <Modal open={open} setOpen={setOpen}/>
    </div>
  );
};
const POST_MESSAGE = gql`
  mutation postMessage($name: String!, $email: String!, $message: String) {
    postMessage(name: $name, message: $message, email: $email) {
      
      email
    }
  }
`;
export default ContactForm;
