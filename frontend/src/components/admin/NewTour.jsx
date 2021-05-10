import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
// import Sidebar from './Sidebar'

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newTour, clearErrors } from "../../actions/tourActions";
// import { NEW_PRODUCT_RESET } from '../../constants/productConstants'

const NewTour = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [silverCost, setSilverCost] = useState(1);
  const [silverTransport, setSilverTransport] = useState("Economy");
  const [silverRoomType, setSilverRoomType] = useState("2 Star");
  const [silverBreakfast, setSilverBreakfast] = useState(false);
  const [silverLunch, setSilverLunch] = useState(false);
  const [silverDinner, setSilverDinner] = useState(false);

  const [goldCost, setGoldCost] = useState(1);
  const [goldTransport, setGoldTransport] = useState("Luxury");
  const [goldRoomType, setGoldRoomType] = useState("3 Star");
  const [goldBreakfast, setGoldBreakfast] = useState(false);
  const [goldLunch, setGoldLunch] = useState(false);
  const [goldDinner, setGoldDinner] = useState(false);

  const [platinumCost, setPlatinumCost] = useState(1);
  const [platinumTransport, setPlatinumTransport] = useState("Luxury");
  const [platinumRoomType, setPlatinumRoomType] = useState("4 Star");
  const [platinumBreakfast, setPlatinumBreakfast] = useState(false);
  const [platinumLunch, setPlatinumLunch] = useState(false);
  const [platinumDinner, setPlatinumDinner] = useState(false);

  const roomTypes = ["2 Star", "3 Star", "4 Star", "5 Star"];

  const transports = ["Economy", "Luxury"];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newTour);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/admin/tours");
      alert.success("Tour place created successfully");
      dispatch({ type: "NEW_TOUR_RESET" });
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const silver = {
      cost: silverCost,
      transport: silverTransport,
      roomType: silverRoomType,
      breakfast: silverBreakfast,
      lunch: silverLunch,
      dinner: silverDinner,
    };

    const gold = {
      cost: goldCost,
      transport: goldTransport,
      roomType: goldRoomType,
      breakfast: goldBreakfast,
      lunch: goldLunch,
      dinner: goldDinner,
    };

    const platinum = {
      cost: platinumCost,
      transport: platinumTransport,
      roomType: platinumRoomType,
      breakfast: platinumBreakfast,
      lunch: platinumLunch,
      dinner: platinumDinner,
    };

    const tourData = {
      name,
      description,
      images,
      silver,
      gold,
      platinum,
    };

    dispatch(newTour(tourData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-10 m-auto">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Tour</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <h3 className="mt-5 mb-4">Silver Package</h3>

                <div className="form-group">
                  <label htmlFor="name_field">Cost</label>
                  <input
                    type="number"
                    id="name_field"
                    className="form-control"
                    value={silverCost}
                    onChange={(e) => setSilverCost(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Room Type</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={silverRoomType}
                    onChange={(e) => setSilverRoomType(e.target.value)}
                  >
                    {roomTypes.map((roomType) => (
                      <option key={roomType} value={roomType}>
                        {roomType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Tranport Type</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={silverTransport}
                    onChange={(e) => setSilverTransport(e.target.value)}
                  >
                    {transports.map((transport) => (
                      <option key={transport} value={transport}>
                        {transport}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="silver_breakfast"
                    value={silverBreakfast}
                    onChange={(e) => setSilverBreakfast(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="silver_breakfast"
                  >
                    Breakfast
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="silver_lunch"
                    value={silverLunch}
                    onChange={(e) => setSilverLunch(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="silver_lunch">
                    Lunch
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="silver_dinner"
                    value={silverDinner}
                    onChange={(e) => setSilverDinner(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="silver_dinner">
                    Dinner
                  </label>
                </div>
                <h3 className="mt-5 mb-4">Gold Package</h3>

                <div className="form-group">
                  <label htmlFor="name_field">Cost</label>
                  <input
                    type="number"
                    id="name_field"
                    className="form-control"
                    value={goldCost}
                    onChange={(e) => setGoldCost(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Room Type</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={goldRoomType}
                    onChange={(e) => setGoldRoomType(e.target.value)}
                  >
                    {roomTypes.map((roomType) => (
                      <option key={roomType} value={roomType}>
                        {roomType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Tranport Type</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={goldTransport}
                    onChange={(e) => setGoldTransport(e.target.value)}
                  >
                    {transports.map((transport) => (
                      <option key={transport} value={transport}>
                        {transport}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gold_breakfast"
                    value={goldBreakfast}
                    onChange={(e) => setGoldBreakfast(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="gold_breakfast">
                    Breakfast
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gold_lunch"
                    value={goldLunch}
                    onChange={(e) => setGoldLunch(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="gold_lunch">
                    Lunch
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gold_dinner"
                    value={goldDinner}
                    onChange={(e) => setGoldDinner(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="gold_dinner">
                    Dinner
                  </label>
                </div>
                <h3 className="mt-5 mb-4">Platinum Package</h3>

                <div className="form-group">
                  <label htmlFor="name_field">Cost</label>
                  <input
                    type="number"
                    id="name_field"
                    className="form-control"
                    value={platinumCost}
                    onChange={(e) => setPlatinumCost(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Room Type</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={platinumRoomType}
                    onChange={(e) => setPlatinumRoomType(e.target.value)}
                  >
                    {roomTypes.map((roomType) => (
                      <option key={roomType} value={roomType}>
                        {roomType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Tranport Type</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={platinumTransport}
                    onChange={(e) => setPlatinumTransport(e.target.value)}
                  >
                    {transports.map((transport) => (
                      <option key={transport} value={transport}>
                        {transport}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="platinum_breakfast"
                    value={platinumBreakfast}
                    onChange={(e) => setPlatinumBreakfast(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="platinum_breakfast"
                  >
                    Breakfast
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="platinum_lunch"
                    value={platinumLunch}
                    onChange={(e) => setPlatinumLunch(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="platinum_lunch">
                    Lunch
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="platinum_dinner"
                    value={platinumDinner}
                    onChange={(e) => setPlatinumDinner(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="platinum_dinner">
                    Dinner
                  </label>
                </div>

                
                <div className="form-group mt-5">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewTour;
