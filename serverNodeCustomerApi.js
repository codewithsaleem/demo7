let express = require("express");
let app = express();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Listening on port ${port}`));

//import customers array:--------------------
let {customers} = require("./serverNodeCustomerData.js");

app.get("/customers", function(req, res) {
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    let sort = req.query.sort;

    let arr1 = customers;
    
    if(city) {
        arr1 = arr1.filter((ele) => ele.city === city);
    }
    if(gender) {
        arr1 = arr1.filter((ele) => ele.gender === gender);
    }
    if(payment) {
        arr1 = arr1.filter((ele) => ele.payment === payment);
    }

    if(sort === "city") arr1.sort((c1, c2) => c1.city.localeCompare(c2.city));
    if(sort === "age") arr1.sort((c1, c2) => (+c1.age)-(c2.age));
    if(sort === "payment") arr1.sort((c1, c2) => c1.payment.localeCompare(c2.payment));

    res.send(arr1);
})

app.get("/customers/:id", function(req, res) {
    let id = req.params.id;
    let arr1 = customers;
    let fnd = customers.find((ele) => ele.id === id);

    res.send(fnd);
})

app.post("/customers", function(req, res) {
    let body = req.body;

    let updateCustomer = {...body};
    customers.push(updateCustomer);
    res.send(updateCustomer);
});

app.put("/customers/:id", function(req, res) {
    let id = req.params.id;
    let body = req.body;

    let index = customers.findIndex((ele) => ele.id === id);

    if(index>=0){
        let updateCustomer = {id:id, ...body};
        customers[index] = updateCustomer;
        res.send(updateCustomer);
    }else{
        res.status(404).send("No customer found");
    }
});

app.delete("/customers/:id", function(req, res) {
    let id = req.params.id;
    let body = req.body;

    let index = customers.findIndex((ele) => ele.id === id);

    if(index>=0){
        let deleteCustomer = customers.splice(index, 1);
        res.send(deleteCustomer);
    }else{
        res.status(404).send("No customer found");
    }
});