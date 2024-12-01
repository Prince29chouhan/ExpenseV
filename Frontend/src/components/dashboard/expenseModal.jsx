import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-hot-toast"; // Import toast
import styles from "./expenseModal.module.css";

// Set the app element for Modal
Modal.setAppElement("#root");

function Expense() {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  const [category, setCategory] = useState(""); // Track selected category
  const [customCategory, setCustomCategory] = useState(""); // Track custom category input

  // Fetch the token from localStorage (if logged in)
  const token = localStorage.getItem('token'); // Assuming 'token' is stored in localStorage

  const onSubmit = async (data) => {
    if (!token) {
      alert("You are not authorized to perform this action. Please log in.");
      return;
    }

    // If 'Other' is selected, use the custom category
    const expenseData = {
      name: data.name,
      category: category === 'other' ? customCategory : data.category,
      amount: data.amount,
      date: data.date,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/expenses/add',
        expenseData, // Send data as JSON
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token to Authorization header
            'Content-Type': 'application/json' // Set content type as JSON
          }
        }
      );

      if (response.status === 201) {
        console.log('Expense created successfully');
        toast.success("Expense added successfully!"); // Display success message
        document.getElementById("my_modal_1").close();
        reset(); // Reset the form
      } else {
        console.error('Failed to create expense');
        toast.error("Failed to add expense."); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized! Please log in again.');
      }
    }
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== 'other') {
      setCustomCategory(''); // Reset custom category if not 'other'
    }
  };

  return (
    <div className="expense-modal">
      {/* Modal for adding expense */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-slate-50 glass text-white">
          <h3 className="font-bold text-lg">Add Expense</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label>Expense Name</label>
              <input type="text" {...register("name", { required: true })} className="banner-field text-black" />
              {errors.name && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className="form-control">
              <label>Expense Bucket</label>
              <select {...register("category", { required: true })} onChange={handleCategoryChange} className="banner-field text-black">
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="bills">Bills</option>
                <option value="movie">Movie</option>
                <option value="other">Other</option> {/* Added 'Other' option */}
              </select>
              {errors.category && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Show custom category input only when 'Other' is selected */}
            {category === 'other' && (
              <div className="form-control">
                <label>Custom Category</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="banner-field text-black"
                  placeholder="Enter custom category"
                />
                {customCategory === '' && <span className="text-sm text-red-500">This field is required when 'Other' is selected</span>}
              </div>
            )}

            <div className="form-control">
              <label>Amount</label>
              <input type="number" {...register("amount", { required: true })} className="banner-field text-black" />
              {errors.amount && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className="form-control">
              <label>Date</label>
              <input type="date" {...register("date", { required: true })} className="text-black" />
              {errors.date && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn save-btn">Upload</button>
              <button
                type="button"
                className="btn close-btn"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Expense;
