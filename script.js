document.addEventListener('DOMContentLoaded', () => {
    const resultsPerPageSelect = document.getElementById('results-per-page');
    const cveTableBody = document.querySelector('#cve-table tbody');
    const totalRecordsDiv = document.getElementById('total-records');
    let data = [];
    let currentPage = 1;
    let resultsPerPage = 100;
    document.addEventListener('DOMContentLoaded', () => {
        const resultsPerPageSelect = document.getElementById('results-per-page');
        const cveTableBody = document.querySelector('#cve-table tbody');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const pageInfo = document.getElementById('page-info');
        const totalRecordsDiv = document.getElementById('total-records');
    
        let currentPage = 1;
        let totalRecords = 0;
        let resultsPerPage = parseInt(resultsPerPageSelect.value);
    
        resultsPerPageSelect.addEventListener('change', (event) => {
            resultsPerPage = parseInt(event.target.value);
            currentPage = 1; 
            fetchData();
        });
    
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchData();
            }
        });
    
        nextButton.addEventListener('click', () => {
            if (currentPage * resultsPerPage < totalRecords) {
                currentPage++;
                fetchData();
            }
        });
    
        async function fetchData() {
            try {
                const response = await fetch(`https://example.com/api/cves?start=${(currentPage - 1) * resultsPerPage}&limit=${resultsPerPage}`);
                const data = await response.json();
                totalRecords = data.totalRecords;
                displayData(data.items);
                updatePagination();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    
        function displayData(items) {
            cveTableBody.innerHTML = '';
            items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.cveId}</td>
                    <td>${item.identifier}</td>
                    <td>${item.publishDate}</td>
                    <td>${item.lastModified}</td>
                    <td>${item.status}</td>
                `;
                cveTableBody.appendChild(row);
            });
        }
    
        function updatePagination() {
            pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(totalRecords / resultsPerPage)}`;
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage * resultsPerPage >= totalRecords;
            totalRecordsDiv.textContent = `Total Records: ${totalRecords}`;
        }
    
        
        fetchData();
    });
    

    resultsPerPageSelect.addEventListener('change', (event) => {
        resultsPerPage = parseInt(event.target.value, 10);
        displayTableData();
    });

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3000/data');
            const jsonData = await response.json();
            
            data = jsonData[0].vulnerabilities; // Extract the vulnerabilities array from the response
            displayTableData();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayTableData() {
        cveTableBody.innerHTML = '';
        const totalRecords = data.length;
        const totalPages = Math.ceil(totalRecords / resultsPerPage);
        const start = (currentPage - 1) * resultsPerPage;
        const end = start + resultsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.cve.id}</td>
                <td>${data.cve.sourceIdentifier}</td> 
                                
                <td>${new Date(data.cve.published).toLocaleDateString()}</td> 
                <td>${ new Date(data.cve.lastModified).toLocaleDateString()}</td>
                <td>${ data.cve.vulnStatus}</td>
                <!-- Add more table columns for other fields if needed -->
            `;
            cveTableBody.appendChild(row);
        });

        totalRecordsDiv.innerText = `Total Records: ${totalRecords}`;
        updatePaginationControls(totalPages);
    }
    const cveTable = document.getElementById("cve-table");
    
    
    cveTable.addEventListener("click", function(event) {
        const clickedElement = event.target;
        if (clickedElement.tagName === "TD") {
            const cveId = clickedElement.parentElement.firstElementChild.textContent;
            
            
            window.location.href = "details.html?id=" + encodeURIComponent(cveId);
            handleClickedCVE(cveId);
        }
    });

    function updatePaginationControls(totalPages) {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                displayTableData();
            });
            paginationDiv.appendChild(button);
        }
    }


    fetchData();
});
