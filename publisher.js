const amqp = require("amqplib");
require("dotenv").config();

const msg = { number: process.argv[2] };

connect();

async function connect() {
  const url = process.env.AMQP_SERVER;
  console.log(url);
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}
