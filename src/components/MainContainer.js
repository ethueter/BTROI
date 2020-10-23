import React, { useState, useEffect } from 'react';
import apiRequest from '../dataHandling/apiRequest';
import Endpoints from '../components/Endpoints';
const MainContainer = () => {
    //most function will be performed here
    const [mainObject, setMainObject] = useState({});
    const [endPoints, setEndPoints] = useState([]);

    const validateResponseObj = (res) => {
        
        if (res.created_at < res.updated_at){
            console.log(Object.values(res))
            if(checkRepoCount(res)) {
                setMainObject(res);
                console.log("test2")
            } else {
                console.log("mismatched repo count")
            }
        } else {
            console.log("error in dating");
        }

    };

    useEffect(()=> {
        apiRequest.get()
            .then((response) => {
                validateResponseObj(response.data);
            }, (error) => {
                console.log(error);
            }
            )
    }, [])

    const getURLs = (obj) => {
        const base = "https://api.github.com/orgs/BoomTownROI";
        let urlArray = [];

        Object.values(obj).map(val => {
            if(typeof val === "string") {       
                if (val.includes(base)) {
                    let slug = val.substring(base.length);
                    if (slug.length > 0) urlArray.push(slug);
                    
                }
            }
            
        })
        setEndPoints(urlArray);
    };

    const checkRepoCount = async (obj) => {
        let count = 30;
        let repoCount =  await apiRequest.get("/repos").then(response => response.data.length)
        console.log("testing repo count", repoCount);
        if(count === repoCount) {
            return true;
        } else {
            return false;
        }
    };
    
    
    const handleClick = () => {
        getURLs(mainObject);
    }

    const followEndpoint = (slug) => {
        apiRequest.get(slug)
        .then((response) => {
            console.log(response.status);
        }, (error) => {
            alert("Sorry no public data found.")
        })
    }

    return (
        <div>
            <h3>I will be the main container.</h3>
            <button onClick={handleClick}>Explore API</button>
            {endPoints.length > 0 ? 
            <Endpoints endpoints={endPoints} request={followEndpoint} /> : null }
        </div>
    )
}

export default MainContainer;