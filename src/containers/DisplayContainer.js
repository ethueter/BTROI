import React, { useState, useEffect } from 'react';
import DisplayItem from '../components/DisplayItem';


const DisplayContainer = ({ data }) => {
    const [pageNum, setPageNum ] = useState([]);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        displayPage(1)
        displayPageNums()
    }, []);

    //Changing display to match page selection
    const displayPage = (pageNum = 1) => {
        switch(pageNum){
            case 1: 
                setPageData(data.slice(0, 10));
                break;
            case 2:
                setPageData(data.slice(10, 20));
                break;
            case 3:
                setPageData(data.slice(20));
                break;
        }  
    };

    //Determing the number of page buttons to display
    const displayPageNums = () => {
        let numPages;
        let pageArr = [];

        if(data.length % 10 === 0){
            numPages = Math.floor(data.length / 10);
        } else {
            numPages = Math.floor(data.length / 10) + 1;
        };

        for(let i = 0; i < numPages; i++){
            pageArr[i] = i+1
        };
        
        setPageNum(pageArr);
    };



    return (
        <div className="display-container">
            {data[0].name ? 
            <h3>ID - Repo Name</h3> : <h3>ID - Type</h3>}
            {pageData.map(item => <DisplayItem key={item.id} item={item} />)}
            <span>
                {pageNum.map(num => <button key={num} onClick={()=>displayPage(num)}>{num}</button>)}
            </span>
        </div>
    )
}

export default DisplayContainer;