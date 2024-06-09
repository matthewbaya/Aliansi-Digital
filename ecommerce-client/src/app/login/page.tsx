import { error } from "console";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientFlashComponent from "@/components/ClientFlashComponent";

export default function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    //pakai directive use server
    "use server";
    //ambil email dan password dari form
    const email = formData.get("email");
    const password = formData.get("password");
    //fetch data dari api
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //harus diberi content type karena body yang dikirim berupa json
        },
        body: JSON.stringify({ email, password }), //json stringify body
      }
    );
    //await result agar data terlihat lebih jelas
    const data = await response.json();
    if (!response.ok) {
      //handle error

      return redirect("/login?error=" + data.message);
    }

    //kalau pakai server action, harus set cookies lagi
    cookies().set("Authorization", "Bearer " + data.access_token);

    console.log(data);
    return redirect("/");
  };
  return (
    <>
      <div className="w-50 container border">
        <h1 className="display-1 text-center">Login</h1>
        <ClientFlashComponent></ClientFlashComponent>
        <form action={handleLogin} method="POST">
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
