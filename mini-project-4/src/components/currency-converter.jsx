import React, { useEffect } from 'react';
import { useState } from 'react';
import CurrencyDropdown from './currency-dropdown';
import { IoMdSwap } from "react-icons/io";


const CurrencyConverter = () => {
    // state variables
    const [currencies, setCurrencies] = useState([]);
    const [amount, setamount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setconvertedAmount] = useState(null);
    const [conversionMoment, setconversionMoment] = useState(false)


    //function to fetch the currensies form api
    const fetchCurrencies = async () => {
        try {
            //steps to fetch and convert the data according to js
            const result = await fetch("https://api.frankfurter.app/currencies");
            const data = await result.json();
            //update this data 
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error("Error Fetching", error);
        }
    }

    //call the fetchCurrencies methhod to check the api is working or not
    useEffect(() => {
        fetchCurrencies();
    }, []);

    //check the currencies are listed or not
    //console.log(currencies);

    //to convert the currencies
    const convertCurrency = async () => {
        //if amount is not present no conversion
        if (!amount) return;
        //else first change the conversion moment to true
        //and start the conversion process
        setconversionMoment(true);
        //actual conversio  is now start
        try {
            //fetching happen
            const result = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await result.json();
            //convert the data
            setconvertedAmount(data.rates[toCurrency] + " " + toCurrency);

        } catch (error) {
            console.error("Error Fetching", error);
        } finally {
            setconversionMoment(false);
        }
    };

    //function to swap currencies
    const swapCuyrrencies = ()=>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };


    return (
        <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
            {/* title of application */}
            <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>

            {/* list of countries form api */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
                <CurrencyDropdown title="From:" currencies={currencies} currency={fromCurrency} setCurrency={setFromCurrency} />
                {/* SWAP CURRENCY BUTTON */}
                <div className='flex justify-center -mb-5 sm:mb-0'>
                    <button
                        onClick={swapCuyrrencies}
                        className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'
                    >
                        {/* swap icon */}
                        <IoMdSwap className='text-xl text-gray-700' />

                    </button>
                </div>
                <CurrencyDropdown title="To:" currencies={currencies} currency={toCurrency} setCurrency={setToCurrency} />
            </div>

            {/* amount input field */}
            <div className='mt-4'>
                <label
                    htmlFor="amount"
                    className='block text-sm font-medium text-gray-700'
                >Amount
                </label>
                <input
                    type="number"
                    className='w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus: ring-indigo-500 mt-1 focus:ring-2'
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                />
            </div>

            {/* amount convert button */}
            <div className='flex justify-end mt-6'>
                <button
                    className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 font-semibold
                        ${conversionMoment ? "animate-pulse" : ""}
                    `}
                    onClick={convertCurrency}
                >
                    Convert
                </button>
            </div>

            {/* display converted amount */}
            {convertedAmount && (
                <div className='mt-4 text-lg font-medium text-right text-gray-600'>
                    Converted Amount: {convertedAmount}
                </div>
            )}


        </div>
    )
}

export default CurrencyConverter
