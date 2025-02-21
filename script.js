/*****************************************************
 * Global Variables and Data Structures
 *****************************************************/
let currentSelection = "";  // Stores the current dropdown selection key
let currentStep = 1;        // Current step index for dynamic steps
let completedSteps = [];    // Array to track completed steps

// Steps data object mapping each dropdown option to its steps.
// To add more steps for a specific option, update the corresponding array below.
const stepsData = {
  "email-templates": [
    { title: "Review Email Templates", description: "Review all provided email templates and their guidelines." },
    { title: "Select Appropriate Template", description: "Choose the email template that fits the current scenario." },
    { title: "Confirm Details", description: "Ensure the credentials and instructions are correct." }
  ],
  "holes-report": [
    { title: "Access Holes Report", description: "Open the Holes Report in Power BI and verify its update." },
    { title: "Test Flow", description: "Run the Power Automate flow and observe its execution." },
    { title: "Verify Sent Emails", description: "Check that all expected emails were sent." }
  ],
  "vendor-delivered-report": [
    { title: "Open Vendor Delivered Report", description: "Access the report and verify the update timestamp." },
    { title: "Run Flow", description: "Execute the Power Automate flow for vendor delivered scenarios." },
    { title: "Check Email Log", description: "Confirm that emails have been sent successfully." }
  ],
  "daily-pdrp": [
    { title: "Prepare Export Sheet", description: "Clear data on the Export sheet except for headers." },
    { title: "Export Data", description: "Export data from SQL Vendor Portal with the current layout." },
    { title: "Refresh Pivot Table", description: "Refresh the pivot table to update all figures." }
  ],
  "offshore-priority-workbook": [
    { title: "Download Priority Report", description: "Download the Offshore Priority Report from SharePoint." },
    { title: "Download ICT File", description: "Download the ICT file from the designated folder." },
    { title: "Run Macro", description: "Execute the macro on the reworked offshore file." }
  ],
  "lockout": [
    { title: "Locate Vendor PO", description: "Search for the vendor's PO in Dynamics 365." },
    { title: "Remove Lockout Date", description: "Remove the lockout date in web authentication settings." },
    { title: "Send Reset Email", description: "Send an email using the designated template." }
  ],
  "access-roles": [
    { title: "Verify User Roles", description: "Check and confirm the user's access roles." },
    { title: "Adjust Roles", description: "Update roles as required by the request." },
    { title: "Notify User", description: "Inform the user that the access roles have been updated." }
  ],
  "removing-user": [
    { title: "Identify the User", description: "Search for the user who needs removal." },
    { title: "Remove User", description: "Remove the user from the system." },
    { title: "Confirm Removal", description: "Send a notification email confirming the removal." }
  ],
  "verifying-access": [
    { title: "Check Access Logs", description: "Review access logs to verify credentials." },
    { title: "Confirm Credentials", description: "Ensure that the correct credentials are used." },
    { title: "Inform User", description: "Communicate that access has been verified." }
  ],
  "vendor-infractions": [
    { title: "Open Infractions Page", description: "Navigate to the Infractions page in Dynamics 365." },
    { title: "Add New Contact", description: "Add a contact for the vendor infraction scenario." },
    { title: "Send Response Email", description: "Use the designated template to respond to the vendor." }
  ],
  "adding-new-contact": [
    { title: "Verify Contact Non-existence", description: "Ensure the contact does not already exist." },
    { title: "Add New Contact", description: "Enter the required details for the new contact." },
    { title: "Send Invitation Email", description: "Send the appropriate invitation email." }
  ],
  "manual-appointment-c3": [
    { title: "Download Appointment File", description: "Download the appointment file from C3." },
    { title: "Update Appointment Details", description: "Modify the file with new appointment details." },
    { title: "Upload Updated File", description: "Upload the updated file back to C3." }
  ],
  "familiarize-platform": [
    { title: "Log In to Platform", description: "Access the platform using your credentials." },
    { title: "Explore Features", description: "Familiarize yourself with the key functionalities." },
    { title: "Review User Guides", description: "Consult the attached user guides for additional help." }
  ]
};

/*****************************************************
 * Initialization
 *****************************************************/
function init() {
  // Show course intro, hide other pages initially.
  document.getElementById("course-intro").style.display = "block";
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("training-video-page").style.display = "none";
  document.getElementById("steps-page").style.display = "none";
  document.getElementById("email-templates-page").style.display = "none";
}
window.onload = init;

/*****************************************************
 * Course Intro Functions
 *****************************************************/
function courseCompletedYes() {
  document.getElementById("course-intro").style.display = "none";
  document.getElementById("main-screen").style.display = "block";
}
function courseCompletedNo() {
  document.getElementById("course-intro").style.display = "none";
  document.getElementById("training-video-page").style.display = "block";
  currentVideo = 1;
  updateVideoProgress();
}

