import React, {useState, useEffect} from "react";
import AdminCheck from "../components/AdminCheck";
import { UserDataContext } from "../lib/context";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import CheckoutButton from "../components/CheckoutButton";

export default function Payments() {
    const { user } = useContext(UserDataContext);
    const [email, setEmail] = useState("");
    const [invoicePrice, setInvoicePrice] = useState("");
    const [invoices, setInvoices] = useState([]);


    useEffect(() => {
        loadInvoices();
    }, [invoices])
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handleInvoicePriceChange(evt) {
        setInvoicePrice(evt.target.value);
    }

    async function sendInvoice(evt) {
        evt.preventDefault();
        const response1 = await fetch(`/api/stripe/retrieve-customer?email=${email}`);
        const data1 = await response1.json();
        let customerId = data1.customerId;
        
        if(customerId === null) {
            const response2 = await fetch(`/api/stripe/create-customer?email=${email}`);
            const response3 = await fetch(`/api/stripe/retrieve-customer?email=${email}`)
            const data2 = await response3.json();
            customerId = data2.customerId;
        }
        

        const response4 = await fetch("/api/stripe/create-invoice", {
            method: "POST",
            body: JSON.stringify({
              invoicePrice: `${invoicePrice * 100}`,
              customerId: customerId
            }),
        });

        setEmail("");
        setInvoicePrice("");
        toast.success("Invoice Sent");


    }
    async function loadInvoices() {
        const response = await fetch(`/api/stripe/retrieve-invoices?email=${user?.email}`);
        const data = await response.json();
        let invoices = data.invoices.data.map((invoice) => invoice.amount_due/100);
        setInvoices(invoices);
    }

    async function payInvoice(evt) {
        evt.preventDefault();
        const response = await fetch(`/api/stripe/pay-invoice`);
        const data = await response.json();
        console.log(data);
    }
    return (
        <div>
            {user?.email === "andrewdwyer27@gmail.com" 
            ? 
            <div className="border-2 flex justify-center">
                <form className="flex flex-col m-3">
                    <input placeholder="User's Email" className="p-3 rounded-xl mt-10" value={email} onChange={handleEmailChange}/>
                    <input placeholder="$" className="p-3 rounded-xl mt-10" value={invoicePrice} onChange={handleInvoicePriceChange}/>
                    <button onClick={sendInvoice} className="bg-blue-600 p-3">Send Invoice</button>
                </form>
            </div>
            :
            <div>
                <h1 className="text-center text-white font-bold">Payments</h1>
                <div className="flex justify-center flex-wrap">
                    {invoices.map((invoice) => 
                    <div className="bg-gray-container border-2 p-3 w-9/12 text-white font-bold text-center rounded-lg mt-10">
                        ${invoice}
                        <h1>Coding Lesson</h1>
                        <form onSubmit={payInvoice} method="POST">
                            <CheckoutButton customPrice={invoice*100}/>
                        </form>
                        
                    </div>)}
                </div>
            </div>
            
            }
            
        </div>
    )
}