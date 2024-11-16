//   member data


function fetchMembersData() {
  const url = 'https://web.betyphon.in/api/register/GetAllMembersByUserId?id=7035';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAzNSwiY2FsbGVyIjoic21pbGluZ2FqYWlAZ21haWwuY29tIiwiYWRtaW4iOiJzbWlsaW5nYWphaUBnbWFpbC5jb20iLCJpYXQiOjE3MzE0MTcyOTN9.IbbYkhX-rYgK6F2OQbpkjYqZMBRClp39fGllh_b0bAU',
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  };

  fetch(url, {
    method: 'GET',  // HTTP method (GET, POST, etc.)
    headers: headers
  })
    .then(response => response.json())  // Parse JSON response
    .then(data => {
      const memberdata = data.data.ActiveMembers;
      console.log('Active team details Data:', memberdata); 
      
      // Now call segregateAndPopulateData with both memberdata and activityData from fetchCallDetails
      fetchCallDetails(memberdata);
    })
    .catch(error => {
      console.error('Error:', error);  // Log any errors
    });
}

  
  // Call the function

  

  



// Call Activity

window.onload = function() {
  load();
};


// Set default values for date inputs to the current date
function load() {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  document.getElementById('startDate').value = currentDate;
  document.getElementById('endDate').value = currentDate;
  fetchMembersData();
  callActivity();
  // callHistory();

};



function reload() {
 
  // Fetch dates from input fields
  const startDateInput = document.getElementById('startDate').value;
  const endDateInput = document.getElementById('endDate').value;

  if (!startDateInput || !endDateInput) {
      alert("Please select both start and end dates.");
      return;
  }

  
// Convert to Date objects
const startDate = new Date(startDateInput);
const endDate = new Date(endDateInput);

// Explicitly set start date time to 00:00:00
startDate.setHours(0, 0, 0, 0);

// Explicitly set end date time to 23:59:59
endDate.setHours(23, 59, 59, 999);

// Function to return date in the same format as the original
function formatToISTStyle(date) {
  return date.toString(); // Converts to the full format like 'Fri Nov 15 2024 00:00:00 GMT+0530 (India Standard Time)'
}

// Log formatted start and end dates
console.log('Start Date:', formatToISTStyle(startDate));
console.log('End Date:', formatToISTStyle(endDate));

  fetchMembersData();
  callActivity();
  // callHistory();

};


// setInterval(load, 500);




function callActivity() {


  // Fetch dates from input fields
  const startDateInput = document.getElementById('startDate').value;
  const endDateInput = document.getElementById('endDate').value;

  if (!startDateInput || !endDateInput) {
      alert("Please select both start and end dates.");
      return;
  }

  
// Convert to Date objects
const startDate = new Date(startDateInput);
const endDate = new Date(endDateInput);

// Explicitly set start date time to 00:00:00
startDate.setHours(0, 0, 0, 0);

// Explicitly set end date time to 23:59:59
endDate.setHours(23, 59, 59, 999);

// Function to return date in the same format as the original
function formatToISTStyle(date) {
  return date.toString(); // Converts to the full format like 'Fri Nov 15 2024 00:00:00 GMT+0530 (India Standard Time)'
}

// Log formatted start and end dates
console.log('Start Date:', formatToISTStyle(startDate));
console.log('End Date:', formatToISTStyle(endDate));


  const url = 'https://web.betyphon.in/api/action/getPaginationDataActivity';
  const headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAzNSwiY2FsbGVyIjoic21pbGluZ2FqYWlAZ21haWwuY29tIiwiYWRtaW4iOiJzbWlsaW5nYWphaUBnbWFpbC5jb20iLCJpYXQiOjE3MzE0MTcyOTN9.IbbYkhX-rYgK6F2OQbpkjYqZMBRClp39fGllh_b0bAU',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json, text/plain, */*'
  };

  const data = {
      root: "CallHistory",
      querydata: {
          $and: [
              { admin: "smilingajai@gmail.com" },
              { $or: [{ IsActive: { $exists: false } }, { IsActive: true }] }
          ],
          admin: "smilingajai@gmail.com",
          createdOn: {
              $gte: startDate.toISOString(),
              $lt: endDate.toISOString()
          }
      },
      body: {
          limit: 0,
          skip: 0,
          sort: { createdOn: -1 }
      }
  };

  fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(responseData => {
      console.log('Response Activity', responseData.data.activityData);
      // displayUniqueCallers(responseData.data.activityData);
  })
  .catch(error => {
      console.error('Error:', error);
  });

}

