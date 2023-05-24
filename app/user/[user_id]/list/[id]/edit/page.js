"use client";
import { addItem, getItemByList, getListById, updateItem } from "@/utils/data";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }) => {
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    const fetchItems = async () => {
      const { data: descriptions } = await getItemByList(id);
      setItems(descriptions);
      const { data } = await getListById(id);
    };
    fetchItems();
  }, [id]);

  const addTodo = async (e) => {
    e.preventDefault();
    const order = items.length + 1;
    const list_id = id;
    const addedLink = await addItem(description, order, completed, list_id);

    if (addedLink.success == false) {
      return;
    }

    const { data: descriptions } = await getItemByList(id);
    setItems(descriptions);
    setDescription("");
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const updateStatus = async (itemId, completed) => {
    await updateItem(itemId, completed);

    const { data: descriptions } = await getItemByList(id);
    setItems(descriptions);
  };

  return (
    <div className={"mx-auto max-w-2xl"}>
      <p className="my-14 h1 heading text-center">Edit List</p>
      <div className="bg-seashell border-black border-2 drop-shadow-xl shadow-lg">
        <div className="divide-y-2">
          {items.map(({ description, order, completed, id: itemId }) => {
            return (
              <div key={itemId} className="">
                <div>
                  <div className="flex justify-start my-2 mx-2">
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
                  <div className="flex justify-center mb-2">
                    <button
                      className="button small"
                      onClick={() => updateStatus(itemId, !completed)}
                    >
                      Status
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-seashell mt-14">
          <input
            className="container text-center mx-auto max-w-sm shadow-md border text-black text-xl 
          focus:outline-purple focus:font-bold flex justify-center items-center"
            onChange={descriptionHandler}
            name="new task"
            placeholder="Enter to-do here"
            value={description}
          ></input>
          <div className="my-5 flex justify-center items-center">
            <a
              className="text-blue border-purple border-2 bg-seashell"
              onClick={addTodo}
            >
              <p className="mx-3 my-3">Click Here to Add To-Do</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
