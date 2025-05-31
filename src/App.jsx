import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import JobListings from "./components/JobListings";

function App(){
  
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const [filters, setFilters] = useState({
    profile: [],
    location: [],
    duration: [],
  });
  
  const [notInterestedJobs, setNotInterestedJobs] = useState([]);
  const [showUndoModal, setShowUndoModal] = useState(false);

  const API = "https://internshala.com/hiring/search";

  useEffect(() => {

    async function fetchJobsData(){
      
      try{

        let response = await fetch(API);
        const data = await response.json();

        if(data.internships_meta && data.internship_ids){
          const internshipsArray = data.internship_ids.map(id => data.internships_meta[id]);
          setJobsData(internshipsArray);
          setFilteredJobs(internshipsArray);
        } 
        
        else{
          console.log("Error in Fetching the Data");
        }
      } 
      
      catch(err){
        console.log(err);
        setJobsData([]);
        setFilteredJobs([]);
      }

    }

    fetchJobsData();
  }, []);


  console.log(jobsData);



  const profilesOptions = Array.from(new Set(jobsData.map(job => job.title))).sort();

  const locationsOptions = Array.from(new Set(jobsData.flatMap(job => job.location_names))).sort();

  const durationOptions = Array.from(new Set(jobsData.map(job => job.duration))).sort();

  


  
  useEffect(() => {

    let result = jobsData;

    if(filters.profile.length > 0){
      result = result.filter(job => filters.profile.includes(job.title));
    }

    if(filters.location.length > 0){
      result = result.filter(job => job.location_names.some(loc => filters.location.includes(loc)));
    }

    if(filters.duration.length > 0){
      result = result.filter(job => filters.duration.includes(job.duration));
    }

    setFilteredJobs(result);

  }, [filters, jobsData]);

  function handleResetFilters(){
    setFilters({
      profile: [],
      location: [],
      duration: [],
    });
  }

  return (
    <>
      <h1 className="Heading">Internshala</h1>



      {/* button will be visible when the it is not desktop view */}

      <button className="FiltersButton" onClick={() => setShowFiltersModal(true)}>Filters</button>


      {/* Modal for Displaying Filters When device is out of Desktop Mode */}

      {
        showFiltersModal && (
          <div className="FiltersModalOverlay" onClick={() => setShowFiltersModal(false)}>
            <div className="FiltersModalContent" onClick={(e) => e.stopPropagation()}>
              <button className="CloseModalBtn" onClick={() => setShowFiltersModal(false)}>&times;</button>
              <Filters filters={filters} setFilters={setFilters} profilesOptions={profilesOptions} locationsOptions={locationsOptions} durationOptions={durationOptions} />
            </div>
          </div>
        )
      }



      
      {/* button for undoing the not interested jobs */}

      <button onClick={() => setShowUndoModal(true)} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, backgroundColor: '#0073e6', color: 'white', padding: '10px 15px', border: 'none',  borderRadius: '8px', cursor: 'pointer' }} >
        Undo Not Interested Jobs
      </button>


      {/* Modal for Displaying No Interested Jobs for Undoing */}

      {
        showUndoModal && (
          <div className="modalOverlay" onClick={() => setShowUndoModal(false)}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <h2>Not Interested Jobs</h2>
              <button onClick={() => setShowUndoModal(false)} style={{ float: "right" }}>&times;</button>
              {
                jobsData.filter(job => notInterestedJobs.includes(job.id))
                  .map((job, idx) => (
                    <div key={idx} className="jobListingsItems" style={{ marginTop: "15px" }}>
                      <h4>{job.title}</h4>
                      <p>{job.company_name}</p>
                      <button onClick={() => setNotInterestedJobs(prev => prev.filter(id => id !== job.id))} style={{ backgroundColor: "#0f0", border: "none", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>
                        Interested
                      </button>
                    </div>
                ))
              }
            </div>
          </div>
        )
      }


      
      
      {/* Two Interfaces- Filters & Job Listings  */}

      <div className="Parent">
        <div className="FiltersParent">
          <Filters filters={filters} setFilters={setFilters} profilesOptions={profilesOptions} locationsOptions={locationsOptions} durationOptions={durationOptions} />
          <br />
          <button style={{border: "none", backgroundColor: "white", color: "#0073e6", fontSize: "medium"}} onClick={handleResetFilters}>Clear All</button>
        </div>

        <div className="JobListingsParent">
          <JobListings jobsData={filteredJobs.filter(job => !notInterestedJobs.includes(job.id))} handleNotInterested={jobId => {setNotInterestedJobs(prev => [...prev, jobId])}}/>
        </div>
      </div>


    </>
  );
}

export default App;