function fetchCallDetails(memberdata) {
  showSpinner();
  const startDateInput = document.getElementById('startDate').value;
  const endDateInput = document.getElementById('endDate').value;

  if (!startDateInput || !endDateInput) {
    alert("Please select both start and end dates.");
    return;
  }

  // Convert to Date objects
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  // Explicitly set start date time to 00:00:00
  startDate.setHours(0, 0, 0, 0);

  // Explicitly set end date time to 23:59:59
  endDate.setHours(23, 59, 59, 999);

  // Function to return date in the same format as the original
  function formatToISTStyle(date) {
    return date.toString(); // Converts to the full format like 'Fri Nov 15 2024 00:00:00 GMT+0530 (India Standard Time)'
  }

  // Log formatted start and end dates
  console.log('Start Date:', formatToISTStyle(startDate));
  console.log('End Date:', formatToISTStyle(endDate));

  const url = 'https://web.betyphon.in/api/action/getPaginationDataActivity';  // Complete URL
  const data = {
    root: "CallDetails",
    querydata: {
      startDate: { $gte: startDate.toISOString(), $lt: endDate.toISOString() },
      admin: "smilingajai@gmail.com"
    },
    body: {
      limit: 0,
      skip: 0,
      sort: { startDate: 1 }
    }
  };

  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAzNSwiY2FsbGVyIjoic21pbGluZ2FqYWlAZ21haWwuY29tIiwiYWRtaW4iOiJzbWlsaW5nYWphaUBnbWFpbC5jb20iLCJpYXQiOjE3MzE0MTcyOTN9.IbbYkhX-rYgK6F2OQbpkjYqZMBRClp39fGllh_b0bAU',
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json, text/plain, */*'
  };

  // Make the API request
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)  // Convert JavaScript object to JSON string
  })
  .then(response => response.json())  // Parse the JSON response
  .then(responseData => {

    if (responseData.data && responseData.data.activityData) {
      const activityData = responseData.data.activityData;
      console.log('Call details Data:', activityData);  // Process the data

      // Call the segregateAndPopulateData function with both memberdata and activityData
      segregateAndPopulateData(memberdata, activityData);
      hideSpinner();
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    hideSpinner();  
  });
}


function formatTimeAgo(lastActivityTime) {
  const now = new Date();
  const lastActivity = new Date(lastActivityTime);
  const diffInSeconds = Math.floor((now - lastActivity) / 1000); // Difference in seconds

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now'; // If less than a minute ago
  }
}

function segregateAndPopulateData(memberdata, activityData) {
  const callerDetails = new Map();
  const uniqueTypes = new Set();
  const callerPids = new Map();
  const callerPidsDetails = new Map();

  // List of usernames to exclude
  const excludeUsernames = new Set(['smilingajai@gmail.com', 'anuragAm@tfc.com', 'ujjwal@tfc.com']);

  // Map member details by email (username) for quick lookup
  const memberMap = new Map();
  memberdata.forEach(member => {
    memberMap.set(member.username, {
      first_name: member.first_name,
      last_activity: member.last_activity
    });
  });

  // Process the activityData
  activityData.forEach(item => {
    if (excludeUsernames.has(item.caller)) return; // Skip excluded callers

    uniqueTypes.add(item.type);

    // Handle caller details with or without pid
    if (!callerDetails.has(item.caller)) {
      callerDetails.set(item.caller, { types: {}, totalDuration: 0, entries: [] });
      callerPids.set(item.caller, new Set());
    }

    const callerData = callerDetails.get(item.caller);
    callerData.types[item.type] = (callerData.types[item.type] || 0) + 1;
    callerData.totalDuration += item.duration;
    callerData.entries.push(item);

    if (item.pid) {
      callerPids.get(item.caller).add(item.pid);

      if (!callerPidsDetails.has(item.caller)) {
        callerPidsDetails.set(item.caller, { pids: new Set(), totalPidDuration: 0, entriesWithPid: [], pidTypes: new Map() });
      }

      const callerPidData = callerPidsDetails.get(item.caller);
      callerPidData.pids.add(item.pid);
      callerPidData.totalPidDuration += item.duration;
      callerPidData.entriesWithPid.push(item);

      if (!callerPidData.pidTypes.has(item.pid)) {
        callerPidData.pidTypes.set(item.pid, { types: new Map() });
      }
      const pidTypes = callerPidData.pidTypes.get(item.pid).types;
      pidTypes.set(item.type, (pidTypes.get(item.type) || 0) + 1);
    }
  });

  const tableBody = document.getElementById("callersTable").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear the existing rows

  const tableHeaderRow = document.getElementById("callersTable").getElementsByTagName('thead')[0].rows[0];
  tableHeaderRow.innerHTML = '<th>S.No</th><th>Caller</th><th>First Name</th><th>Last Activity (Formatted)</th>'; // Adjust header columns

  uniqueTypes.forEach(type => {
    const headerCell = document.createElement('th');
    headerCell.textContent = type;
    tableHeaderRow.appendChild(headerCell);
  });

  const durationHeader = document.createElement('th');
  durationHeader.textContent = "Total Duration (hh:mm:ss)";
  tableHeaderRow.appendChild(durationHeader);

  const pidHeader = document.createElement('th');
  pidHeader.textContent = "Business Connected Calls";
  tableHeaderRow.appendChild(pidHeader);

  const pidDurationHeader = document.createElement('th');
  pidDurationHeader.textContent = "Business Duration (hh:mm:ss)";
  tableHeaderRow.appendChild(pidDurationHeader);

  const pidTypeCountsHeader = document.createElement('th');
  pidTypeCountsHeader.textContent = "Business Type Counts";
  tableHeaderRow.appendChild(pidTypeCountsHeader);

  let sno = 1;

  // Loop through callerDetails to create rows for matching callers
  callerDetails.forEach((details, caller) => {
    if (excludeUsernames.has(caller)) return; // Skip excluded callers

    const row = tableBody.insertRow();
    const snoCell = row.insertCell(0);
    snoCell.textContent = sno++;

    const cell1 = row.insertCell(1);
    cell1.textContent = caller;

    // Add First Name and Last Activity columns
    const firstNameCell = row.insertCell(2);
    const lastActivityCell = row.insertCell(3);

    const memberDetails = memberMap.get(caller);
    if (memberDetails) {
      firstNameCell.textContent = memberDetails.first_name;
      lastActivityCell.textContent = formatTimeAgo(memberDetails.last_activity);
    } else {
      firstNameCell.textContent = '--';
      lastActivityCell.textContent = '--';
    }

    uniqueTypes.forEach(type => {
      const cell = row.insertCell();
      cell.textContent = details.types[type] || '--';
    });

    const durationCell = row.insertCell();
    durationCell.textContent = details.totalDuration ? formatDuration(details.totalDuration) : '--';

    const pidCell = row.insertCell();
    pidCell.textContent = callerPids.get(caller).size || '--';

    const pidDurationCell = row.insertCell();
    const pidData = callerPidsDetails.get(caller);
    pidDurationCell.textContent = pidData && pidData.totalPidDuration ? formatDuration(pidData.totalPidDuration) : '--';

    const pidTypeCountsCell = row.insertCell();
    const pidTypeCounts = [];
    const pidTypesMap = pidData ? pidData.pidTypes : new Map();

    // Only include business type counts if pid is available
    if (pidTypesMap.size > 0) {
      const summedTypes = {};
      pidTypesMap.forEach((pidTypeData) => {
        uniqueTypes.forEach(type => {
          summedTypes[type] = (summedTypes[type] || 0) + (pidTypeData.types.get(type) || 0);
        });
      });

      for (let type of uniqueTypes) {
        if (summedTypes[type] > 0) {
          pidTypeCounts.push(`${type}: ${summedTypes[type]}`);
        }
      }
    }

    // Add click event to show details in pidTypeCountsTable
    pidTypeCountsCell.textContent = pidTypeCounts.length ? pidTypeCounts.join(', ') : '--';
    pidTypeCountsCell.style.cursor = 'pointer';
    pidTypeCountsCell.addEventListener('click', function() {
      showPidTypeCounts(caller, pidData ? pidData.entriesWithPid : []);
    });
  });

  // Add rows for unmatched usernames
  memberMap.forEach((memberDetails, username) => {
    if (!callerDetails.has(username) && !excludeUsernames.has(username)) {
      const row = tableBody.insertRow();
      const snoCell = row.insertCell(0);
      snoCell.textContent = sno++;

      const callerCell = row.insertCell(1);
      callerCell.textContent = username;

      const firstNameCell = row.insertCell(2);
      firstNameCell.textContent = memberDetails.first_name || '--';

      const lastActivityCell = row.insertCell(3);
      lastActivityCell.textContent = memberDetails.last_activity ? formatTimeAgo(memberDetails.last_activity) : '--';

      // Add empty cells for the remaining columns
      for (let i = 4; i < tableHeaderRow.cells.length; i++) {
        const emptyCell = row.insertCell();
        if (i === tableHeaderRow.cells.length - 3 || i === tableHeaderRow.cells.length - 1) {
          emptyCell.textContent = '--'; // Time-based cells
        } else {
          emptyCell.textContent = '--'; // Count-based cells
        }
      }
    }
  });
}


function backtohome(){
  
  document.getElementById("callhistorytabel").style.display = "none"
  document.getElementById("backtohome").style.display = "none"
  document.getElementById("callersTable").style.display = "flex"
  hideSpinner();
}

const dateInputs = document.getElementsByClassName("dateInput");
Array.from(dateInputs).forEach((dateInput) => {
  dateInput.addEventListener("click", () => {
    dateInput.showPicker(); // Trigger the calendar dropdown
  });
});




// Function to show detailed entries in the pidTypeCountsTable
function showPidTypeCounts(caller, entries) {

  showSpinner();

  document.getElementById("callhistorytabel").style.display = "flex"
  document.getElementById("backtohome").style.display = "flex"
  document.getElementById("callersTable").style.display = "none"
  

  const pidTypeCountsTableBody = document.getElementById("pidTypeCountsTable").getElementsByTagName('tbody')[0];
  const pidTypeCountsTableHeader = document.getElementById("pidTypeCountsTable").getElementsByTagName('thead')[0].rows[0];
  
  pidTypeCountsTableBody.innerHTML = ''; // Clear the existing rows

  // Update table header with the new order of columns
  pidTypeCountsTableHeader.innerHTML = `
    <th>Caller</th>
    <th>Phone</th>
    <th>Type</th>
    <th>Start Date</th>
    <th>Duration</th>
    <th>Call Status</th> <!-- New column for Call Status -->
    <th>Call Type</th> <!-- New column for Call Type -->
    <th>Dial Count</th> <!-- New column for Dial Count -->
    <th>PID</th> <!-- New column for PID -->
  `;

  // Group entries by PID and sort them by start date
  const pidMap = new Map();
  entries.forEach(entry => {
    if (!pidMap.has(entry.pid)) {
      pidMap.set(entry.pid, []);
    }
    pidMap.get(entry.pid).push(entry);
  });

  // Loop through each PID group and sort by start date
  pidMap.forEach((pidEntries, pid) => {
    // Sort entries by start date (ascending)
    pidEntries.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    // Track the redial count for each PID based on the earliest start date
    let dialCount = 0;

    // Create rows for each entry in the sorted PID group
    pidEntries.forEach((entry, index) => {
      const row = pidTypeCountsTableBody.insertRow();

      // Caller cell
      const callerCell = row.insertCell(0);
      callerCell.textContent = entry.caller;

      // Phone cell
      const phoneCell = row.insertCell(1);
      phoneCell.textContent = entry.phone || '--'; // Show phone field if available

      // Type cell
      const typeCell = row.insertCell(2);
      typeCell.textContent = entry.type;

      // Start Date cell
      const startDateCell = row.insertCell(3);
      startDateCell.textContent = entry.startDate ? formatDateInIST(entry.startDate) : '--'; // Format and show startDate

      // Duration cell
      const durationCell = row.insertCell(4);
      durationCell.textContent = formatDuration(entry.duration);

      // Call Status cell
      const callStatusCell = row.insertCell(5);
      // If duration is 0, call status is 'Not Connected', otherwise 'Connected'
      callStatusCell.textContent = entry.duration === 0 ? 'Not Connected' : 'Connected';

      // Call Type cell (Redial or Unique Dial)
      const callTypeCell = row.insertCell(6);
      callTypeCell.textContent = index === 0 ? 'Unique Dial' : 'Redial'; // The first entry is "Unique Dial", others are "Redial"

      // Dial Count cell (count redials)
      const dialCountCell = row.insertCell(7);
      dialCountCell.textContent = index === 0 ? pidEntries.length : '--'; // Only show dial count in the first entry for each PID group

      // PID cell
      const pidCell = row.insertCell(8);
      pidCell.textContent = entry.pid || '--';
    });
  });
  hideSpinner();
}



// Function to format the startDate to DD/MM/YY HH:mm:ss in IST
function formatDateInIST(dateStr) {
  const date = new Date(dateStr);

  // Convert to IST (UTC +5:30)
  const indiaTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  // Format as DD/MM/YY HH:mm:ss
  const day = String(indiaTime.getDate()).padStart(2, '0');
  const month = String(indiaTime.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = String(indiaTime.getFullYear()).slice(2); // Get last two digits of the year
  const hours = String(indiaTime.getHours()).padStart(2, '0');
  const minutes = String(indiaTime.getMinutes()).padStart(2, '0');
  const seconds = String(indiaTime.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}



function formatTimeAgo(timestamp) {
  const currentTime = new Date();
  const pastTime = new Date(timestamp);
  const diffInMinutes = Math.floor((currentTime - pastTime) / 60000);

  // Convert minutes to days, hours, and remaining minutes
  const days = Math.floor(diffInMinutes / 1440); // 1440 minutes in a day
  const hours = Math.floor((diffInMinutes % 1440) / 60); // Remaining hours
  const minutes = diffInMinutes % 60; // Remaining minutes

  if (days > 0) {
    return `${days}  days ago `;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} min ago`;
  }
}




    // Helper function to format seconds into hh:mm:ss
    function formatDuration(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    


    function convertToImage(buttonElement) {
      // Get the parent element of the clicked button
      const content = buttonElement.closest(".content");
    
      // Use html2canvas to capture the content
      html2canvas(content).then(canvas => {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL("image/png");
    
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "document-image.png"; // Set download filename
    
        // Trigger the download
        link.click();
      }).catch(error => {
        console.error("Error capturing the content as image:", error);
      });
    }
    


 function showSpinner(){
  document.getElementById('spinnerDiv').style.display = 'flex';
  document.body.classList.add('overlay-hidden');
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

 }


 function hideSpinner(){
  document.getElementById('spinnerDiv').style.display = 'none';
  document.body.classList.remove('overlay-hidden');

 }