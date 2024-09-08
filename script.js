const baseUrl = process.env.BASE_URL;

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const bookingDetails = document.getElementById("bookingDetails");

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(bookingForm);

    fetch(`${baseUrl}/book-cab`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        const { message, cab, shortestPath, timeTaken, cost } = data;
        const bookingInfo = `
                <p>${message}</p>
                <p>Cab ID: ${cab.cabId}</p>
                <p>Driver Name: ${cab.driverName}</p>
                <p>Source: ${cab.source}</p>
                <p>Destination: ${cab.destination}</p>
                <p>Shortest Path: ${shortestPath.join(" -> ")}</p>
                <p>Time Taken: ${timeTaken} minutes</p>
                <p>Cost: $${cost}</p>
            `;
        bookingDetails.innerHTML = bookingInfo;
      })
      .catch((error) => console.error("Error:", error));
  });
});
