import "./styles.css";

import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useState } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import {useGetUserInfo} from "../../hooks/useGetUserInfo";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase-config";

export const ExpenseTracker = () => {
    const {addTransaction} = useAddTransaction(); 
    const {transactions,transactionTotals} = useGetTransactions();
    const [description,setDescription] = useState("");
    const [transactionAmount,setTransactionAmount] = useState("");
    const [transactionType,setTransactionType] = useState("expense");
    const {name,profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
        setDescription("");
        setTransactionAmount("");
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        }catch(err) {
            console.error(err);
        }
    }

    const {balance,income,expenses} = transactionTotals;




    return (
        <div className="body">
            <h1 className="heading">{name}'s Expense Tracker</h1>

            <div className="expense-tracker">
                <div className="container">
                    <div className="money">
                        <div className="balance">
                            <h3>Your Balance</h3>
                            {balance >= 0 ? <h5>Rs {balance}</h5> : <h5>-Rs {balance * -1}</h5>}
                        </div>
                        <div className="summary">
                            <div className="income">
                                <h4>Income</h4>
                                <p>Rs {income}</p>
                            </div>
                            <div className="expenses">
                                <h4>Expenses</h4>
                                <p>Rs {expenses}</p>
                            </div>
                        </div>
                    </div>
                    
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control desc" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div class="input-group mb-3">
                            <input type="number" class="form-control amount" placeholder="Amount" value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)}/>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="expense" value="expense" checked = {transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)}/>
                            <label class="form-check-label" htmlFor="expense">
                                Expense
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="income" value="income" checked = {transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                            <label class="form-check-label" htmlFor="income">
                                Income
                            </label>
                        </div>
                        <button type="submit" className="btn btn-light">Add Transaction</button>
                    </form>

                    
                </div>
                {profilePhoto && (
                    <div className="profile">
                        <img className="profile-photo" src={profilePhoto} />
                        <button type="button" className="sign-out-button btn btn-danger" onClick={signUserOut}>Sign Out</button>
                    </div>
                )}
            </div>
            <div className="transactions">
                <nav class="navbar bg-body-tertiary px-3 mb-3">
                    <a class="navbar-brand" href="#">Transactions</a>
                </nav>
                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                <ul>{transactions.map((transaction) => {
                    const {description,transactionAmount,transactionType} = transaction;
                    return(
                        <li>
                            <h4>{description}</h4>
                            <p>Rs {transactionAmount} . <label style={{color:transactionType==="expense" ? "red" : "green"}}>{transactionType}</label></p>
                        </li>
                    );
                })}</ul> 

                </div>  
            </div>
        </div>
    )
}























