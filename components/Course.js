import CheckoutButton from "../components/CheckoutButton";
export default function Course({ courseLogo, courseTitle, coursePrice }) {
    return (
        <div className="h-fit w-11/12 rounded-xl bg-gray-container flex flex-col m-4 min-w-1/2 lg:w-1/5">   
            <div className="bg-primary-green w-16 h-16 mt-4 ml-4 rounded-2xl flex justify-center items-center text-white text-4xl"><img src={courseLogo} className="w-12 h-12"/></div>
            <h1 className="text-white font-bold ml-4">{courseTitle} <br/> Handbook</h1>
            <h3 className="text-white ml-4">${coursePrice}</h3>
            <CheckoutButton customPrice={coursePrice*100}/>
        </div>
    )
}