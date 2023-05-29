export default function Product() {

    return (
        <div className="flex bg-white w-max-content flex-col items-center justify-center shadow-lg">
            <img src="./image.svg" alt='product' className="mt-5" />
            <div className="">

                <div className="p-5 flex flex-col gap-1">
                    <label className="text-gray-400 text-lg font-bold">Overview</label>
                    <label className="text-black text-sm flex gap-5 justify-between">
                        <span>Webasto Pure II laadpaal type 2</span>
                        <span>€ 1.0000,00</span>
                    </label>
                    <label className="text-[#24B7CD] text-sm mt-2 cursor-pointer">Edit</label>
                </div>
                <div className="text-black text-sm flex gap-5 font-bold p-5 bg-[#EDF6FB] justify-between">
                    <label>Eventually per month excl. btw</label>
                    <label>€ 10,00</label>
                </div>

                <div className="italic bg-[#EDF6FB] p-5 mt-10 flex-col flex gap-2">
                    <div className="text-black text-sm flex gap-5">
                        <span>Subtotal onetime costs excl. btw</span>
                        <span>€ 1.000,00</span>
                    </div>
                    <div className="text-black text-sm flex gap-5 justify-between">
                        <span>Discount name</span>
                        <span> - € 250,00</span>
                    </div>
                    <div className="text-black text-sm flex gap-5 font-bold justify-between">
                        <span>Onetime costs excl. btw</span>
                        <span>€ 750,00</span>
                    </div>
                </div>
            </div>
        </div>
    )
}