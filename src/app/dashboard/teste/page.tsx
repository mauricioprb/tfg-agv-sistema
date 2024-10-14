"use client";

import { trpc } from "@/server/client";

export default function Home() {
  const getUsers = trpc.user.getUsers.useQuery();
  return (
    <>
      <div>
        <h1>Teste</h1>
        <ul>
          {getUsers.data?.map((user) => <li key={user.id}>{user.name}</li>)}
        </ul>
      </div>
    </>
  );
}
