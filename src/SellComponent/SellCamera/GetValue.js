import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./GetValue.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import useFirebase from "./../../Login/Firebase/useFirebase";

const customStyles = {
  content: {
    width: "90%",
    height: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "3px solid orange",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const GetValue = ({ modalIsOpen, closeModal, price, Show, _id }) => {
  const [newPrice, setNewPrice] = useState(price);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { setUpRecaptcha } = useFirebase();
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [confirmObj, setConfirmObj] = useState("");

  const onSubmit = (data, e) => {
    e.preventDefault();
    const getValueData = {
      newPrice,
      number: data.number,
      name: data.name,
      message: data.message,
    };

    const url = `https://arcane-thicket-06182.herokuapp.com/getValues`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getValueData),
    }).then((res) => {
      if (res) {
        alert(
          "Thank You for Choosing us!! We have recorded your pricing, we will get back to you soon."
        );
      }
    });
  };

  console.log("Show", _id);
  const [formData, setFormData] = useState({
    DSLR: "Yes",
    DSL: "No",
    DS: "Yes",
    DL: "No",
  });
  // const { _id } = Show;

  const handleChange = (event) => {
    // console.log(event.target.value);
    let newPrices = 0;
    if (event.target.value === "YES") {
      newPrices = parseFloat(newPrice) + 0;
      setNewPrice(newPrices);
    } else {
      newPrices = newPrice - 2000;
      setNewPrice(newPrices);
    }
    // console.log(newPrices);
  };

  const handleChanges = (event) => {
    // console.log(event.target.value);
    let newPrices = 0;
    if (event.target.value === "No") {
      newPrices = parseFloat(newPrice) + 0;
      setNewPrice(newPrices);
    } else {
      newPrices = newPrice - 4000;
      setNewPrice(newPrices);
    }
    // console.log(newPrices);
  };
  const handleBodyChange = (event) => {
    // console.log(event.target.value);
    let newPrices = 0;
    if (event.target.value === "No") {
      newPrices = parseFloat(newPrice) + 0;
      setNewPrice(newPrices);
    } else {
      newPrices = newPrice - 2500;
      setNewPrice(newPrices);
    }
    console.log(newPrices);
  };
  const handleLensChange = (event) => {
    // console.log(event.target.value);
    let newPrices = 0;
    if (event.target.value === "Yes") {
      newPrices = parseFloat(newPrice) + 5000;
      setNewPrice(newPrices);
    } else {
      newPrices = newPrice - 1500;
      setNewPrice(newPrices);
    }
    console.log(newPrices);
  };

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === "" || otp === null)
      return setError("Please enter a valid code.");
    try {
      setError("");
      await confirmObj.confirm(otp);
      setIsSuccess(true);
      // history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Button onClick={closeModal} variant="outline-danger">
          Close
        </Button>{" "}
        <div className="container">
          <h6 className="mt-5">
            <FontAwesomeIcon className="icon" icon={faArrowDown} />
            Scroll Down
          </h6>
          <br />
          <div className="orders-container ml-5 mr-5 ">
            <h6>Thank you so much for taking the time!</h6>

            <p>Please provide the bellow details</p>

            {/* onSubmit={handleSubmit(onSubmit)} */}

            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="db">Does the DSLR camera switch on?</label>
                <div className="field">
                  <input
                    type="radio"
                    name="DSLR"
                    value="YES"
                    onChange={handleChange}
                    id="dslrYes"
                    // checked={formData.DSLR === "Yes"}
                  />
                  <label for="dslrYes">Yes</label>
                </div>
                <div className="field">
                  <input
                    type="radio"
                    name="DSLR"
                    value="No"
                    onChange={handleChange}
                    id="dslrNo"
                    // checked={formData.DL === "No"}
                  />
                  <label for="dslrNo">No</label>
                </div>
                <label className="db">
                  Are there any functional issues in your device?
                </label>
                <div className="field">
                  <input
                    type="radio"
                    name="DSL"
                    value="Yes"
                    onChange={handleChanges}
                    // checked={formData.DS === "Yes"}
                  />
                  <label>Yes</label>
                </div>
                <div className="field">
                  <input
                    type="radio"
                    name="DSL"
                    value="No"
                    onChange={handleChanges}
                    // checked={formData.DSL === "No"}
                  />
                  <label>No</label>
                </div>
                <label className="db">
                  Are there any defects on your device's body?
                </label>
                <div className="field">
                  <input
                    type="radio"
                    name="DSLRs"
                    value="Yes"
                    onChange={handleBodyChange}
                    // checked={formData.DSLR === "Yes"}
                  />
                  <label>Yes</label>
                </div>
                <div className="field">
                  <input
                    type="radio"
                    name="DSLRs"
                    value="No"
                    onChange={handleBodyChange}
                    // checked={formData.DL === "No"}
                  />
                  <label>No</label>
                </div>
                <label className="db">Do you have any additional lens?</label>
                <div className="field">
                  <input
                    type="radio"
                    name="DS"
                    value="Yes"
                    onChange={handleLensChange}
                    // checked={formData.DS === "Yes"}
                  />
                  <label>Yes</label>
                </div>
                <div className="field">
                  <input
                    type="radio"
                    name="DS"
                    value="No"
                    onChange={handleLensChange}
                    // checked={formData.DSL === "No"}
                  />
                  <label>No</label>
                </div>
                {/* <input className="btn-dark m-3" type="submit" /> */}
                {/* <Link to={`/data/${_id}`}>submit</Link> */}
                {/* <ModalDetail newPrice={newPrice} /> */}
                <h6>
                  <b>
                    <span className="gtValue">Approximate Price : </span>
                    <span className="gtPrice">₹ {newPrice}</span>
                  </b>
                </h6>
                {/* <label htmlFor="">
                <span className="error">Please provide Phone Number</span>
              </label> */}
                {/* <input
                {...register("number", { required: true })}
                className="m-2"
                onChange={handleChange}
              />
              {errors.number && (
                <span className="error">Phone Number is required</span>
              )} */}

                <div className="mt-3">
                  <input
                    type="checkbox"
                    {...register("terms", { required: true })}
                  />
                  {errors.terms && (
                    <span className="error m-2 pt-5">
                      Please accept the terms & conditions.
                    </span>
                  )}
                  <label className="pt-1 m-2">
                    I agree to the{" "}
                    <span>
                      <a href="/terms&condition" target="_blank">
                        Terms & conditions
                      </a>
                    </span>
                  </label>
                </div>
                <div>
                  <input className="btn-dark m-3" type="submit" />
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div>
          <p className="text-danger">{error}</p>
          <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <label>Enter your Phone number: </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={number}
              onChange={setNumber}
            />

            {/* <input
          type="number"
          value={number}
          placeholder="Enter Number"
          onChange={(e) => setNumber(e.target.value)}
        /> */}
            <br />
            <br />

            <div id="recaptcha-container" />
            <div>
              <Link to="/login">
                <button class="btn btn-danger">cancel</button> &nbsp;
              </Link>
              <button class="btn btn-primary" type="submit">
                Send Otp
              </button>
            </div>
          </form>
          {isSuccess ? (
            "Otp SuccessFull"
          ) : (
            <form
              onSubmit={verifyOtp}
              style={{ display: flag ? "block" : "none" }}
            >
              <input
                type="otp"
                placeholder="Enter otp"
                onChange={(e) => setOtp(e.target.value)}
              />

              <div>
                <Link to="/">
                  <button class="btn btn-success">cancel</button> &nbsp;
                </Link>
                <button class="btn btn-primary" type="submit">
                  Verify Otp
                </button>
              </div>
            </form>
          )}
        </div>
        <Link to={`/contact`}>
          <div className="container">
            <Button
              className="container"
              onClick={closeModal}
              variant="outline-success"
            >
              <b>Let's go for Contact</b>
            </Button>{" "}
          </div>
        </Link>
      </Modal>
    </div>
  );
};

export default GetValue;
