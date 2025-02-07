// Fetch and display data (this function will get the prospect data)
async function fetchAndDisplayData() {
    const url = "https://web.betyphon.in/api/action/getPaginationData";

    const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAzNSwiY2FsbGVyIjoic21pbGluZ2FqYWlAZ21haWwuY29tIiwiYWRtaW4iOiJzbWlsaW5nYWphaUBnbWFpbC5jb20iLCJpYXQiOjE3MzE0MTcyOTN9.IbbYkhX-rYgK6F2OQbpkjYqZMBRClp39fGllh_b0bAU',
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json, text/plain, */*'
    };

    const data = {
        root: "prospects",
        querydata: {
            disposition: { $in: ["6641d5ded8c4855dca69c4bc"] },
            cid: "666175055842a2f98bfae0b9",
            $and: [{ admin: "smilingajai@gmail.com" }, { IsActive: true }],
            admin: "smilingajai@gmail.com",
            campId: "666175055842a2f98bfae0b9",
            IsActive: true,
        },
        body: {
            limit: 0,
            skip: 0, // Removed limit for fetching all data
            sort: { createdOn: -1 },
        },
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result?.data?.activityData && result.data.activityData.length > 0) {
            // Pass the fetched data to another function to handle further
            handleFetchedData(result.data.activityData);
        } else {
            console.log("⚠️ No data found.");
        }
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

// Store the fetched prospects data in a global variable
let allProspects = [];

// Handle fetched data and display it in the table
function handleFetchedData(data) {
    allProspects = data; // Store the data globally for later use
    createTable(data); // Create table with the fetched data
    // Optionally show total prospects in a div
    const totalProspects = data.length;
    const totalMessage = document.createElement("p");
    totalMessage.textContent = `Total Prospects: ${totalProspects}`;
    const totalDiv = document.getElementById("totalProspectsContainer");
    totalDiv.appendChild(totalMessage);
}

// Create table to display fetched data
function createTable(data) {
    const table = document.createElement("table");
    const headers = ["S.No.", "Prospect", "Phone No.", "Last Call", "Assigned", "Disposition", "Grade", "prospect_id"];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach((item, index) => {
        const row = document.createElement("tr");

        const sno = index + 1;
        const prospect = item.NAME || item.firstName || "N/A";
        const phone = item.phone || "N/A";
        const lastCall = item.LastCalled ? formatDateToIST(item.LastCalled) : "N/A";
        const assigned = item.assignTo || "N/A";
        const disposition = item.dispositionArray?.[0]?.disposition_value || "N/A";
        const grade = item.CampainData?.[0]?.name || "N/A";
        const prospect_id = item._id || "N/A";

        const values = [sno, prospect, phone, lastCall, assigned, disposition, grade, prospect_id];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    const container = document.getElementById("tableContainer");
    container.appendChild(table);
}

// Convert UTC date to Indian Standard Time (IST)
function formatDateToIST(utcDate) {
    const date = new Date(utcDate);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}


// Fetch and display data when the page loads
fetchAndDisplayData();

// Function to perform API call with a list of prospect IDs
function makeFreshData(prospectIds) {
    // Check if prospectIds is valid and is an array
    if (Array.isArray(prospectIds) && prospectIds.length > 0) {
        console.log('Sending following Prospect IDs:', prospectIds); // Log the ids

        const url = "https://web.betyphon.in/api/action/makeFresh";
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAzNSwiY2FsbGVyIjoic21pbGluZ2FqYWlAZ21haWwuY29tIiwiYWRtaW4iOiJzbWlsaW5nYWphaUBnbWFpbC5jb20iLCJpYXQiOjE3Mzg4MzIyNzJ9.6t855r5CImykeySVVbJZPnil6VRVb8xYZvRygRoRN1k";

        // Create an array of promises for all API requests
        const fetchPromises = prospectIds.map((id) => {
            if (!id) {
                console.error('Invalid prospect ID:', id); // Check for invalid IDs
                return Promise.resolve(); // Return resolved promise to avoid breaking Promise.all
            }

            const requestBody = {
                querydata: {
                    _id: id,
                    removeAssignTo: true,
                    removeHistory: true,
                    removeSchedules: true,
                },
            };

            return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': token,
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(requestBody),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        console.log(`Success for Prospect ID: ${id}, Message: ${data.message}`);
                    } else {
                        console.log(`Error for Prospect ID: ${id}, Message: ${data.message}`);
                    }
                })
                .catch((error) => {
                    console.error(`Request failed for Prospect ID: ${id}`, error);
                });
        });

        // Wait for all fetch requests to complete before showing "Request completed"
        Promise.all(fetchPromises).then(() => {
            console.log("Request completed");
            document.getElementById('spinner').style.display = "none";
    document.getElementById('totalProspectsContainer').textContent = "";
    document.getElementById('tableContainer').textContent = "";
    fetchAndDisplayData();
        });

    } else {
        console.error('Invalid or empty prospectIds array:', prospectIds);
    }
}


  // Function to select prospects and extract their _id
  function selectProspects(numberOfProspects) {
    if (allProspects.length > 0) {
      // Select the first 'numberOfProspects' prospects
      const selectedProspects = allProspects.slice(0, numberOfProspects);
      console.log('Selected Prospects:', selectedProspects);
  
      // Extract the _id of each selected prospect
      const prospectIds = selectedProspects.map((prospect) => prospect._id);
      console.log('Prospect IDs:', prospectIds);
  
      // If the array of IDs is empty, log and exit
      if (prospectIds.length === 0) {
        console.error('No valid prospect IDs to send!');
        return;
      }
  
      // Send the prospect IDs to makeFreshData function
      makeFreshData(prospectIds);
  
      // Reset dropdown to first option after displaying data
      const selectElement = document.getElementById('prospectSelect');
      selectElement.selectedIndex = 0; // Reset to the first option
    } else {
      console.log('No prospects available.');
    }
  }
  
  // Event listener for Charn button click
  document.getElementById('charnBtn').addEventListener('click', () => {

    document.getElementById('spinner').style.display = "block";

    const selectedValue = document.getElementById('prospectSelect').value;
    if (selectedValue) {
      const numberOfProspects = parseInt(selectedValue, 10);
      selectProspects(numberOfProspects);
    } else {
        document.getElementById('spinner').style.display = "none";
        console.log('Please select a prospect number.');
    }
  });
  

  // Event listener for Charn All button click (Process all prospects)
document.getElementById('charnAllBtn').addEventListener('click', () => {
    document.getElementById('spinner').style.display = "block";
    if (allProspects.length > 0) {
        console.log('All Prospects:', allProspects);

        // Extract all prospect IDs
        const prospectIds = allProspects.map((prospect) => prospect._id);
        console.log('All Prospect IDs:', prospectIds);

        // Check if there are valid IDs before proceeding
        if (prospectIds.length === 0) {
            console.error('No valid prospect IDs found!');
            document.getElementById('spinner').style.display = "none";
            return;
        }

        // Call makeFreshData function to process all prospects
        makeFreshData(prospectIds);
    } else {
        console.log('No prospects available.');
        document.getElementById('spinner').style.display = "none";
    }
});


