# BTROI
Tech Assessment

This project was completed using React and a custom WebPack build. <br/>
The 3rd party library Axios was use to manage Http requests. <br/>
The project completes the following assignment. <br/>

Technical Assessment 

Using the GitHub API and your language of choice, pull top-level details for the BoomTownROI organization at:
https://api.github.com/orgs/boomtownroi
From the top-level organization details result object, complete the following
1. Output Data:

- Follow all urls containing "api.github.com/orgs/BoomTownROI" in the path, and for responses with a 200 status code, retrieve and display all 'id' keys/values in the response objects. For all non-200 status codes, give some indication of the failed request. HINT: Devise a way for the end user to make sense of the id values, related to the original resource route used to retrieve the data.

2. Perform Verifications:
- On the top-level BoomTownROI organization details object, verify that the 'updated_at' value is later than the 'created_at' date.

- On the top-level details object, compare the 'public_repos' count against the repositories array returned from following the 'repos_url', verifying that the counts match. HINT: The public repositories resource only returns a default limit of 30 repo objects per request.
