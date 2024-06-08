"use client";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export default function ClientFlashComponent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  return (
    <>
      {/* {errorMessage &&
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        })} */}
      {errorMessage && (
        <div className="text-center bg-danger rounded">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
}
