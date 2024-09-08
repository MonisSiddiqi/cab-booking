module.exports = {
    // Function to book a cab
    bookCab: function(email, source, destination) {
        
        return {
            cabId: 'ABC123',
            driverName: 'John Doe',
            source,
            destination,
            email
            
        };
    },

    // Function to estimate cost based on cab pricing and time taken
    estimateCost: function(cab, timeTaken) {
        
        const pricePerMinute = 0.5; // Example pricing: $0.5 per minute
        const estimatedCost = pricePerMinute * timeTaken;
        return estimatedCost;
    }
};
