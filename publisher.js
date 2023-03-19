const amqp = require("amqplib");

const msg = { number: process.argv[2] };

connect();

async function connect() {
  try {
    const connection = await amqp.connect(process.env.AMQP_SERVER);
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
