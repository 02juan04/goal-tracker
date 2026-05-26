import "./App.css";
import Nav from "./nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Archived from "./pages/Archived.jsx";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import Input from "./components/input.jsx";
import Button from "./components/button.jsx";
import SignUpForm from "./components/signup.jsx";

function App() {
  const [loading, setLoading] = useState(false);

  const [isSigningUp, setIsSigningUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // -----------------------------
  // AUTH STATE SYNC
  // -----------------------------
  useEffect(() => {
    // Get current session on load
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user || null);
    };

    getSession();

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // -----------------------------
  // FETCH TASKS WHEN LOGGED IN
  // -----------------------------
  useEffect(() => {
    async function getTasks() {
      const { data, error } = await supabase.from("tasks").select();

      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }

      setTasks(data || []);
    }

    if (user) {
      getTasks();
    }
  }, [user]);

  // -----------------------------
  // SIGN UP
  // -----------------------------
  async function signUp(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm your account.");
    }

    setLoading(false);
    setIsSigningUp(false);
  }

  // -----------------------------
  // SIGN IN
  // -----------------------------
  async function signIn(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setTasks([]);
    setEmail("");
    setPassword("");
    isSigningUp(false);
  }

  console.log(!isSigningUp);
  if (isSigningUp) {
    return (
      <SignUpForm
        email={email}
        password={password}
        firstName={firstName}
        lastName={lastName}
        setPassword={setPassword}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleSignUp={signUp}
        setIsSigningUp={setIsSigningUp}
        loading={loading}
      />
    );
  }

  return (
    <>
      <h1
        id="main-header"
        className="text-[50px] mb-4 mt-2 tracking-widest font-thin"
      >
        Task Tracker
      </h1>

      {user ? (
        <div className="flex w-5/6 md:w-3/4 lg:w-2/3 3xl:border flex-col justify-center items-center">
          <div id="nav-section" className="relative w-5/6">
            <Nav />
            <Button
              variant="primary"
              onClick={signOut}
              label="Sign Out"
              props="absolute top-0 right-0"
            />
          </div>

          <Routes>
            <Route
              path="/"
              element={<Home user={user} tasks={tasks} setTasks={setTasks} />}
            />
            <Route
              path="/Profile"
              element={<Profile user={user} tasks={tasks} />}
            />
            <Route
              path="/Archived"
              element={<Archived tasks={tasks} setTasks={setTasks} />}
            />
          </Routes>
        </div>
      ) : (
        <>
          <h1>Welcome to task tracker.</h1>
          <p>
            This is fully integrated with Supabase DB. You <i>could</i> sign up
            with your own email and password, but just in case I made a demo
            email and password.
          </p>
          <br />
          <p>
            Feel free to perform any functions available inside this
            webapp.{" "}
          </p>
          <br />
          <p>
            demo email is: <code>mydemoemail1010@gmail.com</code>
          </p>
          <p>
            demo password is: <code>demodemo</code>
          </p>
          <div className=" border border-gray-800 rounded-xl mx-auto mt-20 p-[4rem] shadow-2xl w-110 h-130 flex flex-col justify-center">
            <h1 className="text-center text-[30px] mb-7">Sign In</h1>
            <div id="sign-in-up-container" className="p-[1rem] flex flex-row">
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

                <div
                  id="sign-in-out-buttons"
                  className="flex flex-col gap-[2rem] my-5"
                >
                  <Button
                    label="Continue"
                    onClick={signIn}
                    disabled={loading}
                    variant="primary"
                  />

                  <div id="sign-up-section" className="m-auto text-center">
                    <p className="mb-1">Dont have an Account?</p>
                    <Button
                      label="Sign Up"
                      onClick={() => setIsSigningUp(true)}
                      disabled={loading}
                      variant="secondary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
