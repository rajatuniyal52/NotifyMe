const signupmodel = require("../models/signupmodel");
const customermodel = require("../models/customermodel");
const mongoose = require("mongoose");
const customerSchedulemodel = require("../models/customerSchedulemodel");
const { response } = require("express");
const moment = require("moment");
// const Pusher = require("pusher");
const nodemailer = require("nodemailer");
const WebSocketServer = require("ws");
// const customerschedule- = require("customerschedule-tables")
const { db } = require("../models/signupmodel");
const { status } = require("express/lib/response");
var ObjectId = require("mongodb").ObjectId;
// const pusher = new Pusher({
//   appId: "1525339",
//   key: "ed29d1439bff8ff57074",
//   secret: "75ba0abf4ea2026a887d",
//   cluster: "ap2",
//   useTLS: true,
// });

// Importing the required modules

const signup = (req, res) => {
  signupmodel.find({ email: req.body.Email }, (err, data) => {
    if (data.length >= 1) {
      res.send({
        status: 400,
        message: "email already exists please use a different email.",
      });
    } else {
      let newuser = new signupmodel({
        firstname: req.body.FirstName,
        lastname: req.body.LastName,

        email: req.body.Email,
        password: req.body.Password,
        confirmpassword: req.body.ConfirmPassword,
      });

      newuser.save(function (err, newuser) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            status: 200,
            message: "user added successfully",
            studentobj: newuser,
          });
        }
      });
    }
  });
};

const login = (req, res) => {
  signupmodel.find({ email: req.body.Email }, (err, data) => {
    if (data.length == 0) {
      res.send({ status: 402, message: "invalid email" });
    } else if (data) {
      if (data[0].password === req.body.Password) {
        res.send({ status: 200, message: "login successful" });
      } else {
        res.send({ status: 401, message: "invalid password" });
      }
    } else {
      res.send(err);
    }
  });
};
const customer = (req, res) => {
  let newcustomer = new customermodel({
    name: req.body.name,
    contact: req.body.contact,
    description: req.body.description,
  });
  newcustomer.save(function (err, newuser) {
    if (err) res.send(err);
    else
      res.send({
        status: 200,
        message: "user added successfully",
        studentobj: newcustomer,
      });
  });
};

const list = (req, res) => {
  customermodel.find(function (err, response) {
    if (err) res.send(err);
    else res.send({ status: 200, customer: response });
  });
};

const removeCustomer = (req, res) => {
  customermodel.findByIdAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      res.send({ status: 400, message: "sorry not deleted" });
    } else {
      res.send({
        status: 200,
        message: "This record has been deleted successfully",
      });
    }
  });
};
const updateCustomer = (req, res) => {
  customermodel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      contact: req.body.contact,
      description: req.body.description,
    },
    (err, data) => {
      if (err) {
        res.send({ status: 400, message: "sorry failed", err });
      } else if (data) {
        res.send({ status: 200, message: "success" });
      }
    }
  );
};

const customerSchduler = (req, res) => {
  let customerId = req.body.customerId;
  const objectId = mongoose.Types.ObjectId(customerId);
  let scheduleCustomer = new customerSchedulemodel({
    customerId: mongoose.Types.ObjectId(req.body.customerId),
    date_time: req.body.date_time,
    time: req.body.time,
  });
  scheduleCustomer.save(function (err, newuser) {
    if (err) res.send(err);
    else
      res.send({
        status: 200,
        message: "user added successfully",
        studentobj: scheduleCustomer,
      });
  });
};

const customerData = async (req, res) => {
  const customerInfo = await customerSchedulemodel.aggregate([
    {
      $lookup: {
        from: "customertables",
        localField: "customerId",
        foreignField: "_id",

        as: "customerdata",
      },
    },
    { $unwind: "$customerdata" },
  ]);
  // console.log(customerInfo);
  const customerData = customerInfo.filter((custom) => {
    const today = moment();
    // const tt = moment(custom.date_time).subtract(11, "minutes").format("HH:mm");
    const a = "YYYY-MM-DD";
    const todayDate = today.format(a);
    const timenow = moment().format("HH:mm");
    const time_datenow = todayDate + "T" + timenow;
    var mailTime = moment().format("HH:mm");

    var str = moment(custom.date_time).subtract(3, "minutes").format("HH:mm");
    // var mailTime = moment().subtract(11, "minutes").format("HH:mm");
    // console.log(time_datenow, "hjhh");
    // console.log(tt, "yyyy");

    // if (mailTime == str) {
    //   // console.log("INNn");
    //   return {
    //     custom,
    //     customData: { ...custom },
    //   };
    // }

    if (custom.date_time == time_datenow) {
      // console.log("INNn");
      return {
        custom,
        customerdata: { ...custom },
      };
    }

    // if(custom.date_time==aaa){

    // console.log(today,"ttttttt")
    // }
    // else
    // console.log(aaa,"hhh")
  });
  // for (i = 0; i < customerData.length; i++) {
  //   var customerWork1 = customerData[i];
  // }

  //   console.log(customerWork1 ,"hhhhh");

  // }

  // const timeArray = customerWork1.time.split(":");
  // if (Number(timeArray[1]) < 15) {
  //   let hours = Number(timeArray[0] - 1);
  //   timeArray[0] = hours;
  //   let minutes = Number(timeArray[1]) + 45;
  //   timeArray[1] = minutes;
  // } else {
  //   let minutes = Number(timeArray[1] - 15);
  //   timeArray[1] = minutes > 9 ? minutes : "0" + minutes;
  // }
  // const str = timeArray.join(":");
  // console.log(str, "time");
  // if (mailTime == str) {
  //   console.log("hello")
  // }
  // else{
  // console.log("nooo")
  // }
  if (customerData != "") {
    //sending webSocket Data
    sendingWSdata(customerData);
    console.log(customerData);
  }
};

