import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Home = () => {
  const [hiddenField, setHiddenField] = useState(false);
  const [listData, setListData] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const mainList = (data) => {
    const list = data.list;
    fetch("http://localhost:5000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list: list }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          reset();
          listGet();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listGet = () => {
    fetch("http://localhost:5000/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setListData(data.reverse());
      });
  };

  useEffect(() => {
    listGet();
  }, []);

  return (
    <div className="text-center">
      <h1 className="p-4 text-4xl my-3 font-bold border rounded-lg">
        Add Your todo list
      </h1>
      <section>
        <button
          onClick={() => setHiddenField(!hiddenField)}
          className={`btn mb-6 ${hiddenField ? "btn-warning" : ""}`}
        >
          {!hiddenField ? "Add Todo List" : "Hidden List"}
        </button>
        <form
          onSubmit={handleSubmit(mainList)}
          className={`flex justify-center items-center gap-4 mx-2 ${
            hiddenField ? "" : "hidden"
          }`}
        >
          <input
            {...register("list")}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button type="submit" className="btn">
            Add
          </button>
        </form>
        {/* preview */}
        <div>
          <ol>
            {listData.map((item, index) => (
              <div
                className=" relative flex justify-center items-center border rounded-xl my-4 py-4 w-1/2 mx-auto"
                key={index}
              >
                <li> {item.item}</li>
                <div className="absolute right-2 flex gap-2 ">
                  <button className="btn btn-warning btn-sm">edit</button>
                  <button className="btn btn-error btn-sm">delete</button>
                </div>
              </div>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Home;
