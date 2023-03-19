const amqp = require("amqplib");
require("dotenv").config();

connect();

async function connect() {
  const url = process.env.AMQP_SERVER;
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Job received with input ${input.number}`);

      if (input.number == 7) {
        channel.ack(message);
      }
    });
  } catch (ex) {
    console.error(ex);
  }
}
