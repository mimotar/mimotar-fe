import { useRouter, useSearchParams } from "next/navigation";

export function navigateProjectStep(step: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set("step", String(step));

  router.push(`?${params.toString()}`);
}
