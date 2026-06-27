import { useRouter, useSearchParams } from "next/navigation";

export function useNavigateProjectStep() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextStep = (step: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("step", String(step));

    router.push(`?${params.toString()}`);
  };

  return { nextStep };
}
