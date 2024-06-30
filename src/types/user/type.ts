type UserProps = {
  id: number;
  email: string;
  name?: string | null;
};

type UserState = {
  users: UserProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
};
