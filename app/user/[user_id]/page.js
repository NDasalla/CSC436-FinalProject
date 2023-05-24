"use client";
import { getCurrentUser, getListByUser } from "@/utils/data";
import Link from "next/link";

const Page = async ({ params: { user_id } }) => {
  const { data } = await getCurrentUser();
  const { data: titles, error } = await getListByUser(user_id);

  if (error) {
    return <p className="text-red">Error: {error.message}</p>;
  } else if (titles.length == 0) {
    return <p className="heading h1 my-14">This user currently has no lists</p>;
  } else if (user_id === data?.id) {
    return (
      <div className="text-center mt-14">
        {titles.map(({ title, id }) => {
          return (
            <div key={title} className="buttonText">
              <Link
                key={title}
                href={`/user/${user_id}/list/${id}/edit`}
                className="block my-5 button small"
              >
                <div className="buttonInside">{title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="text-center mt-14">
        {titles.map(({ title, id }) => {
          return (
            <div key={title} className="buttonText">
              <Link
                key={title}
                href={`/user/${user_id}/list/${id}`}
                className="block my-5 button small"
              >
                <div className="buttonInside">{title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Page;
