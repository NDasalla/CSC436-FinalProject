"use client";
import { getItemByList, getListById } from "@/utils/data";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const [items, setItems] = useState([]);
  const [listTitle, setListTitle] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const { data: descriptions } = await getItemByList(id);
      setItems(descriptions);
      const { data } = await getListById(id);
      setListTitle(data[0].title);
    };
    fetchItems();
  }, [id]);

  return (
    <div className={"max-w-2xl mx-auto"}>
      <div className="bg-seashell border-black border-2 drop-shadow-xl shadow-lg mt-16">
        <div className="divide-y-2">
          {items.map(({ description, order, completed, id: itemId }) => {
            return (
              <div key={itemId} className="flex justify-start py-4 mx-2">
                {completed === false ? (
                  <p className="font-bold text-red text-2xl">X</p>
                ) : (
                  <p className="font-bold text-green-500 text-2xl">✓</p>
                )}{" "}
                <p className="font-bold text-black text-2xl ml-5">
                  {description}
                </p>
                <div className="text-sm font-normal text-gray-500 tracking-wide ">
                  {" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