/*****************************************************
 * Training Video Page Logic
 *****************************************************/
var totalVideos = 3;
var currentVideo = 1;
function nextVideo() {
  if (currentVideo < totalVideos) {
    currentVideo++;
    updateVideoProgress();
  }
  if (currentVideo === totalVideos) {
    document.getElementById("next-video-button").style.display = "none";
    document.getElementById("complete-course-button").style.display = "inline-block";
  }
}
function updateVideoProgress() {
  let progress = (currentVideo / totalVideos) * 100;
  document.getElementById("video-progress-bar").style.width = progress + "%";
}
function completeCourse() {
  document.getElementById("training-video-page").style.display = "none";
  document.getElementById("main-screen").style.display = "block";
}
function redoTrainingCourse() {
  document.getElementById("main-screen").style.display = "none";
  document.getElementById("training-video-page").style.display = "block";
  currentVideo = 1;
  updateVideoProgress();
  document.getElementById("next-video-button").style.display = "inline-block";
  document.getElementById("complete-course-button").style.display = "none";
}

/*****************************************************
 * Dynamic Steps Functions
 * 
 * These functions generate the "steps" page dynamically.
 * To add more steps for a given dropdown option, update the
 * stepsData object (above) with additional step objects.
 *****************************************************/
function showSteps(selectionKey) {
  currentSelection = selectionKey; // Save the selection
  let stepsArray = stepsData[selectionKey];

  if (!stepsArray) {
    alert("No steps defined for this option.");
    return;
  }

  // Show steps page and hide main screen
  document.getElementById('steps-page').style.display = 'block';
  document.getElementById('main-screen').style.display = 'none';

  // Reset step tracking variables
  currentStep = 1;
  completedSteps = new Array(stepsArray.length).fill(false);

  // Clear previous steps
  document.querySelector('#steps-page .checklist').innerHTML = '';
  document.querySelector('#steps-page .steps-container').innerHTML = '';

  // Build checklist dynamically
  let checklistHtml = '<h3>Checklist</h3><ul>';
  for (let i = 0; i < stepsArray.length; i++) {
    checklistHtml += `<li>
      <input type="checkbox" id="check-${i+1}">
      <span onclick="goToStep(${i+1})"> ${stepsArray[i].title}</span>
    </li>`;
  }
  checklistHtml += '</ul>';
  document.querySelector('#steps-page .checklist').innerHTML = checklistHtml;

  // Build step container dynamically
  let stepsHtml = '';
  for (let i = 0; i < stepsArray.length; i++) {
    let imgHtml = stepsArray[i].imageUrl 
      ? `<img src="${stepsArray[i].imageUrl}" alt="${stepsArray[i].title}" style="max-width:90%; margin-top:20px; border-radius:10px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">`
      : "";

    stepsHtml += `<div class="step" id="step-${i+1}" style="display: none;">
                    <h2>${stepsArray[i].title}</h2>
                    ${imgHtml}
                    <p>${stepsArray[i].description}</p>
                  </div>`;
  }
  document.querySelector('#steps-page .steps-container').innerHTML = stepsHtml;

  // Reset progress bar
  document.getElementById('progress-bar').style.width = '0%';

  // Show the first step
  showStep(1);
}


function showStep(step) {
  // Mark the current step as completed
  completedSteps[step - 1] = true;
  let stepsArray = stepsData[currentSelection];
  
  // Show the current step and update checkboxes
  for (let i = 1; i <= stepsArray.length; i++) {
    document.getElementById(`step-${i}`).style.display = (i === step) ? 'block' : 'none';
    document.getElementById(`check-${i}`).checked = completedSteps[i - 1];
  }
  
  // Update the progress bar
  let completedCount = completedSteps.filter(val => val).length;
  document.getElementById('progress-bar').style.width = ((completedCount / stepsArray.length) * 100) + '%';
}

function nextStep() {
  let stepsArray = stepsData[currentSelection];
  if (currentStep < stepsArray.length) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

function goToStep(step) {
  currentStep = step;
  showStep(step);
}

function goBack() {
  // Return to the main screen and reset main dropdown value
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
}

/*****************************************************
 * Dog-themed Steps Functions
 * (For "manual-appointment-c3" or similar options)
 *****************************************************/
let currentDogStep = 1;
let completedDogSteps = [false, false, false];
function showDogStep(step) {
  if (!completedDogSteps[step - 1]) {
    completedDogSteps[step - 1] = true;
  }
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`dog-step-${i}`).style.display = (i === step) ? 'block' : 'none';
    document.getElementById(`dog-check-${i}`).checked = completedDogSteps[i - 1];
  }
  let completedCount = completedDogSteps.filter(val => val).length;
  document.getElementById('progress-bar-dogs').style.width = ((completedCount / 3) * 100) + '%';
}
function nextDogStep() {
  if (currentDogStep < 3) {
    currentDogStep++;
    showDogStep(currentDogStep);
  }
}
function prevDogStep() {
  if (currentDogStep > 1) {
    currentDogStep--;
    showDogStep(currentDogStep);
  }
}
function goToDogStep(step) {
  currentDogStep = step;
  showDogStep(step);
}
function goBackFromDogs() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('steps-page-dogs').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
  completedDogSteps = [false, false, false];
}

