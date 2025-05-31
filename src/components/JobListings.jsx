import { SlLocationPin } from "react-icons/sl";
import { CiCalendar } from "react-icons/ci";
import { PiMoneyDuotone } from "react-icons/pi";

function JobListings(props){

    const { jobsData, handleNotInterested } = props;

    if(!jobsData.length){
        return <p>No Internships Found</p>;
    }

    function getPostedDateLabel(timestamp){
        const postedDate = new Date(timestamp * 1000); 
        const now = new Date();
        const diffTime = now - postedDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if(diffDays === 0) 
            return "Today";
        if(diffDays === 1) 
            return "1 day ago";
        if(diffDays <= 6) 
            return `${diffDays} days ago`;
        
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }

    return (
        <>
            {
                jobsData.map((job, index) => (
                    <div key={index} className="jobListingsItems" >
                        
                        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center"}}>
                            <div>
                                <p style={{ marginBottom: "-7px", fontSize: "17px" }}><strong>{job.title}</strong></p>
                                <p>{job.company_name}</p>
                            </div>
                            <div>
                                {
                                    job.company_logo ? 
                                            <img src={`${job.company_logo}`} alt={`${job.company_name} logo`} style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                                            : 
                                            null
                                }
                            </div>
                        </div>
                        
                        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center"}}>
                            <span style={{marginRight: "25px"}}><SlLocationPin /> {job.location_names.join(", ")}</span>
                            <span style={{marginRight: "25px"}}><PiMoneyDuotone /> {job.stipend?.salary || "Not disclosed"}</span>
                            <span><CiCalendar /> {job.duration}</span>
                        </div>
                        <br />
                        <span style={{ backgroundColor: "#e5e6e6", width: "90px", padding: "5px", borderRadius: "8px", marginRight: "25px" }}>{getPostedDateLabel(job.postedOnDateTime)}</span> 
                        <button className="interestedNotInterested" style={{ backgroundColor: "rgba(244, 8, 8, 0.581)"}} onClick={() => handleNotInterested(job.id)}>Not Interested</button>
                    </div>
                    )
                )
            }
        </>
    );
}

export default JobListings;