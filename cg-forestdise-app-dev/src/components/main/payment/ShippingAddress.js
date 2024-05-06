import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, getAddress, addAdressId } from "../../../features/payment/paymentSlice";

Modal.setAppElement("#root");

function Address() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddress, setIsAddress] = useState(true);
  const dispatch = useDispatch();
  const [addressNew, setAddressNew] = useState({
    id: '',
    name:'',
    district: '',
    ward: '',
    city: '',
    street: '',
  });
  const { userInfo } = useSelector((state) => state.user);
  const { address } = useSelector((state) => state.payment);
  const [formAddress, setFormAddress] = useState({
    id: "",
    userId: userInfo.id,
    street: "",
    ward: "",
    district: "",
    city: "",
    defaultAddress:false,
  });

  const handleChange = (event) => {
    setFormAddress({
      ...formAddress,
      [event.target.name]: event.target.value,
    })
  };

  const handleFormSubmit = (event) => {
    dispatch(addNewAddress(formAddress));
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (address.length <= 0 && userInfo !== null) {
      dispatch(getAddress(userInfo.id));
    }
  }, []);

  return (
    <div className="px-20 py-3">
      <div>
        {isAddress ? (
          <div className="grid grid-cols-3 border-b border-gray-400">
            <div>
              <h2 className="text-xl font-bold font-sans">
                1. Shipping address
              </h2>
            </div>
            <div className="text-md">
              <div>
                <div className="w-23">
                  <div>{addressNew.name}</div>
                  <div>
                    <span>{addressNew.street}</span>
                    <span class="px-2">{addressNew.ward}</span>
                    <span>{addressNew.district}</span>
                    <span class="px-2">{addressNew.city}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                className="text-blue-600 hover:text-orange-500 hover:underline"
                onClick={() => setIsAddress(!isAddress)}
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-xl font-bold font-sans text-orange-700">
                <span className="pr-4">1</span>Choose a shipping address
              </h2>
            </div>
            <div className="text-right">
              <button
                className="text-blue-600 hover:text-orange-500 hover:underline text-md"
                onClick={() => setIsAddress(!isAddress)}
              >
                Close
              </button>
              <button className="pl-2" onClick={() => setIsAddress(!isAddress)}>
                <GrClose />
              </button>
            </div>
            <div className="col-span-2 border border-gray-400 rounded-md mx-8 mt-2">
              <div className="px-6">
                <div className="grid grid-cols-2 border-b border-gray-400 my-4">
                  <div>
                    <h2 className="text-xl font-bold font-sans">
                      Your addresses
                    </h2>
                  </div>
                  <div className="text-right">
                    <button className="text-md font-sans font-bold text-blue-600 hover:text-orange-500 hover:underline">
                      Shipping to more than one address?
                    </button>
                  </div>
                </div>
                {address.map((item) => (
                  <div
                    key={item.id}
                    className="text-md rounded-md border border-orange-300 bg-orange-100/40 my-2 p-3"
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mr-2"
                      value={item.id}
                      onClick={() => {
                        dispatch(addAdressId({ addressId: item.id }));
                        setAddressNew({
                          id: item.id,
                          name: userInfo.clientName,
                          district: item.district,
                          ward: item.ward,
                          city: item.city,
                          street: item.street,
                        });
                      }}
                    />
                    <span className="font-semibold">{item.name}</span>{" "}
                    <span>{item.street}</span>
                    <span>{item.ward}</span>
                    <span>{item.district}</span>
                    <span>{item.city}</span>
                    <button className="text-blue-600 px-2 text-sm hover:text-orange-500 hover:underline">
                      Edit address
                    </button>
                  </div>
                ))}
                <div className="flex">
                  <div className="flex-none">
                    <button className="text-gray-400 text-3xl hover:text-gray-300">
                      +
                    </button>
                  </div>
                  <div className="flex-initial pl-2">
                    <button
                      className="text-blue-600 mt-1 hover:text-orange-500 hover:underline"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Add a new address
                    </button>
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={() => setIsModalOpen(false)}
                      contentLabel="Add New Address"
                      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-2/5 rounded-lg border border-gray-400"
                    >
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-2 my-5 text-gray-600 hover:text-gray-500 rounded-md border-4 border-sky-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="text-lg bg-gray-200 py-5 pl-6 rounded-t-lg font-semibold">
                        Enter a new shipping address
                      </div>
                      <h2 className="text-2xl font-semibold p-6">
                        Add New Address
                      </h2>
                      <form onSubmit={handleFormSubmit}>
                        <div className="px-6 w-5/6">
                          <div>
                            <div className="flex flex-col items-start">
                              <label className="text-base font-semibold ml-4">
                                Street:
                              </label>
                              <input
                                type="text"
                                name="street"
                                value={formAddress.street}
                                onChange={handleChange}
                                className="form-input w-full mt-1 ml-4 rounded-lg px-3 py-2 border border-gray-400"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-col items-start">
                              <label className="text-base font-semibold ml-4">
                                Ward:
                              </label>
                              <input
                                type="text"
                                name="ward"
                                value={formAddress.ward}
                                onChange={handleChange}
                                className="form-input w-full mt-1 ml-4 rounded-lg px-3 py-2 border border-gray-400"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-col items-start">
                              <label className="text-base font-semibold ml-4">
                                District:
                              </label>
                              <input
                                type="text"
                                name="district"
                                value={formAddress.district}
                                onChange={handleChange}
                                className="form-input w-full mt-1 ml-4 rounded-lg px-3 py-2 border border-gray-400"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-col items-start">
                              <label className="text-base font-semibold ml-4">
                                City:
                              </label>
                              <input
                                type="text"
                                name="city"
                                value={formAddress.city}
                                onChange={handleChange}
                                className="form-input w-full mt-1 ml-4 rounded-lg px-3 py-2 border border-gray-400"
                              />
                            </div>
                          </div>
                          <button
                            className="text-sm font-semibold bg-yellow-300 rounded-md hover:bg-yellow-400 px-4 p-1 my-5 ml-6"
                            type="submit"
                          >
                            Use This Address
                          </button>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200/30 border-t border-gray-400 pl-2">
                <button
                  className="bg-yellow-300 rounded-lg font-semibold text-sm m-3 px-2 p-1 hover:bg-yellow-400"
                  onClick={() => setIsAddress(true)}
                >
                  Use this address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Address;