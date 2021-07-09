
# Hall Booking API

A Simple Node and Express API to show Perform and Show Hall booking with Rooms and Customers


## Authors

- [@mahithmadwesh94](https://github.com/mahithmadwesh94)

  
## API Reference

You can insert Only Rooms and Booking Data. Not Customers

#### Get Rooms and Customers
```https
  GET /
  
  {
    "Rooms": [],
    "Customers": [
        {
            "id": 1,
            "name": "Customer 1"
        },
        {
            "id": 2,
            "name": "Customer 2"
        },
        {
            "id": 3,
            "name": "Customer 3"
        },
        {
            "id": 4,
            "name": "Customer 4"
        },
        {
            "id": 5,
            "name": "Customer 5"
        }
    ]
}



```


#### Create Room

```http
  POST /create-room
  
  {
  "name":"Room 1",
  "seats":130,
  "amenities":["AC","Projector","Stage","Tables","Chair"],
  "cost":100
  }


Response:
  {
    "status": 200,
    "message": "Room Created"
}
```


#### Book Room

  ```http
  POST /book-room
  
  {
    "roomId":1,
    "customerId": 1,
    "bookStartDateTime":"2020-07-09/12:35",
    "bookEndDateTime":"2020-07-09/14:35"
}


Response:
  {
    "status": 200,
    "message": "Room Booked"
}
```


#### Get Booked Room

  ```http
  GET /booked-room
  
  {
    "roomId":1,
    "customerId": 1,
    "bookStartDateTime":"2020-07-09/12:35",
    "bookEndDateTime":"2020-07-09/14:35"
}


Response:
{
    "BookedRooms": [
        {
            "id": 1,
            "name": "Room 1",
            "bookStatus": [
                {
                    "customer": [
                        {
                            "id": 1,
                            "name": "Customer 1"
                        }
                    ],
                    "bookedDate": 2035,
                    "startTime": 1594278300000,
                    "endTime": 1594285500000
                }
            ]
        }
    ]
}
```