setInterval(customerData, 50000);

const customData = async (req, res) => {
  const customerInfo = await customerSchedulemodel.aggregate([
    {
      $lookup: {
        from: "customertables",
        localField: "customerId",
        foreignField: "_id",

        as: "customerdata",
      },
    },
    { $unwind: "$customerdata" },
  ]);
  // console.log(customerInfo);
  const customData = customerInfo.filter((custom1) => {
    const today = moment();
    const a = "YYYY-MM-DD";
    const todayDate = today.format(a);
    const timenow = moment().format("HH:mm");
    var mailTime = moment().format("HH:mm");

    var str = moment(custom1.date_time).subtract(15, "minutes").format("HH:mm");
    // for (i = 0; i < customData.length; i++) {
    //   var customerWork1 = customerData[i];
    // }

    // console.log(customerWork1, "hhhhh");

    // }

    // const timeArray = custom1.time.split(":");
    // if (Number(timeArray[1]) < 3) {
    //   let hours = Number(timeArray[0] - 1);
    //   timeArray[0] = hours;
    //   let minutes = Number(timeArray[1]) + 57;
    //   timeArray[1] = minutes;
    // } else {
    //   let minutes = Number(timeArray[1] - 3);
    //   timeArray[1] = minutes > 9 ? minutes : "0" + minutes;
    // }

    // console.log(mailTime, "kkkk");
    if (mailTime == str) {
      // console.log("INNn");
      return {
        custom1,
        customData: { ...custom1 },
      };
    }
  });

  if (customData != "") {
    console.log("Sending Mail.....");
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
          user: "uniyalrajat1512@gmail.com", // generated ethereal user
          pass: "xswtorddtdulgmgn", // generated ethereal password
        },
      });
      let message =
        '<table border="1px" cellpadding="2px" cellspacing="3px">' +
        "<thead>" +
        "<th> Name </th>" +
        "<th> Contact</th>" +
        "<th> Description </th>" +
        "<th> Date </th> " +
        "<th> Time</th> " +
        "</thead>";
      for (i = 0; i < customData.length; i++) {
        var customerWork = customData[i];
        let name = customerWork.customerdata.name;
        let contact = customerWork.customerdata.contact;
        let description = customerWork.customerdata.description;
        let date = moment(customerWork.date_time).format("DD:MM:YYYY");

        let time = moment(customerWork.date_time).format("HH:mm");

        message +=
          "<tr>" +
          "<td>" +
          name +
          "</td>" +
          "<td>" +
          contact +
          "</td>" +
          "<td>" +
          description +
          "</td>" +
          "<td>" +
          date +
          "</td>" +
          "<td>" +
          time +
          "</td>" +
          "</tr>";
      }
      message += "</table>";
      // let name= custom.customerdata.name;
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "uniyalrajat1512@gmail.com", // sender address
        to: "uniyalrajat1998@gmail.com", // list of receivers
        subject: "Customer Work", // Subject line
        text: "Customer Work", // plain text body
        html: message,
      });

      console.log("Mail has send successfully: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    main().catch(console.error);
  }
};

setInterval(customData, 55000);

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8081 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // console.log("IT IS GETTING INSIDE CLIENTS");
    // The data is coming in correctly
    // console.log(data);
    client.send(JSON.stringify(data));

    //client.send("hlw backh=end here");
  });
};
// Creating connection using websocket function
function sendingWSdata(data) {
  wss.broadcast(data);
}
wss.on("connection", (ws) => {
  // ws.send(JSON.stringify("Welcome to the chat, enjoy :)"));

  // sending message
  // ws.broadcast(message)
  ws.on("message", async (data) => {
    // const dataToSend = await set11();
    const dataToSend = await customerData();
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(dataToSend));
    });
  });
  // handling what to do when clients disconnects from server
  ws.on("close", () => {
    console.log("the client has connected");
  });
  // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});
console.log("The WebSocket server is running on port 8000");

module.exports = {
  signup,
  login,
  customer,
  list,
  removeCustomer,
  updateCustomer,
  customerSchduler,
};
