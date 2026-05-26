import Button from "./button";
import Input from "./input";

export default function SignUpForm({
  email,
  password,
  firstName,
  lastName,
  setPassword,
  setEmail,
  setFirstName,
  setLastName,
  handleSignUp,
  loading,
  setIsSigningUp,
}) {
  return (
    <div className=" box-border border border-gray-800 rounded-xl m-auto p-[4rem] shadow-2xl w-110 h-130 flex flex-col justify-center">
      <div className="my-10 w-fit">
        <Button
          variant="secondary"
          label="Go Back"
          onClick={() => setIsSigningUp(false)}
        />
      </div>
      <h1 className="text-center text-[30px] mb-7">Sign Up</h1>
      <div id="sign-up-container" className="p-[1rem] flex flex-row"></div>

      <form className="flex flex-col gap-[1rem] m-auto w-full">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <div id="sign-in-out-buttons" className="flex flex-col gap-[2rem] my-5">
          <Button
            label="Sign Up"
            onClick={handleSignUp}
            disabled={loading}
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
}
