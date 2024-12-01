import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import "../../public/style/banner.css";

Modal.setAppElement("#root");

function Banner() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    document.getElementById("my_modal_1").close();
    reset();
  };

  return (
    <div className="hero-page">
      <h1 className="text-center text-white text-6xl">Welcome to Expense Tracker</h1>

      <button
        className="btn add-expense-btn bg-[#FFE344] hover:bg-[#f2d846] text-black"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add Expense
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-slate-50 glass text-white">
          <h3 className="font-bold text-lg">Add Expense</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label>Amount</label>
              <input type="number" {...register("amount", { required: true })}  className="banner-field"/>
              {errors.amount && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            <div className="form-control">
              <label>Document</label>
              <input type="file" {...register("document", { required: true })}  className=""/>
              {errors.document && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            <div className="form-control">
              <label>Expense Bucket</label>
              <input type="text" {...register("expenseBucket", { required: true })}  className="banner-field" />
              {errors.expenseBucket && <span className="text-sm text-red-500">This field is required</span>}
            </div>
            <div className="form-control">
              <label>Remarks</label>
              <textarea {...register("remarks", { required: true })} className="banner-field"></textarea>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn save-btn bg-[#007bff] hover:bg-[#0056b3] text-white">Save</button>
              <button type="button" className="btn close-btn bg-[#dc3545] hover:bg-[#c82333] text-white" onClick={() => document.getElementById("my_modal_1").close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Banner;
