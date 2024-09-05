document.addEventListener('DOMContentLoaded', function () {
    fetch('https://1l71t6j6a5.execute-api.eu-north-1.amazonaws.com/test/rates')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data);

            // Parse the body since it's a JSON string
            const parsedData = JSON.parse(data.body);

            if (Array.isArray(parsedData)) {
                const tableBody = document.querySelector('#currencyTable tbody');
                parsedData.forEach(item => {
                    const date = new Date(item.Timestamp);
                    const formattedDate = date.toLocaleString('en-UK', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZoneName: 'short'
                    });

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.CurrencyPair}</td>
                        <td>${item.Rate}</td>
                        <td>${formattedDate}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                console.error('Expected an array but received:', parsedData);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
