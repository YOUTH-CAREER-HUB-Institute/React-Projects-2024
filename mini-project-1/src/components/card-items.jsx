import React from 'react'

function CardItems({aboutName,aboutData,btnText,images}) {
    return (
        <div className='flex flex-row flex-wrap justify-center'>
        <div className="w-[300px] rounded-md border mt-5 ">
            <img
                src={images}
                alt="Laptop"
                className="h-[200px] w-full rounded-md object-cover"
            />
            <div className="p-4">
                <h1 className="text-lg font-semibold">{aboutName}</h1>
                <p className="mt-3 text-sm text-white font-bold">
                    {aboutData}
                </p>
                <button
                    type="button"
                    className="mt-4 rounded-sm bg-yellow-500 px-2.5 py-1 text-[10px] font-semibold text-black shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black p-5 font-bold"
                >
                    {btnText}
                </button>
            </div>
        </div>
        </div>
    )
}

export default CardItems;
