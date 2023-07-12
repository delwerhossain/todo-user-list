import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [hiddenField, setHiddenField] = useState(false);
  const [addList, setAddList] = useState("");
  const [listData, setListData] = useState([]);

  const mainList = (e) => {
    e.preventDefault();
    const list = e.target.list.value;

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
        if (data) {
          setAddList(list);
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

  useEffect(() => {
    fetch("http://localhost:5000/get")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Request failed with status: " + res.status);
        }
      })
      .then((data) => setListData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-center">
      <h1 className="p-4 text-4xl my-3 font-bold border rounded-lg">
        Add Your todo list
      </h1>
      <section className="">
        <button
          onClick={() => setHiddenField(!hiddenField)}
          className={`btn mb-6 ${hiddenField ? "btn-warning" : ""}`}
        >
          {!hiddenField ? "Add Todo List" : "Hidden List"}
        </button>
        <form
          onSubmit={mainList}
          className={`flex justify-center items-center gap-4 mx-2 ${
            hiddenField ? "hidden" : ""
          }`}
        >
          <input
            name="list"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <button type="submit" className="btn">
            Add
          </button>
        </form>
        {/* preview */}
        <div
          className={`border rounded-xl my-4 py-4 w-1/2 mx-auto ${
            !addList ? "hidden" : ""
          }`}
        >
          <ol>
            {listData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Home;
