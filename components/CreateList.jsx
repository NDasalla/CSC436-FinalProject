"use client";
import { addList, getCurrentUser } from "@/utils/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateList = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const createList = async (e) => {
    e.preventDefault();
    const { data } = await getCurrentUser();
    const addedList = await addList(title, data.id);
    if (addedList.success == false) {
      debugger;
      return;
    }
    setTitle("");
    router.replace(`user/${data.id}/list/${addedList.data[0].id}/edit`);
  };

  return (
    <div className="max-w-lg mx-auto">
      <p className="heading h1 my-14">Create List of To-Do&apos;s</p>
      <form className="bg-seashell border-black border-2 drop-shadow-xl shadow-lg">
        <label className="block text-black h3 heading mt-4">List Title</label>
        <input
          className="container text-center mx-auto max-w-sm mt-4 shadow-md border text-black text-xl 
          focus:outline-purple focus:font-bold flex justify-center items-center"
          onChange={titleHandler}
          name="title"
          placeholder="Title"
          value={title}
        ></input>
        <div className="my-5 flex justify-center items-center">
          <a
            className="text-blue border-purple border-2 bg-seashell"
            onClick={createList}
          >
            <p className="mx-3 my-3">Click Here to Create List</p>
          </a>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
