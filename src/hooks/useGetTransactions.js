import {useEffect,useState} from "react";
import {query,collection,where,orderBy,onSnapshot} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {useGetUserInfo} from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions,setTransactions] = useState([]);
    const transactionCollectionRef = collection(db,"transactions");
    const [transactionTotals,setTransactionTotals] = useState({balance:0.0 , income: 0.0 , expenses:0.0});

    const {userID} =useGetUserInfo();
    let unsubscribe;
    const getTransactions = async () =>{
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID","==",userID),
                orderBy("createdAt")
            );
            unsubscribe=onSnapshot(queryTransactions,(snapshot) => {
                let totalIncome=0;
                let totalExpenses=0;
                let docs = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id=doc.id;
                    docs.push({...data,id});
                    if(data.transactionType === "expense"){
                        totalExpenses += Number(data.transactionAmount);
                    }else{
                        totalIncome += Number(data.transactionAmount);
                    }
                    // console.log(totalExpenses,totalIncome);
                });
                setTransactions(docs);
                let balance = totalIncome-totalExpenses;
                setTransactionTotals({
                    balance,
                    income:totalIncome,
                    expenses:totalExpenses
                });
            });
            
        }catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        getTransactions();
    },[]);
    return {transactions,transactionTotals};
};