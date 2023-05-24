import Link from "next/link";
import { getLatestUsers } from "../utils/data";
export const revalidate = 20;

export default async function Home() {
  const { success, data, error } = await getLatestUsers();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data.length === 0) {
    return <p className="h1 heading">No recent users</p>;
  }

  return (
    <main className="text-center">
      <p className="heading h1 my-14">Most Recent Lists</p>
      {data.map(({ user_id, name }) => {
        return (
          <div key={name} className="buttonText">
            <Link
              key={name}
              href={`/user/${user_id}`}
              className="block my-5 button small"
            >
              <p className="buttonInside">{`${name}'s Lists`}</p>
            </Link>
          </div>
        );
      })}
    </main>
  );

  return <main></main>;
}
