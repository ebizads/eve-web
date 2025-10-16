import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <div
      className="relative min-h-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-login.png')" }}
    >
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Gradient overlay on the left side */}
      <div className="absolute left-0 top-0 h-full w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
      </div>

      {/* Card positioning */}
      <main
        className="
          relative z-10 flex h-full 
          items-center 
          lg:justify-start lg:pl-44 
          justify-center px-6
        "
      >
        <div
          className="relative bg-white/20 backdrop-blur-lg rounded-3xl 
                     p-20 max-w-2xl w-full min-h-[810px]  
                     shadow-2xl border border-white/30 
                     flex flex-col items-center"
        >
          <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl -z-10"></div>

          <div className="relative mb-6">
            <Image
              src="/eve-icon.svg"
              alt="Eve Icon"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <h1 className="text-3xl font-medium mt-10 text-black text-center">
            Sign In
          </h1>

          <form className="mt-10 text-black space-y-6 w-full">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email or phone number
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-sm border border-slate-950 px-4 py-3 pr-8 rounded-xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  stroke="#000"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm border border-slate-950 px-4 py-3 pr-8 rounded-xl"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  stroke="#000"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-black border-slate-950 rounded"
                  onChange={(e) => {
                    const label = document.querySelector(
                      "label[for='remember-me']"
                    );
                    if (label) {
                      label.classList.toggle("font-bold", e.target.checked);
                    }
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a className="text-black hover:underline font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="button"
                onClick={() => router.push("/fleetmap")} // Redirects to FleetMap page
                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-xl text-[#FFD900] bg-black hover:bg-[#111111] focus:outline-none cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
