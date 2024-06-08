import ClientFlashComponent from "@/components/ClientFlashComponent";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const handleRegister = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //harus diberi content type karena body yang dikirim berupa json
      },
      body: JSON.stringify({ email, username, password }), //json stringify body
    });
    if (!response.ok) {
      console.log(response);
    }
    const data = await response.json();
    // console.log(data);
    return redirect("/register?error=" + data.message);
  };
  return (
    <>
      <div className="container w-50">
        <h1 className="display-1 text-center">Register</h1>
        <ClientFlashComponent></ClientFlashComponent>
        <form action={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
