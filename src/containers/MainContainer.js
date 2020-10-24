import React, { useState, useEffect } from 'react';
import apiRequest from '../dataHandling/apiRequest';
import Endpoints from '../components/Endpoints';
import DisplayContainer from '../containers/DisplayContainer';


const MainContainer = () => {
    
    const [mainObject, setMainObject] = useState({});
    const [endPoints, setEndPoints] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        apiRequest.get()
            .then((response) => {
                validateResponseObj(response.data);
            }, (error) => {
                console.log(error);
            }
            )
    }, [])

    //Validation for initial response object
    //Performs initial date validation
    const validateResponseObj = (res) => {
        
        if (res.created_at < res.updated_at){
            if(checkRepoCount(res)) {
                setMainObject(res);
            } else {
                console.log("mismatched repo count")
            }
        } else {
            console.log("error in dating");
        }

    };

    const checkRepoCount = async (obj) => {
        let count = obj.public_repos;
        let pageCount = 1;
        let repoCount = await getPublicRepos();


        while (repoCount < count) {
            pageCount++;
            let newCount = await getPublicRepos(pageCount);
            repoCount += newCount
        }
        return (count === repoCount) ? true : false;
    };

    const getPublicRepos = async (pageCount = 1) => {
        let repoCount;
        if (pageCount < 2) {
            repoCount = await apiRequest.get("/repos").then(response => response.data.length)

        } else {
            repoCount = await apiRequest.get("/repos", {
                params: {
                    page: pageCount
                }
            }).then(response => response.data.length);
        }
        
        return repoCount;
    }

    
    //Separating urls from main object to create separate objects for navigation
    const getURLs = (obj) => {
        const base = "https://api.github.com/orgs/BoomTownROI";
        let urlArray = [];

        Object.values(obj).map(val => {
            if(typeof val === "string") {       
                if (val.includes(base)) {
                    let slug = val.substring(base.length);
                    if (slug.length > 0) {
                        
                        urlArray.push({
                            "name": sanitizeSlug(slug),
                            "slug": slug
                        })};
                    
                }
            }
            
        })
        setEndPoints(urlArray);
    };

    //transforming slug into nav menu titles
    const sanitizeSlug = (slug) => {
        let firstCap = slug.substring(1, 2).toUpperCase();
        let remainingSlug;
        if(slug.includes("{")){
            remainingSlug = slug.substring(2, slug.indexOf("{"));
        } else {
            remainingSlug = slug.substring(2);
        }
        return firstCap.concat(remainingSlug);
    };

    //Initializing the nav menu
    const handleClick = () => {
        getURLs(mainObject);
    }

    //Using nav links to pull 2nd level data 
    const followEndpoint =  (slug) => {
        setDisplayData([]);
        apiRequest.get(slug)
        .then((response) => {
            if (response.status === 200) {
                setDisplayData(response.data)
            }
        }, (error) => {
            setDisplayData([{
                "id": "*",
                "type": "Sorry there is currently no public data available."
            }])
        })
    }

    return (
      <div className="main-container">
        <p>
          This challenge asked for the user to retrieve the main data object
          from{" "}
          <a href="https://api.github.com/orgs/boomtownroi">
            https://api.github.com/orgs/boomtownroi
          </a> From that object perform 2 validations. 
        </p>
        <li>1. Confirm that the updated_at time was greater than created_at</li>
        <li>2. Confirm that the total number of repos retrievable from the /repos url matches the public_repos number from the top level object.</li>
        <p>Next the challenge asked to explore all of the possible endpoints provided in the top level object. <br/>
            If the status code returned 200 then display the results, if not alert the user.
        </p>
        <button onClick={handleClick}>Explore API</button>
        {endPoints.length > 0 ? (
          <Endpoints endpoints={endPoints} request={followEndpoint} />
        ) : null}
        {displayData.length > 0 ? (
          <DisplayContainer data={displayData} />
        ) : null}
      </div>
    );
}

export default MainContainer;