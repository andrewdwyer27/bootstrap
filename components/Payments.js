import React, {useState, useEffect} from "react";
import AdminCheck from "../components/AdminCheck";
import { UserDataContext } from "../lib/context";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
export default function Payments() {
    const { user } = useContext(UserDataContext);
    const [email, setEmail] = useState("");
    const [invoicePrice, setInvoicePrice] = useState("");
    const [invoices, setInvoices] = useState([]);
    const [seeUserInvoices, setSeeUserInvoices] = useState(false);


    useEffect(() => {
        loadInvoices();
    }, [user])

    async function loadInvoices() {
        const response1 = await fetch(`/api/stripe/retrieve-customer?email=${email}`);
        const data1 = await response1.json();
        let customerId = data1.customerId;
        const response2 = await fetch(`api/stripe/retrieve-invoices?customerId=${customerId}`);
        let data2 = await response2.json();
        let invoices = data2.invoices.data.map((invoice) => ({
            invoiceURL: invoice.hosted_invoice_url,
            invoicePrice: invoice.amount_due/100,
            isPaid: invoice.paid
        }))
        setInvoices(invoices);
    }

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
        

        const response4 = await fetch(`/api/stripe/create-invoice?invoicePrice=${invoicePrice * 100}&customerId=${customerId}`);
        

        setEmail("");
        setInvoicePrice("");
        toast.success("Invoice Sent");


    }
    async function handleSeeUserInvoices() {
        setSeeUserInvoices(!seeUserInvoices);
        console.log("Handle function");
        if(seeUserInvoices) {
            const response1 = await fetch(`/api/stripe/retrieve-customer?email=${email}`);
            const data1 = await response1.json();
            let customerId = data1.customerId;
            const response2 = await fetch(`api/stripe/retrieve-invoices?customerId=${customerId}`);
            let data2 = await response2.json();
            let invoices = data2.invoices.data.map((invoice) => ({
                invoiceURL: invoice.hosted_invoice_url,
                invoicePrice: invoice.amount_due/100,
                isPaid: invoice.paid
            }))
            console.log(invoices);
            setInvoices(invoices);

        }        
    }
    
    return (
        <div className="bg-backgroundgray min-h-screen w-full">
            {user?.email === "andrewdwyer27@gmail.com" 
            ? 
                <div>
                    <h1 className="text-white text-center font-bold">Payments</h1>
                    <form onSubmit={sendInvoice}className="flex flex-col items-center">
                        <input placeholder="User's Email" value={email} onChange={handleEmailChange} className="m-3 w-3/12 p-3 rounded-lg"/>
                        <input placeholder="$" value={invoicePrice} onChange={handleInvoicePriceChange} className="m-3 w-3/12 p-3 rounded-lg"/>
                        <div className="flex justify-around w-3/12">
                            <button type="button" className="p-3 rounded-lg bg-primary-green text-white font-bold hover:drop-shadow-lg" onClick={handleSeeUserInvoices}>See User's Invoices</button>
                            <button className="p-3 rounded-lg bg-primary-green text-white font-bold hover:drop-shadow-lg">Send Invoice</button>
                        </div>
                    </form>
                    <div>
                        {seeUserInvoices 
                        ? 
                        <div>
                            <div className="flex justify-center flex-wrap">
                                {invoices?.map((invoice) => 
                                <div className="bg-gray-container p-3 w-9/12 text-white font-bold text-center rounded-lg mt-10">
                                    <h1>Coding Lesson</h1>
                                    <h3>${invoice.invoicePrice}</h3>
                                    <Link href={invoice.invoiceURL || "#"}>
                                        {!invoice.isPaid 
                                        ? 
                                        <button className="bg-primary-green p-3 rounded-xl text-white hover:drop-shadow-lg w-2/12">
                                            Pay Now
                                        </button>
                                        :
                                        <button className="bg-primary-red p-3 rounded-xl text-white hover:drop-shadow-lg w-2/12">
                                            Paid
                                        </button>
                                        }    
                                    </Link>
                                </div>)}
                            </div>
                        </div> 
                        : null
                        }
                    </div>
                </div>
                
                

            :
            <div className="bg-backgroundgray min-h-screen w-full">
                <h1 className="text-center text-white font-bold">Payments</h1>
                <div className="flex justify-center flex-wrap">
                    {invoices?.map((invoice) => 
                    <div className="bg-gray-container p-3 w-9/12 text-white font-bold text-center rounded-lg mt-10">
                        <h1>Coding Lesson</h1>
                        <h3>${invoice.invoicePrice}</h3>
                        <Link href={invoice.invoiceURL || "#"}>
                            {!invoice.isPaid 
                            ? 
                            <button className="bg-primary-green p-3 rounded-xl text-white hover:drop-shadow-lg w-2/12">
                                Pay Now
                            </button>
                            :
                            <button className="bg-primary-red p-3 rounded-xl text-white hover:drop-shadow-lg w-2/12">
                                Paid
                            </button>
                            }    
                        </Link>
                    </div>)}
                </div>
            </div>
            
            }
            
        </div>
    )
}