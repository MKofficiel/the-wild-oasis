import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({
        fullName,
        email,
        password,
      }),

    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email adress"
      );
    },
  });

  return { signUp, isPending };
};
