import { useState } from "react";

const Home = () => {
  const [hiddenField, setHiddenField] = useState(false);
  
  return (
    <div className="text-center">
      <h1 className="p-4  text-4xl my-3  font-bold border   rounded-lg">
        Add Your todo list
      </h1>
      <section className="">
        <button onClick={() => setHiddenField(!hiddenField)} className="btn mb-6">
          add Todo List
        </button>
        <div className={` flex justify-center items-center gap-4 ${!hiddenField && "hidden"}`}>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button className="btn"> add</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
