
const cveDetailsDiv = document.getElementById("cve-details");
    const backButton = document.getElementById("back-button");
function handleClickedCVE(cveId) {
    
    console.log("Clicked CVE ID:", cveId);
    
}
console.log("Hello")
const urlParams = new URLSearchParams(window.location.search);
const cveId = urlParams.get('id');
console.log(cveId)


async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        const jsonData = await response.json();
        

        data = jsonData[0].vulnerabilities; 
        
        console.log(data);
        data.forEach(item => {
          
            if(item.cve.id == cveId){
            
            
            displayCveDetails(item)

            }
        });


        

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCveDetails(cve) {
   
     const description = cve.cve.descriptions[0].value || "No description available";
    const baseScoreV2 = cve.cve.metrics.cvssMetricV2[0].cvssData.baseScore;
     const baseScoreV3 = cve.cve.metrics.cvssMetricV3 ? cve.cve.metrics.cvssMetricV3[0].cvssData.baseScore : "N/A";
    const severityV2 = cve.cve.metrics.cvssMetricV2 ? cve.cve.metrics.cvssMetricV2[0].baseSeverity : "N/A";
    const severityV3 = cve.cve.metrics.cvssMetricV3 ? cve.cve.metrics.cvssMetricV3[0].baseSeverity : "N/A";
    const cpe = cve.cve.configurations?.nodes?.map(node => node.cpeMatch.map(match => match.criteria)).flat().join(", ") || "N/A";

    cveDetailsDiv.innerHTML = `
        <h2>${cve.cve.id}</h2>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>CVSS v2 Base Score:</strong> ${baseScoreV2}</p>
        <p><strong>CVSS v3 Base Score:</strong> ${baseScoreV3}</p>
        <p><strong>Severity v2:</strong> ${severityV2}</p>
        <p><strong>Severity v3:</strong> ${severityV3}</p>
        <p><strong>CPE:</strong> ${cpe}</p>
    `;
}
backButton.addEventListener("click", () => {
    window.history.back();
});




fetchData()