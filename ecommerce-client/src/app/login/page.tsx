import Link from "next/link"

export default function LoginPage(){
    return(
        <>
        <div className="w-50 container">
        <h1 className="display-1 text-center">Hello</h1>
        <form>
 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
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
      type="password"
      className="form-control"
      id="exampleInputPassword1"
    />
  </div>

  <Link href='/' type="submit" className="btn btn-primary">
    Submit
  </Link>
</form>
</div>
        </>
    )
}