/*****************************************************
 * Dropdown Handling Functions
 *****************************************************/
function handleMainDropdownChange() {
  const mainDropdown = document.getElementById('main-dropdown');
  const powerbiDropdown = document.getElementById('powerbi-dropdown');
  const portalIssuesDropdown = document.getElementById('portal-issues-dropdown');

  // Hide all dropdowns first
  document.querySelectorAll('.child-dropdown').forEach(dropdown => dropdown.style.display = 'none');

  // Hide all content pages initially
  document.getElementById('steps-page').style.display = 'none';
  document.getElementById('email-templates-page').style.display = 'none';

  // Check which option was selected and display accordingly
  switch (mainDropdown.value) {
    case 'email-templates':
      showEmailTemplates();
      break;
    
    case 'powerbi-reports':
      powerbiDropdown.style.display = 'block';
      break;
    
    case 'portal-issues-general':
      portalIssuesDropdown.style.display = 'block';
      break;
    
    default:
      if (stepsData.hasOwnProperty(mainDropdown.value)) {
        showSteps(mainDropdown.value);
      }
      break;
  }
}

function handlePowerBIDropdownChange() {
  const powerbiSelect = document.getElementById('powerbi-select');
  if (powerbiSelect.value === 'holes-report') {
    showSteps('holes-report');
  } else if (powerbiSelect.value === 'vendor-delivered-report') {
    showSteps('vendor-delivered-report');
  }
}

function handlePortalIssuesDropdownChange() {
  const portalIssuesSelect = document.getElementById('portal-issues-select');
  if (portalIssuesSelect.value === 'lockout') {
    showSteps('lockout');
  } else if (portalIssuesSelect.value === 'access-roles') {
    showSteps('access-roles');
  } else if (portalIssuesSelect.value === 'removing-user') {
    showSteps('removing-user');
  } else if (portalIssuesSelect.value === 'verifying-access') {
    showSteps('verifying-access');
  }
}

/*****************************************************
 * Email Templates Functions
 *****************************************************/
function showEmailTemplates() {
  document.getElementById('email-templates-page').style.display = 'block';
  document.getElementById('main-screen').style.display = 'none';
}
function showEmailTemplate(templateNumber) {
  const templates = document.getElementsByClassName('email-template');
  for (let i = 0; i < templates.length; i++) {
    templates[i].style.display = 'none';
  }
  document.getElementById(`email-template-${templateNumber}`).style.display = 'block';
}

// copyEmailTemplate() uses a temporary contentEditable div to preserve HTML formatting.
async function copyEmailTemplate(templateId) {
  let templateElement = document.getElementById(templateId);
  let templateClone = templateElement.cloneNode(true); // Clone to prevent modifying the live element

  // Remove elements that shouldn't be copied (header and copy button)
  let title = templateClone.querySelector("h2");
  if (title) title.remove();
  let button = templateClone.querySelector("button");
  if (button) button.remove();

  // Replace the temporary password placeholder with a new generated password
  let tempPasswordElement = templateClone.querySelector("#temp-password");
  if (tempPasswordElement) {
    tempPasswordElement.textContent = generateTempPassword();
  }

  // Get the HTML content from the clone
  let htmlContent = templateClone.innerHTML.trim();

  // Create a temporary off-screen contentEditable div to hold the HTML
  let tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.contentEditable = "true";
  tempDiv.innerHTML = htmlContent;
  document.body.appendChild(tempDiv);

  // Select the content and execute copy command
  let range = document.createRange();
  range.selectNodeContents(tempDiv);
  let selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    if (document.execCommand("copy")) {
      alert("Email template copied to clipboard with formatting!");
    } else {
      alert("Copy command was unsuccessful.");
    }
  } catch (err) {
    alert("Failed to copy email. Please try a different browser.");
    console.error("Copy failed:", err);
  }
  
  // Clean up
  document.body.removeChild(tempDiv);
  selection.removeAllRanges();
}

function goBackFromEmailTemplates() {
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('email-templates-page').style.display = 'none';
  document.getElementById('main-dropdown').value = '';
}

/*****************************************************
 * Generate a 7-character Random Password
 *****************************************************/
function generateTempPassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 7; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}
