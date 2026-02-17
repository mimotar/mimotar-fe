"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      {/* <Image src={Images.pawPawErrorImg} alt="error" className="size-80" /> */}
      <h2>Something went wrong!</h2>
      <button
        className="py-1 px-4 rounded-md bg-red-300 text-white cursor-pointer mt-4 "
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
