import { useMutation } from "@tanstack/react-query";
import { CreateTicket } from "../api/createTicket";

export function useCreateTicket() {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: FormData) => CreateTicket(data),
    mutationKey: ["create-ticket"],
  });

  return { mutate, isPending, isError, isSuccess };
}
