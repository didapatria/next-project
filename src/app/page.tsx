"use client";

import { get, store } from "@/redux/slices/user/thunk";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useRef } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.usersReducer.users);
  const status = useAppSelector(
    (state: RootState) => state.usersReducer.status,
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(get());
    }
  }, [status, dispatch]);

  const handleStoreUser = () => {
    const email = emailRef.current?.value;
    const name = nameRef.current?.value;

    if (email) {
      dispatch(store({ email, name }));
      if (emailRef.current) emailRef.current.value = "";
      if (nameRef.current) nameRef.current.value = "";
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <ul className="mb-4">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.email}
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter user email"
          ref={emailRef}
          className="mr-2 rounded border border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Enter user name"
          ref={nameRef}
          className="mr-2 rounded border border-gray-300 p-2"
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-300"
          onClick={handleStoreUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default Home;
