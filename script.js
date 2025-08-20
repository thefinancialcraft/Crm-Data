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
      sheduleCalls(memberdata);
      
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



function sheduleCalls(memberdata) {
  const memData = memberdata;
  console.log('////',memData);
  const url = 'https://web.betyphon.in/api/action/getPaginationData';
  const data = {
    root: "prospects",
    querydata: {
      $and: [{"IsActive": true}, {"open": true}],
      callback: {"$ne": null},
      admin: "smilingajai@gmail.com",
      IsActive: true,
    },
    body: {
      limit: 0,
      skip: 0,
      sort: { createdOn: -1 }
    }
  };

  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAzNSwiY2FsbGVyIjoic21pbGluZ2FqYWlAZ21haWwuY29tIiwiYWRtaW4iOiJzbWlsaW5nYWphaUBnbWFpbC5jb20iLCJpYXQiOjE3MzE4Njk5MzV9.ugwUQ-xCTZE91sX0zbUFmb_p3QZvWb3U8DGXzIfY0ZE',
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json, text/plain, */*'
  };

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.data && responseData.data.activityData) {
        const sheduleData = responseData.data.activityData;
        console.log('Schedule Data:', sheduleData);
        calculateAndPopulateTable(sheduleData, memberdata); // New function for calculation and table population
      } else {
        console.log('No data found.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function calculateAndPopulateTable(data, memberdata) {
  const tableBody = document.querySelector('#scheduleTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  // Validate memberdata before creating the map
  if (!memberdata || !Array.isArray(memberdata)) {
    console.error('Invalid or missing memberdata:', memberdata);
    return;
  }

  const memberMap = new Map();
  memberdata.forEach(member => {
    memberMap.set(member.username, {
      first_name: member.first_name,
      last_activity: member.last_activity
    });
  });

  const currentDate = new Date(); // Current date
  const callerData = {};
  let totalFollowUp = 0, totalOverdues = 0, totalUpcoming = 0;

  // Process data for calculations
  data.forEach(item => {
    const assignTo = item.assignTo || 'Unknown';
    const callbackTime = item.callback ? new Date(item.callback) : null;

    // Initialize data for the caller if not already present
    if (!callerData[assignTo]) {
      callerData[assignTo] = { followUp: 0, overdues: 0, upcoming: 0, followUpEntries: [], overdueEntries: [], upcomingEntries: [] };
    }

    // Increment follow-up count and store entries
    callerData[assignTo].followUp++;
    callerData[assignTo].followUpEntries.push(item);
    totalFollowUp++;

    // Check if the callback time is overdue or upcoming
    if (callbackTime) {
      if (callbackTime < currentDate) {
        callerData[assignTo].overdues++;
        callerData[assignTo].overdueEntries.push(item);
        totalOverdues++;
      } else {
        callerData[assignTo].upcoming++;
        callerData[assignTo].upcomingEntries.push(item);
        totalUpcoming++;
      }
    }
  });

  // Populate the table body with the calculated data
  Object.entries(callerData).forEach(([caller, stats]) => {
    const row = document.createElement('tr');

    // Caller column
    const callerCell = document.createElement('td');
    callerCell.textContent = caller;
    row.appendChild(callerCell);

    // First Name column
    const firstNameCell = document.createElement('td');
    const memberInfo = memberMap.get(caller);
    firstNameCell.textContent = memberInfo ? memberInfo.first_name : 'Unknown';
    row.appendChild(firstNameCell);

    // Follow-Up column
    const followUpCell = document.createElement('td');
    followUpCell.textContent = stats.followUp;
    followUpCell.classList.add('clickable'); // Add a class to identify clickable cells
    followUpCell.dataset.type = 'followUp'; // Add data-type to identify column type
    row.appendChild(followUpCell);

    // Overdues column
    const overduesCell = document.createElement('td');
    overduesCell.textContent = stats.overdues;
    overduesCell.classList.add('clickable'); // Add a class to identify clickable cells
    overduesCell.dataset.type = 'overdues'; // Add data-type to identify column type
    row.appendChild(overduesCell);

    // Upcoming column
    const upcomingCell = document.createElement('td');
    upcomingCell.textContent = stats.upcoming;
    upcomingCell.classList.add('clickable'); // Add a class to identify clickable cells
    upcomingCell.dataset.type = 'upcoming'; // Add data-type to identify column type
    row.appendChild(upcomingCell);

    tableBody.appendChild(row); // Append the row to the table body
  });

  // Update the headers with total counts
  document.querySelector('#followUpHeader').textContent = `Follow-Up (${totalFollowUp})`;
  document.querySelector('#overdueHeader').textContent = `Overdues (${totalOverdues})`;
  document.querySelector('#upcomingHeader').textContent = `Upcoming (${totalUpcoming})`;

  // Add click event listeners for the clickable cells
  const clickableCells = document.querySelectorAll('.clickable');
  clickableCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const row = this.closest('tr'); // Find the closest row to the clicked cell
      const caller = row.querySelector('td:first-child').textContent; // Get the caller name
      const entry = callerData[caller]; // Get the corresponding entry from callerData
      const entryType = this.dataset.type; // Get the type of entry (followUp, overdues, upcoming)

      // Filter entries based on the type of the clicked column
      let filteredEntries = [];
      if (entryType === 'followUp') {
        filteredEntries = entry.followUpEntries;
      } else if (entryType === 'overdues') {
        filteredEntries = entry.overdueEntries;
      } else if (entryType === 'upcoming') {
        filteredEntries = entry.upcomingEntries;
      }

      // Populate the new table with the filtered entries
      const historyTableBody = document.querySelector('#followUpHistory tbody');
      historyTableBody.innerHTML = ''; // Clear existing rows

      filteredEntries.forEach(entry => {
        const newRow = document.createElement('tr');

        // Caller Name column
        const callerNameCell = document.createElement('td');

// Check if the assignTo value matches a username in the memberMap
const memberInfo = memberMap.get(entry.assignTo);
if (memberInfo) {
  // If found, use the first_name from the member data
  callerNameCell.textContent = memberInfo.first_name;
} else {
  // If no match, display '--'
  callerNameCell.textContent = '--';
}

newRow.appendChild(callerNameCell);

        // Customer Name column
        const customerNameCell = document.createElement('td');
        customerNameCell.textContent = entry.firstName || '--';
        newRow.appendChild(customerNameCell);

        // Phone column
        const phoneCell = document.createElement('td');
        phoneCell.textContent = entry.phone || '--';
        newRow.appendChild(phoneCell);

        // Dialed Status column
        const dialedStatusCell = document.createElement('td');
        const callStatus = entry.CallStatus || '';
        dialedStatusCell.textContent = (callStatus === 'Contacted') ? 'Yes' : 'Not Contacted';
        newRow.appendChild(dialedStatusCell);

        // Scheduled Time column
        const scheduledTimeCell = document.createElement('td');
        const callbackTime = entry.callback ? new Date(entry.callback) : null;
        scheduledTimeCell.textContent = callbackTime ? formatDate(callbackTime) : '--';
        newRow.appendChild(scheduledTimeCell);

        // Last Activity column
        const lastActivityCell = document.createElement('td');
        const lastCalled = entry.LastCalled ? new Date(entry.LastCalled) : null;
        lastActivityCell.textContent = lastCalled ? formatDate(lastCalled) : '--';
        newRow.appendChild(lastActivityCell);

        // No. of Dials column
        const noOfDialsCell = document.createElement('td');
        noOfDialsCell.textContent = entry.TotalCalls || '--';
        newRow.appendChild(noOfDialsCell);

        // Last Caller column
        const lastCallerCell = document.createElement('td');
        lastCallerCell.textContent = entry.LastCaller || '--';
        newRow.appendChild(lastCallerCell);

        // Append new row to the history table
        historyTableBody.appendChild(newRow);
      });
       document.getElementById("followTabel").style.display = "none"
       document.getElementById("followHistoryTabel").style.display = "flex"
    });
  });
}

// Helper function to format date in DD/MM/YY HH:MM:SS format
function formatDate(date) {
  const options = { timeZone: 'Asia/Kolkata', hour12: false };
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    ...options
  }).format(date);
  return formattedDate.replace(',', '').replace(' ', '  ');
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
  const excludeUsernames = new Set(['smilingajai@gmail.com']);

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
  tableHeaderRow.innerHTML = '<th>Caller</th><th>First Name</th><th>Last Activity</th>'; // Adjust header columns

  const summaryHeaderCell = document.createElement('th');
  summaryHeaderCell.textContent = "Call Logs";
  tableHeaderRow.appendChild(summaryHeaderCell);

  const durationHeader = document.createElement('th');
  durationHeader.textContent = "Talk Time";
  tableHeaderRow.appendChild(durationHeader);

  const pidHeader = document.createElement('th');
  pidHeader.textContent = "Business Connected Calls";
  tableHeaderRow.appendChild(pidHeader);

  const pidDurationHeader = document.createElement('th');
  pidDurationHeader.textContent = "Business Talktime";
  tableHeaderRow.appendChild(pidDurationHeader);

  const pidTypeCountsHeader = document.createElement('th');
  pidTypeCountsHeader.textContent = "Business Call Logs";
  tableHeaderRow.appendChild(pidTypeCountsHeader);

  // New header for the sum of OUTGOING and INCOMING
  const pidSumHeader = document.createElement('th');
  pidSumHeader.textContent = "No. of Dials";
  tableHeaderRow.appendChild(pidSumHeader);

  const utilizationHeader = document.createElement('th');
  utilizationHeader.textContent = "Utilization (%)";
  tableHeaderRow.appendChild(utilizationHeader);

  // Loop through callerDetails to create rows for matching callers
  callerDetails.forEach((details, caller) => {
    if (excludeUsernames.has(caller)) return; // Skip excluded callers

    const row = tableBody.insertRow();

    const cell1 = row.insertCell(0);
    cell1.textContent = caller;

    // Add First Name and Last Activity columns
    const firstNameCell = row.insertCell(1);
    const lastActivityCell = row.insertCell(2);

    const memberDetails = memberMap.get(caller);
    if (memberDetails) {
      firstNameCell.textContent = memberDetails.first_name;
      lastActivityCell.textContent = formatTimeAgo(memberDetails.last_activity);
    } else {
      firstNameCell.textContent = '--';
      lastActivityCell.textContent = '--';
    }

    const summaryCell = row.insertCell();
    const typeSummaries = [];

    uniqueTypes.forEach(type => {
      if (details.types[type]) {
        typeSummaries.push(`${type}: ${details.types[type]}`);
      }
    });

    // Join summaries with line breaks for better readability
    summaryCell.textContent = typeSummaries.length ? typeSummaries.join('\n') : '--';
    summaryCell.style.whiteSpace = 'pre-line'; // Ensure line breaks are displayed

    // Add click event listener
    summaryCell.style.cursor = 'pointer'; // Make cell look clickable
    summaryCell.addEventListener('click', function () {
      // Call the showPidTypeCounts function with the caller and associated entries
      showPidTypeCounts(caller, details.entries);
      document.getElementById("callhistorytabel").style.display = "flex";
      document.getElementById("backtohome").style.display = "flex";
      document.getElementById("callersTable").style.display = "none";
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

    // Safely initialize summedTypes
    let summedTypes = {};

    if (pidTypesMap.size > 0) {
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

    pidTypeCountsCell.textContent = pidTypeCounts.length ? pidTypeCounts.join('\n') : '--';
    pidTypeCountsCell.style.whiteSpace = 'pre-line';
    pidTypeCountsCell.style.cursor = 'pointer';
    pidTypeCountsCell.addEventListener('click', function () {
      showPidTypeCounts(caller, pidData ? pidData.entriesWithPid : []);
    });

    const pidSumCell = row.insertCell();
    const outgoingCount = summedTypes['OUTGOING'] || 0;
    const incomingCount = summedTypes['INCOMING'] || 0;
    pidSumCell.textContent = outgoingCount + incomingCount;

    const utilizationCell = row.insertCell();
const businessTalktimeMinutes = (pidData && pidData.totalPidDuration ? pidData.totalPidDuration / 60 : 0);
const utilizationValue = ((businessTalktimeMinutes * 1.67) + (outgoingCount + incomingCount) / 200);
utilizationCell.textContent = utilizationValue ? utilizationValue.toFixed(2) + '%' : '--';

  });

  memberMap.forEach((memberDetails, username) => {
    if (!callerDetails.has(username) && !excludeUsernames.has(username)) {
      const row = tableBody.insertRow();
      const callerCell = row.insertCell(0);
      callerCell.textContent = username;

      const firstNameCell = row.insertCell(1);
      firstNameCell.textContent = memberDetails.first_name || '--';

      const lastActivityCell = row.insertCell(2);
      lastActivityCell.textContent = memberDetails.last_activity ? formatTimeAgo(memberDetails.last_activity) : '--';

      for (let i = 3; i < tableHeaderRow.cells.length; i++) {
        const emptyCell = row.insertCell();
        emptyCell.textContent = '--';
      }
    }
  });
}


// Format duration in hh:mm:ss
function formatDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num < 10 ? '0' + num : num;
}



function backtohome(){
  
  document.getElementById("callhistorytabel").style.display = "none"
  document.getElementById("backtohome").style.display = "none"
  document.getElementById("callersTable").style.display = "flex"
      document.getElementById("followTabel").style.display = "none"
       document.getElementById("followHistoryTabel").style.display = "none"
  hideSpinner();
}

function followUpshow(){
  document.getElementById("callersTable").style.display = "none"
    document.getElementById("backtohome").style.display = "flex"
    document.getElementById("followTabel").style.display = "flex"
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

  document.getElementById("callhistorytabel").style.display = "flex";
  document.getElementById("backtohome").style.display = "flex";
  document.getElementById("callersTable").style.display = "none";

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
    <th>Call Status</th>
    <th>Call Type</th>
    <th>Dial Count</th>
    <th>PID</th>
  `;

  // Helper function to normalize phone numbers to the last 10 digits
  const normalizePhone = (phone) => {
    if (!phone) return null;
    const cleanedPhone = phone.replace(/\D/g, ''); // Remove non-digit characters
    return cleanedPhone.length > 10 ? cleanedPhone.slice(-10) : cleanedPhone; // Keep only the last 10 digits
  };

  // Group entries by normalized phone number
  const phoneMap = new Map();
  entries.forEach(entry => {
    const normalizedPhone = normalizePhone(entry.phone);
    if (!normalizedPhone) return; // Skip if phone is null or invalid
    if (!phoneMap.has(normalizedPhone)) {
      phoneMap.set(normalizedPhone, []);
    }
    phoneMap.get(normalizedPhone).push(entry);
  });

  // Loop through each phone group and sort by start date
  phoneMap.forEach((phoneEntries, phone) => {
    // Sort entries by start date (ascending)
    phoneEntries.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    // Track the redial count for each phone group
    let dialCount = phoneEntries.length;

    // Create rows for each entry in the sorted phone group
    phoneEntries.forEach((entry, index) => {
      const row = pidTypeCountsTableBody.insertRow();

      // Caller cell
      const callerCell = row.insertCell(0);
      callerCell.textContent = entry.caller;

      // Phone cell
      const phoneCell = row.insertCell(1);
      phoneCell.className = 'phone-cell';
      phoneCell.textContent = phone || '--'; // Use normalized phone field if available

      // Add the appropriate icon
      const iconElement = document.createElement('i');
      
      if (!entry.pid) {
        iconElement.className = 'fi fi-ss-address-book';
        iconElement.style.color = 'white';
        iconElement.style.backgroundColor = 'rgb(25, 255, 25)';
        iconElement.style.display = 'flex';
        iconElement.style.padding = '6px';
        iconElement.style.marginLeft = '5px';
        iconElement.style.borderRadius = '50%';
      } else {
        iconElement.className = 'fi fi-ss-customer-service';
        iconElement.style.color = 'white';
        iconElement.style.backgroundColor = 'rgb(255, 25, 25)';
        iconElement.style.marginLeft = '5px';
        iconElement.style.display = 'flex';
        iconElement.style.padding = '6px';
        iconElement.style.borderRadius = '50%';
      }
      phoneCell.appendChild(iconElement);

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
      callStatusCell.textContent = entry.duration === 0 ? 'Not Connected' : 'Connected'; // Call status logic

      // Call Type cell (Redial or Unique Dial)
      const callTypeCell = row.insertCell(6);
      callTypeCell.textContent = index === 0 ? 'Unique Dial' : 'Redial'; // The first entry is "Unique Dial", others are "Redial"

      // Dial Count cell
      const dialCountCell = row.insertCell(7);
      dialCountCell.textContent = index === 0 ? dialCount : '--'; // Only show dial count for the first entry in the group

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
      const calltabel = document.querySelectorAll(".calltabel");

      calltabel.forEach(element => {
          element.style.height = "100%";
      });
      

    
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
        calltabel.forEach(element => {
          element.style.height = "calc(100vh - 110px)";
      });
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




 const scrollTopBtn = document.getElementById('backtotop');

 // Show button when user scrolls down
 window.addEventListener('scroll', () => {
   if (window.scrollY > 200) {
     scrollTopBtn.style.display = 'block';
   } else {
     scrollTopBtn.style.display = 'none';
   }
 });

 // Scroll to top when button is clicked
 scrollTopBtn.addEventListener('click', () => {
   window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 });


function redirect(){
window.location.href='https://thefinancialcraft.github.io/Crm-Data/campaign.html'
}