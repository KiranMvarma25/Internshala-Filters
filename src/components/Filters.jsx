import { useState } from "react";

export default function Filters(props){
    
    const { filters, setFilters, profilesOptions, locationsOptions, durationOptions } = props;

    return (
        <div className="multiSelectDropdown" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <p>Profile</p>
            <MultiSelectDropdown options={profilesOptions} selected={filters.profile} setSelected={vals => setFilters({ ...filters, profile : vals })} placeholder="Filter by Profile" />
            <p>Location</p>
            <MultiSelectDropdown options={locationsOptions} selected={filters.location} setSelected={vals => setFilters({ ...filters, location : vals })} placeholder="Filter by Location" />
            <p>Duration</p>
            <MultiSelectDropdown options={durationOptions} selected={filters.duration} setSelected={vals => setFilters({ ...filters, duration : vals })} placeholder="Filter by Duration" />
        </div>
    );
}



// Reusable Component for Showing 3 Filters

function MultiSelectDropdown(props){
  
    const { options, selected, setSelected, placeholder } = props;

    const [open, setOpen] = useState(false);

    function toggleOption(option){
        if(selected.includes(option)){
            setSelected(selected.filter(item => item !== option));
        } 
        else{
            setSelected([...selected, option]);
        }
    }

    function removeOption(option){
        setSelected(selected.filter(item => item !== option));
    }

    return (
        
        <div className="filterParent" tabIndex={0}>
            
            <div onClick={() => setOpen(!open)} className="Filters" >
                {selected.length === 0 && <span style={{ color: "#aaa" }}>{placeholder}</span>}

                {
                    selected.map(item => (
                        <div key={item} className="filterItem" >
                            {item}
                            <button onClick={(e) => {e.stopPropagation(); removeOption(item)}} style={{ marginLeft: "6px", border: "none", background: "transparent", color: "white", cursor: "pointer", fontWeight: "bold" }} aria-label={`Remove ${item}`} >
                                &times;
                            </button>
                        </div>
                    ))
                }

        </div>


        {/* Dropdown items to Filters */}
        {
            open && (
                <ul className="ulItems" >
                    {options.length === 0 && <li>No options</li>}
                    {
                        options.map(option => (
                            <li key={option} className={`optionItem ${selected.includes(option) ? 'selected' : ''}`} onClick={() => toggleOption(option)}  >
                                {option}
                            </li>
                        ))
                    }
                </ul>
            )
        }
    </div>
    );
}