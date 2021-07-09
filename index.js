const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

var rooms = [];

const customers = [
    {
        id: 1,
        name: 'Customer 1'
    },
    {
        id: 2,
        name: 'Customer 2'
    },
    {
        id: 3,
        name: 'Customer 3'
    },
    {
        id: 4,
        name: 'Customer 4'
    },
    {
        id: 5,
        name: 'Customer 5'
    }
]

app.get('/', (req, res) => {
    res.json({ Rooms: rooms, Customers: customers });
})

app.get('/booked-rooms', (req, res) => {
    res.json({ BookedRooms: rooms.filter((item, index) => item.bookStatus.length) });
})

app.post('/create-room', (req, res) => {
    let newRoom = req.body;
    rooms.push({
        id: rooms.length + 1,
        name: newRoom.name ? newRoom.name : `Room ${rooms.length + 1}`,
        seats: newRoom.seats,
        amenities: req.body.amenities,
        cost: newRoom.cost
    })
    res.json({ status: 200, message: 'Room Created' })

})

app.post('/book-room', (req, res) => {

    if (checkifExists('id', customers, req.body.customerId) && checkifExists('id', rooms, req.body.roomId)) {
        for (let i = 0; i < rooms.length; i++) {
            console.log('foudn the room')
            if (rooms[i].id == req.body.roomId) {
                if (rooms[i].bookStatus) {
                    for (let j = 0; j < rooms[i].bookStatus.length; j++) {
                        if (rooms[i].bookStatus[j].startTime != getDateTime(req.body.bookStartDateTime).getTime() && rooms[i].bookStatus[j].endTime != getDateTime(req.body.bookEndDateTime).getTime()
                            && rooms[i].bookStatus[j].bookedDate != getDateTime(req.body.bookStartDateTime).getDate() + getDateTime(req.body.bookStartDateTime).getMonth() + getDateTime(req.body.bookStartDateTime).getFullYear()) {
                            let tempArray = rooms[i].bookStatus;
                            tempArray.push({
                                customer: req.body.customerId ? customers.filter((item, index) => item.id === req.body.customerId) : '',
                                bookedDate: getDateTime(req.body.bookStartDateTime).getDate() + getDateTime(req.body.bookStartDateTime).getMonth() + getDateTime(req.body.bookStartDateTime).getFullYear(),
                                startTime: getDateTime(req.body.bookStartDateTime).getTime(),
                                endTime: getDateTime(req.body.bookEndDateTime).getTime(),
                            })
                            rooms[i].bookStatus = tempArray
                            res.json({ status: 200, message: 'Room Booked' })
                        } else {
                            res.json({ status: 500, message: 'Room already Booked for the Same Date and Time' })
                        }
                    }

                } else {
                    let tempArray = []
                    tempArray.push({
                        customer: req.body.customerId ? customers.filter((item, index) => item.id === req.body.customerId) : '',
                        bookedDate: getDateTime(req.body.bookStartDateTime).getDate() + getDateTime(req.body.bookStartDateTime).getMonth() + getDateTime(req.body.bookStartDateTime).getFullYear(),
                        startTime: getDateTime(req.body.bookStartDateTime).getTime(),
                        endTime: getDateTime(req.body.bookEndDateTime).getTime(),
                    })
                    rooms[i].bookStatus = tempArray
                    res.json({ status: 200, message: 'Room booked' })
                }


            }

        }

    } else {
        res.json({ status: 404, message: 'Customer/Room Incorrect. Please check and Try Again!!!' })
    }

})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})


function checkifExists(propName, objArray, propValue) {
    for (let i = 0; i < objArray.length; i++) {
        if (objArray[i][propName] === propValue) {
            return true;
        } else {
            return false;
        }
    }
}

function getDateTime(dateTimeString) {
    let dateString = dateTimeString.split('/')[0];
    let dateParts = dateTimeString.split('-');
    let timeString = dateTimeString.split('/')[1];
    let timeParts = timeString.split(':');
    return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]));
}

